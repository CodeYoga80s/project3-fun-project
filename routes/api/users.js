const router = require("express").Router();
const usersController = require("../../controllers/favoritesController");


router.route("/")
  .get(usersController.findAll)
  .post(usersController.createUser);

router.route("/:id")
  .post(usersController.updateFav);

module.exports = router;