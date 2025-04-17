const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
  },
  assigned: [
    {
      type: Array,
      default: [],
    },
  ],
  status:{
    type: String,
    required: true,
  },
  checked:{
    type: String,
    default: false
  },
  priority: {
    type: String,
    required: true,
  },
  start_date: {
    type: String,
    
  },
  due_date: {
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

module.exports = mongoose.model("task", taskSchema);