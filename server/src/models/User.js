const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mobile:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  //  required: true,
  },
  dob:{
    type: String,
  //  required: true,
  },
 doj: {
    type: String,
   // required: true,
  },
  ad:{
    type: String
  },
  role:{
    type: String,
  //  required: true,
  },
  address:{
    type: String,
  //  required: true,
  },
  pincode:{
    type: String,
  //  required: true,
  },
  city:{
    type: String,
  //  required: true,
  },
  // skillset: [
  //   {
  //     type: Array,
  //     default: [],
  //   },
  // ],
  code:{
    type: String,
  //  required: true,
  },
  gender:{
    type: String,
  //  required: true,
  },
  employee_type:{
    type: String,
  //  required: true,
  },
  salary:{
    type: Number,
  //  required: true,
  },
  // dept:{
  //   type: String,
  //   required: true,
  // },
  profileImage: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);

