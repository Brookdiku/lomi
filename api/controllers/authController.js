//fetch our user model inorder to access the mongoose database and collection
const User = require("../Model/user");
//bcrypt is module used to encrypt and decrypt a password
const bcrypt = require("bcrypt");
//a module used to generate refresh token and access token
const jwt = require("jsonwebtoken");
//the major handleLogin function start here
const handleLogin = async (req, res) => {
  // assing all cookies to cookies variable from the request
  const cookies = req.cookies;
  //checks the data of username and password from the request body
  if (!req?.body)
    return res
      .status(400)
      .json({ message: "username and password are required " });
  // if there are username and password it will fetch it
  const { username, password } = req.body;
  // checking if the username and password are not null
  if (!username || !password)
    // if so it will send bad request and shows the client that it needs username and password
    return res
      .status(400)
      .json({ message: "username and password are required." });
  try {
    // if the data is correct  it checks if there is no other user with the same username
    const foundUser = await User.findOne({ username: username.toLowerCase() });
    //if not found a user with the same username then returns unauthorized
    if (!foundUser)
      return res.status(401).json({ message: "please register first." });
    //else if found the username then verify the password
    const matchPassword = await bcrypt.compare(password, foundUser.password);
    //if the password is not correct then sends unauthorized
    if (!matchPassword)
      return res
        .status(401)
        .json({ message: "username or password incorrect." });
    // if the password is correct to  then it decode all roles from userroles to roles variable
    const roles = Object.values(foundUser.roles);
    //create the jwt for refresh and access token
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: foundUser.id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10s" }
    );
    // creating refresh token
    const newRefreshToken = jwt.sign(
      {
        userInfo: {
          id: foundUser.id,
        },
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    //this will check from cookies that a refresh token exist if it does it will remove the token from database else nothing
    const newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);
    if (cookies?.jwt) res.clearCookie("jwt", { httpOnly: true });
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();
    res.cookie("jwt", newRefreshToken, { httpOnly: true });
    res
      .status(200)
      .json({
        username: foundUser.username,
        accessToken: accessToken,
        roles: roles,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `${error.message}` });
  }
};
module.exports = handleLogin;
