const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const User = require("../models/User");
const Leave = require("../models/Leave")
const router = express.Router();

router.post('/requestLeave',fetchuser, async (req, res) => {
  const {
    leavereason,     
    from,    
    to} = req.body;
  try {
    const date = new Date()
    let user = await User.findById(req.user.id);
    const leave = new Leave({
      user:req.user.id,
      name:user.name,
      date,
      leavereason, 
      comment:"",    
      from,    
      to,
      status:"under approval",
      adminsaw:"false",
      usersaw:"false"
    })
    const saveLeave = await leave.save();
    console.log(saveLeave)
    res.send(saveLeave);
  } catch (error) {
    
    console.error('Error:', error.message);
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : 'Internal Server Error',
    });
  }
});

router.get("/getAllLeaves", fetchuser, async(req, res) =>{
  try {
    let user = await User.findById(req.user.id);
    if( user.code == "2562"){
    const leaves = await Leave.find();
    res.json(leaves);}else if (user.code == "1000"){
      const leaves = await Leave.find({ user : req.user.id });
      res.json(leaves);
    } else{
    
      res.json("Invalid Code: Un-Authorized User");
    }
  } catch (err) {
    console.error(err.message);
    res.json({ error: "internal Server Error", err: err.message });
  }
});

router.put("/updateLeaveViewStatus", fetchuser, async(req, res) =>{
  const {ids} = req.body;
  try {
    for (const id of ids) {
      const leave = await Leave.findById(id);
      
      if (!leave) {
        return res.status(404).json({ error: `Leave with ID ${id} not found` });
      }
      let user = await User.findById(req.user.id);
      if( user.code == "2562"){
      leave.adminsaw = true; }else{
        leave.usersaw = true;
      }
      await leave.save();
    }
  } catch (err) {
    console.error(err.message);
    res.json({ error: "internal Server Error", err: err.message });
  }
});

router.put("/updateLeaveApproval", fetchuser, async(req, res) =>{
  const {id, status, comment} = req.body;
  try {
 
      const leave = await Leave.findById(id);
      
      if (!leave) {
        return res.status(404).json({ error: `Leave with ID ${id} not found` });
      }
      
      if(status){
      leave.status = status;
     }

      if(comment){
        leave.comment = comment; 
      }
      await leave.save();
      console.log(status)
    
  } catch (err) {
    console.error(err.message);
    res.json({ error: "internal Server Error", err: err.message });
  }
});


module.exports = router;
