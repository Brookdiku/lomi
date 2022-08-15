const User = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handleRegister = async (req, res) => {
  //fetch the data of username and password from the request
  if (!req?.body)
    return res
      .status(400)
      .json({ message: "username and password are required " });
  const { username, password } = req.body;
  // checking if the username and password are not null
  if (!username || !password)
    // if so it will send bad request and shows the client that it needs username and password
    return res
      .status(400)
      .json({ message: "username and password are required" });
  // if the data is correct  it checks if there is no other user with the same username
  const duplicate = await User.findOne({
    username: username.toLowerCase(),
  }).exec();
  //if found a user with the same username then returns username taken
  if (duplicate)
    return res.status(409).json({ message: " username is taken" });
  //else if username is available  it will encrypt the password with salt round 10
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    //after that it will create a new user object
    const result = await User.create({
      // this will set id for the user based on the length of the users if the length is zero it will set it to 1 else it will set it to length + 1
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    // after register fetch ther registerd roles 
    const roles = Object.values(result.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: result._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN,
      { expiresIn: "10s" }
    );
    const newRefreshToken = jwt.sign(
      {
        userInfo: {
          id: result._id,
        },
      },
      process.env.REFRESH_TOKEN,
      { expiresIn: "1d" }
    );
    result.refreshToken=[newRefreshToken];
    await result.save()
    res.cookie("jwt", newRefreshToken, { httpOnly: true });
    res
      .status(201)
      .json({
        message: "registered successfully.",
        username:result.username,
        accessToken: accessToken,
        roles: roles,
      })``;
  } catch (e) {
    console.error(e);
  }
};
module.exports = handleRegister;
