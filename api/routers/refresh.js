const router = require("express").Router();
const handleRefresh = require("../controllers/refreshController");
router.route("/").get(handleRefresh);

module.exports = router;

