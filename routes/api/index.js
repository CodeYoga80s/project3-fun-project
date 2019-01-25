const router = require("express").Router();
const favoriteRoutes = require("./favorites");
const userRoutes = require("./users");

//  routes
router.use("/favorites", favoriteRoutes);
router.use("/users", userRoutes);

module.exports = router;