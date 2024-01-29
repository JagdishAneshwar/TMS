const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user:{
    type:String,
    required:true
  },
  img: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  tasks: [
    {
      type: Array,
      default: [],
    }
  ],
  members: [
    {
      type: Array,
      default: [],
    },
  ],
  start_date: {
    type: String,
  },
  due_date: {
    type: String,
    required: true,
  },
}, { collection: 'pmprojects' }); 

module.exports = mongoose.model("project", projectSchema);
