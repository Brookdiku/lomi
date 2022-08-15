const User = require("../Model/user");

const handleLogout = async (req, res) => {
  if (!req.cookies?.jwt) return res.sendStatus(200);
  const refreshToken = req.cookies.jwt;
  const foundUser = await User.findOne({
    refreshToken: { $all: refreshToken },
  }).exec();
  if (!foundUser) {
    res.clearCookie('jwt', { httpOnly: true }).sendStatus(204); // clearcookie,
  }
  foundUser.refreshToken=foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  const result = await foundUser.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true }); // clearcookie,
  res.sendStatus(204);
};
module.exports = handleLogout;
