const router = require("express").Router();
router.route("/").get( (req, res) => {
  res.json({ message: "this is the root." });
});

module.exports = router;
