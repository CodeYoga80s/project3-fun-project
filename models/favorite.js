const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  cocktailID: { type: Number, required: true },
  count: { type: Number, required: true }
});

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;