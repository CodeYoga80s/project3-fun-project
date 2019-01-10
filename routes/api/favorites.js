const router = require("express").Router();
const favoritesController = require("../../controllers/favoritesController");


router.route("/")
  .get(favoritesController.findAll)
  .post(favoritesController.create);



module.exports = router;