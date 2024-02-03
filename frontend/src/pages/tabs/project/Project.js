 import React, {useState, useEffect, useRef, useContext} from 'react'
 import projectContext from "../../../context/project/projectContext"
 import DrawDoughnut from "../../../features/graph/dough/DrawDoughnut"
 import Profile from "../../../features/component/circular-profile/Profile"
 import DrawLine from '../../../features/graph/line/DrawLine';
 import Task from '../../../features/component/task-card/Task';
 import { Link, useNavigate } from "react-router-dom";

 import UpdateTask from '../../../widgets/forms/updatetask/UpdateTask'
 import AddTask from '../../../features/component/task-model/TaskModel';
 import { useLocation } from "react-router-dom";
 import "./_project.scss";

 const Project = () => {
   const location = useLocation();
     const {    
        _id,
        title,
        description,
        spent,
        assigned,
        status,
        priority,
        start_date,
        due_date} = location.state;
        const members = assigned[0][0].assigned;
        const context = useContext(projectContext);
        const { getTasks, deleteTask, employees } = context;
        // Create a new Date object
        // Log the current date


      

      
      const overdueCalculator = (due_date) => {
        const currentDate = new Date();
        const dueDate = new Date(due_date);
      
        if (isNaN(dueDate.getTime())) {
          console.error('Invalid due date format');
          return null;
        }
      
        // Calculate the time difference in milliseconds
        const timeDifference = dueDate.getTime() - currentDate.getTime();
      
        // Convert milliseconds to hours
        const hoursDifference = Math.floor(timeDifference / (3600000));
      
        return { hoursDifference, currentDate: currentDate.toLocaleString(), dueDate: dueDate.toLocaleString() };
      };

      
      
      
      
     useEffect(() => {
       getTasks()
     },[]);
;

const onClickRemoveTask = () => {
  deleteTask(_id);
  window.location.reload();
};



  //  const getMemberName = (id) => {
  //    const member = employees.find((employee) => employee._id.toString() === id.toString());
  //    return member ? member.name : `Unknown Member ${id}`;
  //  };

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const dashboardWidth = viewportWidth < 1000 ? '100%' : '80%';
  const dashboardMargin = viewportWidth < 1000 ? '0%' : '10%';
  
  let dashboardStyle ={
   width: dashboardWidth,
   marginLeft: dashboardMargin
  }

     return (
     <div className='project-main' key={_id} style={dashboardStyle}>
     <UpdateTask taskInfo={{ _id, title, description, spent, assigned, status, priority, start_date, due_date }} />
     <Link to="/dashboard"><h4 className="dashboard-title">Dashboard</h4></Link>
     <div className='info d-flex flex-row justify-content-around align-content-center p-3' >
       <div className="project-profile">
       <Profile />
       </div>
       <div className='title-description'>
       <h3 className='title'>{title}</h3>
       <div className='description'>{description}</div>
       </div>
     </div>
     <h4 className='summary-title title'>Summary</h4><hr/>

     <div className='summary mb-3'>
       <div className='summary-wrap d-flex flex-row  justify-content-between'>
         <div className='budget-info'>
         
         <div className='spent'>Spent: {spent}</div>
         </div>
         <div className='date-info'>
         {overdueCalculator(due_date).hoursDifference > 0 ? (<div className='start-date'>Delayed by: <span className='text-danger'>{Math.abs(Math.round(overdueCalculator(due_date).hoursDifference/24))} Days</span></div>) : (<div className='start-date'>Hours of Work Left: <span className='text-success'>{Math.abs(Math.round(overdueCalculator(due_date).hoursDifference/24))} Days</span></div>)}
         
         <div className='due-date'>Due Date: {due_date}</div>
         </div>
         <div className='date-info'>
         <div className='start-date'>Start Date: {start_date}</div>
         <div className='due-date'>Due Date: {due_date}</div>
         </div>
       </div>
     </div>
     <hr/>    
     <div>
   <h4>Members:</h4>

       <div>{members}</div>
 
 </div>

     <button type="button" className="btn task-update-btn btn-lg w-50" data-bs-toggle="modal" data-bs-target="#updateproject">Update</button>
     <button type="button" class="btn task-delete-btn btn-lg w-50" onClick={onClickRemoveTask}>Delete</button>


   </div>
   )
 }

 export default Project
