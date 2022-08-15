const router = require("express").Router();
const handleLogin = require("../controllers/authController");
router.route("/").post(handleLogin);

module.exports = router;
