const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
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
  },
  adminsaw:{
    type:String
  },
  usersaw:{
    type:String
  },
});

module.exports = mongoose.model("comment", commentSchema);