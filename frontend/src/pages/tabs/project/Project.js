 import React, {useState, useEffect, useRef, useContext} from 'react'
 import projectContext from "../../../context/project/projectContext"
 import Profile from "../../../features/component/circular-profile/Profile"
 import UpdateTask from '../../../widgets/forms/updatetask/UpdateTask'
 import { useLocation, Link, useHistory } from 'react-router-dom';
 import "./_project.scss";
import Navigator from '../../../features/component/navigator/Navigator';

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
        where,
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
  const [home, sethome] = useState(where)
     return (
     <div className='task-main' key={_id} style={dashboardStyle}>
     {home == "true" ? (
             <Link to="/dashboard">
     <div className="d-flex flex-row tms-btn">
     <div className="tms-btn">
      <img src={`${require("./back.png")}`}/>
      </div>
     <h4 className="dashboard-title">Task details</h4></div></Link>):(<Link to="/tasks">
     <div className="d-flex flex-row tms-btn">
      <div to="/tasks" className="tms-btn">
      <img src={`${require("./back.png")}`}/>
      </div>
     <h4 className="dashboard-title">Task details</h4></div></Link>)}
     <div className='info d-flex flex-row justify-content-around align-content-center p-3' >
       <div className="task-profile">
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
     <UpdateTask taskInfo={{ _id, title, description, spent, assigned, status, priority, start_date, due_date }} />
<Navigator/>
   </div>
   )
 }

 export default Project
