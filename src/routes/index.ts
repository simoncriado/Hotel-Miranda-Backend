const router = require("express").Router();

router.use("/bookings", require("/bookings"));
router.use("/login", require("/login"));

module.exports = router;
