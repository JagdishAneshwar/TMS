const fetchuser = require("../middleware/fetchuser");
const axios = require('axios');
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

// ---------------------------------- Route 1: get all projects using GET: "api/attendance/allProjectDetails"
router.get("/getDailyAttendance", fetchuser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if( user.code == "2562"){
    const attendance = await Attendance.find();
    res.json(attendance);}else if (user.code == "1000"){
      const attendance = await Attendance.find({ user : req.user.id });
      res.json(attendance);
    } else{
      res.json("Invalid Code: Un-Authorized User");
    }
  } catch (err) {
    console.error(err.message);
    res.json({ error: "internal Server Error", err: err.message });
  }
});

// ------------------------------------------ Route 2: update an existin projectusing PUT: "api/projects/update" -login required
router.put("/updateDailyAttendance/:id", fetchuser, async (req, res) => {
  const {       
    leave_time
  } = req.body;

  var project = await Attendance.findById(req.params.id);

  if (!project) {
    return res.status(404).send("not found");
  }

  if (project._id.toString() !== req.params.id) {
    return res.status(401).send("Unauthorized");
  }

  const start_time = project.start_time;
  const leaveTimeString = leave_time;
  const startTimeString = start_time;
  const leaveTimeSplit = leaveTimeString.split(':');
  const startTimeSplit = startTimeString.split(':');
  var worked_mins = (parseInt(leaveTimeSplit[0]) - parseInt(startTimeSplit[0])) * 60 + (parseInt(leaveTimeSplit[1]) - parseInt(startTimeSplit[1]));

  const newProject = {};
  const attendance = 2;

  if (leave_time) {
    newProject.leave_time = leave_time;
  }
  if (worked_mins) {
    newProject.worked_mins = worked_mins;
  }
  if (attendance) {
    newProject.attendance = attendance;
  }


  

  try {
    project = await Attendance.findByIdAndUpdate(
      req.params.id,
      { $set: newProject },
      { new: true }
    );

    console.log("ud",project)

    res.json(project);
  } catch (err) {

    res.json({ error: "internal Server Error", err: err.message });
  }
});

// ----------------------------------- Route 3: add new attendance using POSt: "api/attendance/addProject"
router.post("/markDailyAttendance",fetchuser, async (req, res) => {
  const {
    reason,
    start_time,
    leave_time,
    date,    
    latitude, 
    longitude
  } = req.body;

  const location = await axios.get(`https://api.api-ninjas.com/v1/reversegeocoding?lat=${latitude}&lon=${longitude}`, {
    headers: {
      'X-Api-Key': 'GOx/Vo6gdNdNFuwaivjxEg==2tPXGWPINTWtiBq3',
    },
  });

  const place = location.data[0].name.toString();
  var worked_mins = 0;
  let user = await User.findById(req.user.id);
  const attendance = 1;
  try {
    const project= new Attendance({
      user:req.user.id,
      attendance: attendance,
      reason,
      start_time,
      leave_time,
      worked_mins,
      date,
      place,
      name:user.name
    });


    const saveClothe = await project.save();
    console.log(saveClothe, "Successfully Saved!!")
    res.send(saveClothe);

  } catch (err) {

    res.json({ error: "internal Server Error", err: err.message });
  }
});

// ------------------------------------ Route 4: delete an existing attendance using DELETE: "api/attendance/deleteProject" -login required
router.delete("/removeDailyAttendance/:id",  async (req, res) => {
    
    // find the attendance to be updated and update it
    var attendance = await Attendance.findById(req.params.id);
    
    if (!attendance) {
      return res.status(404).send("Not found");
    }

    try {
      attendance = await Attendance.findByIdAndDelete(req.params.id);
      res.send(attendance);

    } catch (err) {

      res.json({ error: "internal Server Error", err: err.message });
    }

  });

module.exports = router;