const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coloringSheetSchema = new Schema({
  title: {
    type: String,
  },

  image: {
    type: String,
  },
});

const ColoringSheet = mongoose.model("ColoringSheet", coloringSheetSchema);

module.exports = ColoringSheet;
