const fetchuser = require("../middleware/fetchuser");
const Project = require("../models/Project");
const express = require("express");
const ProjectHistory = require("../models/ProjectHistory");
const router = express.Router();

router.get("/projecthistory/:id", fetchuser,async (req, res) => {
  try {
    // Use req.query to access query parameters from the URL
    
  
    // Use await to wait for the query execution
    const projecthistory = await ProjectHistory.find({project_id: req.params.id });
    res.json(projecthistory);
  } catch (err) {
    console.log(err);
    // Handle errors appropriately (e.g., send an error response)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ---------------------------------- Route 1: get all projects using GET: "api/project/allProjectDetails"
router.get("/allProjectDetails", fetchuser, async (req, res) => {
  try {
    const project = await Project.find({ user: req.user.id });
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.json({ error: "internal Server Error", err: err.message });
  }
});



// ------------------------------------------ Route 2: update an existin projectusing PUT: "api/projects/update" -login required
router.put("/updateProject/:id", fetchuser, async (req, res) => {
  const {       
    title, 
    description,
    budget,
    spent, 
    start_date, 
    due_date,
    priority, 
    client, 
    members,
    tasks, 
    img
  } = req.body;

  const newProject = {};
  if (title) {
    newProject.title = title;
  }
  if (start_date) {
    newProject.start_date = start_date;
  }
  if (priority) {
    newProject.priority = priority;
  }
  if (img) {
    newProject.img = img;
  }
  if (members) {
    newProject.members = members;
  }
  if (description) {
    newProject.description = description;
  }
  if (budget) {
    newProject.budget = budget;
  }
  if (spent) {
    newProject.spent = spent;
  }
  if (due_date) {
    newProject.due_date = due_date;
  }
  if (tasks) {
    newProject.tasks = tasks;
  }
  if (client) {
    newProject.client = client;
  }

console.log()
  // find the project to be updated and update it
  var project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).send("not found");
  }
  if (project.user.toString() !== req.user.id) {
    return res.status(401).send("Unauthorized");
  }
  
  try {
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: newProject },
      { new: true }
    );
    res.json(project);
    console.log(project,"success")
  } catch (err) {
    console.error(err.message);
    res.json({ error: "internal Server Error", err: err.message });
  }
});




// ----------------------------------- Route 3: add new project using POSt: "api/project/addProject"
router.post("/addProject", fetchuser, async (req, res) => {
  const {
    title, 
    description,
    budget,
    spent, 
    start_date, 
    due_date, 
    priority, 
    client, 
    tasks,
    members, 
    img
  } = req.body;

  try {

    console.log(req.user,"req")
    const project = new Project({
      user:req.user.id,
      title, 
      description, 
      budget, 
      spent, 
      start_date, 
      due_date, 
      priority, 
      client, 
      tasks,
      members,
      img
    });

    console.log(project, "project")

    const saveClothe = await project.save();
    console.log(saveClothe, "saved")
    res.send(saveClothe);

  } catch (err) {
    console.error(err.message);
    res.json({ error: "internal Server Error", err: err.message });
  }
});



// ------------------------------------ Route 4: delete an existing project using DELETE: "api/project/deleteProject" -login required
router.delete("/removeProject/:id", fetchuser, async (req, res) => {

    // find the project to be updated and update it
    var project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Not found");
    }
  
    try {
      project = await Project.findByIdAndDelete(req.params.id);
      res.send(project);
    } catch (err) {
      console.error(err.message);
      res.json({ error: "internal Server Error", err: err.message });
    }
  });





module.exports = router;