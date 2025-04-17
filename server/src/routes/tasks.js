const fetchuser = require("../middleware/fetchuser");
const Task = require("../models/Task");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

// ---------------------------------- Route 1: get all projects using GET: "api/task/allProjectDetails"
router.get("/allTaskDetails", fetchuser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if( user.code == "2562"){
    const task = await Task.find();
    res.json(task);}else if (user.code == "1000"){
      const task = await Task.find({ creator: req.user.id });
      res.json(task);
    } else{
    
      res.json("Invalid Code: Un-Authorized User");
    }
  } catch (err) {
    console.error(err.message);
    res.json({ error: "internal Server Error", err: err.message });
  }
});

// ------------------------------------------ Route 2: update an existin projectusing PUT: "api/projects/update" -login required
router.put("/updateTask/:id", fetchuser, async (req, res) => {
  const {       
    title, 
    description,  
    spent,  
    due_date, 
    priority,
    status,
    start_date,
    assigned,
    checked
  } = req.body;

  const newProject = {};
  if (title) {
    newProject.title = title;
  }
  if (description) {
    newProject.description = description;
  }
  if (priority) {
    newProject.priority = priority;
  }
  if (spent) {
    newProject.spent = spent;
  }
  if (status) {
    newProject.status = status;
  }
  if (start_date) {
    newProject.start_date = start_date;
  }
  if (assigned) {
    newProject.assigned = assigned;
  }
  if (checked) {
    newProject.checked = checked;
  }
  if (due_date) {
    newProject.due_date = due_date;
  }

  var project = await Task.findById(req.params.id);
  if (!project) {
    return res.status(404).send("not found");
  }

  if (project._id.toString() !== req.params.id) {
    return res.status(401).send("Unauthorized");
  }

  try {
    project = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newProject },
      { new: true }
    );

    

    res.json(project);
  } catch (err) {

    res.json({ error: "internal Server Error", err: err.message });
  }
});

// ----------------------------------- Route 3: add new task using POSt: "api/task/addProject"
router.post("/addTask",fetchuser, async (req, res) => {
  const {
    title, 
    description,  
    spent,  
    due_date, 
    priority,
    status,
    start_date,
    assigned,
  } = req.body;
 

  try {
    const task = new Task({
      creator:req.user.id,
    title, 
    description, 
    spent, 
    due_date, 
    priority, 
    status,
    start_date,
    assigned
    });
    const saveClothe = await task.save();
    res.send(saveClothe);

  } catch (err) {

    res.json({ error: "internal Server Error", err: err.message });
  }
});

// ------------------------------------ Route 4: delete an existing task using DELETE: "api/task/deleteProject" -login required
router.delete("/removeTask/:id",  async (req, res) => {
    // find the task to be updated and update it

    var task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).send("Not found");
    }

    try {
      task = await Task.findByIdAndDelete(req.params.id);
      res.send(task);

    } catch (err) {

      res.json({ error: "internal Server Error", err: err.message });
    }
  });

module.exports = router;