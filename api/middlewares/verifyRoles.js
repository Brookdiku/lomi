const ROLES = require("../configs/rolesList");

const verifyRoles = (...allowedRoles) => {
  const rolesArray = [...allowedRoles];
  return (req, res, next) => {
    if (!req?.roles)
      return res.status(403).json({ message: "your role is needed" }); // forbidden
    const result = req.roles
      .map((role) =>
        rolesArray.includes(role !== null ? role.toString() : null)
      )
      .find((val) => val === true);
    if (!result) return res.sendStatus(403); // forbidden
    next();
  };
};
module.exports = verifyRoles;
