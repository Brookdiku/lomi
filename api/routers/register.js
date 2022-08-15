const router = require("express").Router();
const handleRegister = require("../controllers/registerController");
router.route("/").post(handleRegister);

module.exports = router;

