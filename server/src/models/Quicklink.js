const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quicklinkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("quicklink", quicklinkSchema);