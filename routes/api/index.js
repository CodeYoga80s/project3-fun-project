const router = require("express").Router();
const favoriteRoutes = require("./favorites");

// Book routes
router.use("/favorites", favoriteRoutes);

module.exports = router;