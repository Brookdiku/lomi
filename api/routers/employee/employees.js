const ROLES = require("../../configs/rolesList");
const verifyRoles = require("../../middlewares/verifyRoles");
const router = require("express").Router();
const {
  handleGetEmployee,
  handleDeleteEmployee,
  handleGetEmployees,
  handleRegisterEmployee,
  handleUpdateEmployee,
} = require("../../controllers/EmployeesController");
router.route("/all$").get(verifyRoles(ROLES.editor,ROLES.admin,ROLES.user),handleGetEmployees);
router.route("/get/:id").get(verifyRoles(ROLES.user,ROLES.admin,ROLES.user),handleGetEmployee);
router.route("/register$").post(verifyRoles(ROLES.editor,ROLES.admin),handleRegisterEmployee);
router.route("/delete/:id").delete(verifyRoles(ROLES.admin),handleDeleteEmployee);
router.route("/edit/:id").put(verifyRoles(ROLES.admin,ROLES.editor),handleUpdateEmployee);
module.exports = router;
