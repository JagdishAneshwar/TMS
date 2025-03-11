import React, { useState } from "react";
import projectContext from "./projectContext";

const ProjectState = (props) => {
  const host = "https://api-tms.vercel.app";
  const [projects, setProjects] = useState([]);
  const [projectHistory, setProjectHistory] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [attendances, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchAPI = async (url, method = "GET", body = null) => {
    try {
      const response = await fetch(`${host}${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: body ? JSON.stringify(body) : null,
      });
      return response.json();
    } catch (error) {
      console.error(`Error in ${url}:`, error);
      return null;
    }
  };

  const getAllEmployeeDetails = async () => {
    const data = await fetchAPI("/api/user/allUserDetails");
    if (data) setEmployees(data);
  };

  const getProject = async () => {
    const data = await fetchAPI("/api/user/allUserDetails");
    if (data) setProjects(data);
  };

  const getProjectHistory = async (_id) => {
    const data = await fetchAPI(`/api/project/projecthistory/${_id}`);
    if (data) setProjectHistory(data);
  };

  const createProject = async (projectData) => {
    const data = await fetchAPI("/api/project/addProject", "POST", projectData);
    if (data) setProjects([...projects, data]);
  };

  const createTask = async (taskData) => {
    const data = await fetchAPI("/api/task/addTask", "POST", taskData);
    if (data) setTasks([...tasks, data]);
  };

  const markDailyAttendance = async (attendanceData) => {
    await fetchAPI("/api/attendance/markDailyAttendance", "POST", attendanceData);
  };

  const updateDailyAttendance = async (id, leave_time) => {
    await fetchAPI(`/api/attendance/updateDailyAttendance/${id}`, "PUT", { leave_time });
  };

  const updateLeave = async (ids) => {
    await fetchAPI("/api/leave/updateLeaveViewStatus", "PUT", { ids });
  };

  const updateLeaveApproval = async (id, status, comment) => {
    await fetchAPI("/api/leave/updateLeaveApproval", "PUT", { id, status, comment });
  };

  const getTasks = async () => {
    const data = await fetchAPI("/api/task/allTaskDetails");
    if (data) setTasks(data);
  };

  const getLeaves = async () => {
    const data = await fetchAPI("/api/leave/getAllLeaves");
    if (data) setLeaves(data);
  };

  const getAttendance = async () => {
    const data = await fetchAPI("/api/attendance/getDailyAttendance");
    if (data) setAttendance(data);
  };

  const deleteTask = async (id) => {
    await fetchAPI(`/api/task/removeTask/${id}`, "DELETE");
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const deleteProject = async (_id) => {
    await fetchAPI(`/api/project/removeProject/${_id}`, "DELETE");
    setProjects(projects.filter((project) => project._id !== _id));
  };

  const updateProject = async (id, updatedData) => {
    await fetchAPI(`/api/project/updateProject/${id}`, "PUT", updatedData);
    setProjects(projects.map((project) => (project._id === id ? { ...project, ...updatedData } : project)));
  };

  const updateTask = async (task_id, updatedData) => {
    await fetchAPI(`/api/task/updateTask/${task_id}`, "PUT", updatedData);
    setTasks(tasks.map((task) => (task._id === task_id ? { ...task, ...updatedData } : task)));
  };

  const requestLeave = async (leaveData) => {
    return await fetchAPI("/api/leave/requestLeave", "POST", leaveData);
  };

  return (
    <projectContext.Provider
      value={{
        projects,
        projectHistory,
        tasks,
        attendances,
        leaves,
        employees,
        setEmployees,
        getAllEmployeeDetails,
        createProject,
        getProject,
        getProjectHistory,
        deleteProject,
        updateProject,
        createTask,
        getTasks,
        deleteTask,
        updateTask,
        markDailyAttendance,
        getAttendance,
        updateDailyAttendance,
        requestLeave,
        getLeaves,
        updateLeaveApproval,
        updateLeave,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;
