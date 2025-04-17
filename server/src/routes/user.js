const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

// -----------------------------------                Adding user: "api/user/addUser"
router.post("/addUser", async (req, res) => {
  const {
    name,
    mobile,
    email,
    dob,
    doj,
    ad,
    role,
    address,
    pincode,
    password,
    city,
    // skillset,
    code,
    gender,
    salary,
    // dept  
  } = req.body;

  try {
    const user = new User({
      name,
      mobile,
      email,
      dob,
      doj,
      ad,
      role,
      address,
      pincode,
      city,
      password,
      // skillset,
      code,
      gender,
      salary,
      // dept
    });

    const saveUser = await user.save();
    res.send(saveUser);

  } catch (err) {
    res.json({ error: "internal Server Error", err: err.message });
  }
});

// ------------------------------------------         Updating User: "api/users/updateUser"
router.put("/updateUser/:id", fetchuser, async (req, res) => {
  const {       
    name,
    mobile,
    email,
    dob,
    doj,
    ad,
    role,
    address,
    pincode,
    city,
    skillset,
    code,
    gender,
    salary,
    dept } = req.body;

  // create new user object
  const newUser = {};
  if (name) {
    newUser.name = name;
  }
  
  if (mobile) {
    newUser.mobile = mobile;
  }
  
  if (email) {
    newUser.email = email;
  }
  
  if (dob) {
    newUser.dob = dob;
  }
  
  if (doj) {
    newUser.doj = doj;
  }
  
  if (ad) {
    newUser.ad = ad;
  }
  
  if (role) {
    newUser.role = role;
  }
  
  if (address) {
    newUser.address = address;
  }
  
  if (pincode) {
    newUser.pincode = pincode;
  }
  
  if (city) {
    newUser.city = city;
  }
  
  if (skillset) {
    newUser.skillset = skillset;
  }
  
  if (code) {
    newUser.code = code;
  }
  
  if (gender) {
    newUser.gender = gender;
  }
  
  if (salary) {
    newUser.salary = salary;
  }
  
  if (dept) {
    newUser.dept = dept;
  }
  


  // find the user to be updated and update it
  var user = await Users.findById(req.params.id);
  if (!user) {
    return res.status(404).send("not found");
  }

  if (user.user.toString() !== req.user.id) {
    return res.status(401).send("Unauthorized");
  }

  try {
    user = await Users.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json(user);
  } catch (err) {

    res.json({ error: "internal Server Error", err: err.message });
  }
});

// ----------------------------------                 Sharing User All Details: "api/user/allUserDetails"
router.get("/allUserDetails", fetchuser, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {

    res.json({ error: "Internal Server Error", err: err.message });
  }
});

// ------------------------------------               Deleting User: "api/user/removeUser"
router.delete("/removeUser/:id", fetchuser, async (req, res) => {

    // find the user to be updated and update it
    var user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Not found");
    }
  
    if (user.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized");
    }
  
    try {
      user = await User.findByIdAndDelete(req.params.id);
      res.send(user);
    } catch (err) {

      res.json({ error: "internal Server Error", err: err.message });
    }
  });

module.exports = router;