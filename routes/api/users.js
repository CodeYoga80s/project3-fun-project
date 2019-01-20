const router = require("express").Router();
const usersController = require("../../controllers/favoritesController");


router.route("/")
  .get(usersController.findAll)
  .post(usersController.createUser);



module.exports = router;