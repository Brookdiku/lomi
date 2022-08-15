//fetch data from users.json file
const usersDB = {
  users: require("../Model/users.json"),
  // we use it as a setState function like that of react
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(400).json({ message: "access token required" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) return res.sendStatus(403); //forbidden
    (req.id = decode.userInfo.id), (req.roles = decode.userInfo.roles);
    next();
  });
};
module.exports = verifyAccessToken;
