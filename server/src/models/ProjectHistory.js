const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// total of 11 fields

const projecthistorySchema = new Schema({
  project_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  completed_tasks: {
    type: Number,
    default: 0,
  },
  total_tasks: {
    type: Number,
    default: 0,
  },
  earned_value: {
    type: String,
    default: 0,
  },
  spent: {
    type: String,
    default: 0,
  },

}, { collection: 'pmprojecthistory' }); 

module.exports = mongoose.model("projecthistory", projecthistorySchema);
