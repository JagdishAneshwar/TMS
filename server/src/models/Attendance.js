const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  attendance: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  reason:{
    type: String,
    default: false
  },
  start_time: {
    type: String,
    
  },
  leave_time: {
    type: String,
    required: true,
  },
  worked_mins:{
    type:String,
    required:true
  },
  date: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("attendance", attendanceSchema);