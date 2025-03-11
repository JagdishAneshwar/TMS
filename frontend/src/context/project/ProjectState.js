import React, { useState } from "react";
import projectContext from "./projectContext";

const ProjectState = (props) => {
  const notesInitial = [];
  const notesInitial2 = [];
  const notesInitial3 = [];
  const [projects, setproject] = useState(notesInitial);
  const [projecthistory, setprojecthistory] = useState(notesInitial);
  const [tasks, settask] = useState(notesInitial2);
  const [attendances, setAttendance] = useState(notesInitial3);
  const [leaves, setLeaves] = useState(notesInitial3);
  const host = "https://api-tms.vercel.app"
  const notesInitialemp = [];
  const [employees, setemployees] = useState(notesInitialemp);

  const getAllEmployeeDetails = async () => {
    try {

      const response = await fetch(`${host}/api/user/allUserDetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();

      setemployees(json);
    } catch (error) {
      console.error("Error in getAllEmployeeDetails:", error);
    }
  };
  
  const getProject = async () => {
    try {
          // API calls
    const response = await fetch(
      `${host}/api/user/allUserDetails`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setproject(json);
    } catch (error) {
      console.error("Error in getProject:", error);
      // Handle the error as needed
    }
  };
  const getProjectHistory = async (_id) => {
    // API calls
    const response = await fetch(
      `${host}/api/project/projecthistory/${_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "auth-token": localStorage.getItem("token"),
        },
        
      }
    );
    const json = await response.json();
    setprojecthistory(json);
  };

  const createProject = async (
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
  ) => {
    const response = await fetch(`${host}/api/project/addProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        budget,
        client,
        spent: "0",
        tasks: "",
        img: "",
        members,
        priority,
        start_date,
        due_date
      }),
    });

    const project = await response.json();
    setproject(project);
  };

  const createTask = async (
    title,
    description,
    spent,
    status,
    priority,
    assigned,
    start_date,
    due_date
    
  ) => {
    const response = await fetch(`${host}/api/task/addTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title,
        description,
        spent,
        status,
        priority,
        assigned,
        start_date,
        due_date
      }),
    });
    
    const task = await response.json();
    settask(task);
    
  };

  const markDailyAttendance = async (
    reason, 
    start_time, 
    leave_time,
    date,
    latitude,
    longitude
  ) => {
    const response = await fetch(`${host}/api/attendance/markDailyAttendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        reason, 
        start_time, 
        leave_time,
        date,
        latitude,
        longitude,
      }),
    }); 
    const task = await response.json();  
  };

  const updateDailyAttendance = async (
    id, 
    leave_time
  ) => {
    console.log("state",
    id, 
    leave_time)
    const response = await fetch(`${host}/api/attendance/updateDailyAttendance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        leave_time
      }),
    }); 
    const task = await response.json();  
  };

  const updateLeave = async (ids) => {
    const response = await fetch(`${host}/api/leave/updateLeaveViewStatus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ids}),
    }); 
    const task = await response.json(); 
  };

  const updateLeaveApproval = async (id, status, comment) => {
    const response = await fetch(`${host}/api/leave/updateLeaveApproval`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({id, status, comment}),
    }); 
    const task = await response.json(); 

  };

  const getTasks = async () => {
    // API calls
    const response = await fetch(
      `${host}/api/task/allTaskDetails`,
      {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    settask(json);
  };

  const getLeaves = async () => {
    // API calls
    const response = await fetch(
      `${host}/api/leave/getAllLeaves`,
      {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setLeaves(json);
  };

  const getAttendance = async () => {
    // API calls
    const response = await fetch(
      `${host}/api/attendance/getDailyAttendance`,
      {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setAttendance(json);
  };

    const deleteTask = async (id) => {
      // API calls
      
      const response = await fetch(`${host}/api/task/removeTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "auth-token": localStorage.getItem("token"),
        },
      });
      
      // eslint-disable-next-line
      const json = await response.json();
      
      const newTasks = tasks.filter((task) => {
        return task._id !== id;
      });
      settask(newTasks);
    };
    
    const deleteProject = async (_id) => {
      // API calls
      
      const response = await fetch(`${host}/api/project/removeProject/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "auth-token": localStorage.getItem("token"),
        },
      });
      
      // eslint-disable-next-line
      const json = await response.json();
      
      const newProjects = projects.filter((project) => {
        return projects._id !== _id;
      });
      setproject(newProjects);
    };

  const updateProject = async (
    id,
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
  ) => {
    // API calls
    
    const response = await fetch(`${host}/api/project/updateProject/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
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
        img  }),
    });
    // eslint-disable-next-line
    const json = await response.json();
    
    let newProject = JSON.parse(JSON.stringify(projects));
    // Logic to edit note
    for (let index = 0; index < newProject.length; index++) {
      const element = newProject[index];
      if (element._id === id) {
        newProject[index].title = title;
        newProject[index].description = description;
        newProject[index].budget = budget;
        newProject[index].spent = spent;
        newProject[index].start_date = start_date;
        newProject[index].due_date = due_date;
        newProject[index].priority=priority;
        newProject[index].client=client;
        newProject[index].tasks=tasks;
        newProject[index].members=members;
        newProject[index].img=img
        break;
      }
    }
    
    setproject(newProject);
  };

  const updateTask = async (
    task_id,
    title,
    description,
    spent,
    assigned,
    status,
    priority,
    start_date,
    due_date
  ) => {

    console.log("first", {    task_id,
      title,
      description,
      spent,
      assigned,
      status,
      priority,
      start_date,
      due_date})

    const response = await fetch(`${host}/api/task/updateTask/${task_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
         title, description, spent, start_date, status, assigned, priority, due_date
      }),
    });
    // eslint-disable-next-line
    const json = await response.json();
    
  
    let newTasks = JSON.parse(JSON.stringify(tasks));
    // Logic to edit task
    for (let index = 0; index < newTasks.length; index++) {
      const element = newTasks[index];
      if (element._id === task_id) {
        newTasks[index].title = title;
        newTasks[index].description = description;
        newTasks[index].spent = spent;
        newTasks[index].start_date = start_date;
        newTasks[index].status = status;
        newTasks[index].assigned = assigned;
        newTasks[index].priority = priority;
        newTasks[index].due_date = due_date;
        break;
      }
    }
    settask(newTasks);
  };
  
  const toComponentB = ({  _id,    title,
    description,
    spent,
    assigned,
    status,
    priority,
    start_date,
    where,
    due_date}, navigate) => {
    navigate(`/task`, {
      state: {  _id,    title,
        description,
        spent,
        assigned,
        status,
        start_date,
        priority,
        where,
        due_date },
    });

    console.log(_id,    title,
      description,
      spent,
      assigned,
      status,
      start_date,
      priority,
      where,
      due_date )
    
  };

  const toDetailedEmployeedPage = ({ _id,
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
    gender,
    salary }, navigate) => {
    navigate(`/detailedEmployeePage`, {
      state: {  
        _id,
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
        gender,
        salary
        },
    });
    
  };
  
  const requestLeave = async (    
    leavereason,     
    from,    
    to) =>{

    const response = await fetch(`http://localhost:5000/api/leave/requestLeave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },        
      body: JSON.stringify({    leavereason,     
        from,    
        to})
    });
    // eslint-disable-next-line
    const json = await response.json();

    return json
   
  }


  return (
    <projectContext.Provider
      value={{
        projects,
        projecthistory,
        setproject,
        createProject,
        getProject,
        toComponentB,
        updateProject,
        createTask,
        getTasks,
        deleteTask,
        getProjectHistory,
        deleteProject,
        updateTask,
        markDailyAttendance,
        requestLeave,
        getLeaves,
        getAttendance,
        updateDailyAttendance,
        toDetailedEmployeedPage,
        leaves, setLeaves,
        requestLeave,
        updateLeaveApproval,
        updateLeave,
        tasks,
        attendances,
        employees, 
            setemployees,
            getAllEmployeeDetails
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
