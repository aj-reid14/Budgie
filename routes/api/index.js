const router = require("express").Router();
const userRoutes = require("./user");

// Book routes
router.use("/home", userRoutes);

module.exports = router;
