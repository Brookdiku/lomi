const User = require("../Model/user");
//require needed modules
const jwt = require("jsonwebtoken");
// start of handle refresh token

const handleRefresh = async (req, res) => {
  //check if there is a cookie thats named jwt in the request if badrequest
  if (!req.cookies?.jwt) return res.sendStatus(400); // badrequest;
  //if found thec cookie then copy to refreshToken variable remove it from the cookie
  const refreshToken = req.cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true });
  // find a user based on the refreshToken
  const foundUser = await User.findOne({
    refreshToken: { $all: refreshToken },
  }).exec();
  // if not found a user then with the same refresh token then the verify the token first
  if (!foundUser) {
    // verifing the token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      //decoded is async function because it is connected to the database in the future
      async (err, decode) => {
        //if ther is proble decoding the refreshToken then a forbidden message will be sent
        if (err) res.sendStatus(403); //forbidden
        //else if its decoded correctly we will find the owner of the refreshToken based on the decoded id
        // this will tell us that the refreshToken was legit in past and someone is trying expired token to be autorized
        const compromisedUser = await User.findOne({ id: decode.id }).exec();
        //then set the user refreshToken array to empty so that a new login is required
        compromisedUser.refreshToken = [];
        // update the database
        const result = await compromisedUser.save();
        console.log(result);
      }
    );
    return res.sendStatus(401); // unautohrized;
  }
  // if we find a user with the refreshToken
  // filter out the other refreshToken for other device logins to this device refreshToken
  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  // target access token create
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, async (err, decode) => {
    // if the refreshToken is expired then
    if (err) {
      // update the database by removing this refreshToken
      foundUser.refreshToken = [...newRefreshTokenArray];
      await foundUser.save();
    }
    if (err || foundUser.id !== decode.userInfo.id) return res.sendStatus(403); //forbidden
    // after this the refreshToken is valid
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: foundUser.id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "60s" }
    );
    const newRefreshToken = jwt.sign(
      {
        userInfo: {
          id: foundUser.id,
        },
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    await foundUser.save();
    const username= foundUser.username;
    res.cookie("jwt", newRefreshToken, { httpOnly: true });
    res.json({ username, accessToken, roles });
  });
};
module.exports = handleRefresh;
