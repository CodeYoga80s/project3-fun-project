const router = require("express").Router();
const favoriteRoutes = require("./favorites");

//  routes
router.use("/favorites", favoriteRoutes);

module.exports = router;