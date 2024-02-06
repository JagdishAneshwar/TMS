import React, {useState, useEffect, useContext} from 'react'
import projectContext from "../../../context/project/projectContext"
import Card from "../../../features/component/card/Card";
import Project from "../../../features/component/project/Project";
import AddTask from '../../../features/component/task-model/TaskModel';
import Task from '../../../features/component/task-card/Task';
import MarkCompleteTask from '../../../features/component/completemark/MarkCompleteTask';
import Table from "./Table"
import DrawDoughnut from "../../../features/graph/dough/DrawDoughnut";
import "./_dashboard.scss";
import Navigator from '../../../features/component/navigator/Navigator';
// import Table from './Table';

const Dashboard = () => {

   const context = useContext(projectContext);
   const { tasks, getTasks } = context;

   useEffect(() => {
      getTasks()  
   },[]);

   const user_name = localStorage.getItem("name");
   const code = localStorage.getItem("code");



    const task_not_started = tasks.filter((task) => {
      return task.status === "not started yet";
    });

    const task_progress = tasks.filter((task) => {
        return task.status === "in progress";
    });

    const task_complete = tasks.filter((task) => {
      return (
        task.status === "completed" 
      );
    });

    // task with done status
    const task_list = tasks.filter((task) => {
          return task.status != "done";
    });

    const task_done_list = tasks.filter((task) => {
      return task.status === "done";
    });

    const task_issue_list = tasks.filter((task) => {
      return task.status === "issue";
    });


    const task_len = tasks.length;
    const task_not_started_length = task_not_started.length;
    const task_progress_length = task_progress.length;
    const complete_length = task_complete.length;
    const task_done_length = task_done_list.length;
    const task_issue_length = task_issue_list.length;
    const incomplete_length = task_len - complete_length - task_done_length;

  //  const overdueCalculator = (due_date) =>{
  //    const currentDate = new Date();  // Current date
  //    const dueDate = new Date(due_date);  // Example due date
    
  //    // Calculate the time difference in milliseconds
  //    const timeDifference = dueDate.getTime() - currentDate.getTime();
    
  //    // Convert milliseconds to hours
  //    const hoursDifference = timeDifference / (1000 * 60 * 60);
    
  //    return(hoursDifference)
  //  }

  //  const task_overdue = tasks.filter((task) => {
  //    return tasks.some((task) => {
  //      return task._id === task.task_id && task.status !== "complete" && overdueCalculator(task.due_date) <= 0;
  //    });
  //  });
  
     // due date coming in next 2 days
     var targetDate = new Date();
     targetDate.setDate(targetDate.getDate() + 2);
     var dd = targetDate.getDate();
     var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
     var yyyy = targetDate.getFullYear();
     var dateString = yyyy + "-" + mm + "-" + ("0"+dd).slice(-2);
     
   const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
   const doughnutPosition = viewportWidth < 1000 ? 'right' : 'bottom';
   const doughnutWidth = viewportWidth < 1000 ? '100%' : '30%';
   const doughnutHeight = viewportWidth < 1000 ?  '100%' : '30%';
   let doughnutStyle ={
    width: doughnutWidth,
    height: doughnutHeight
   }


   const dashboardWidth = viewportWidth < 1000 ? '100%' : '80%';
   const dashboardMargin = viewportWidth < 1000 ? '0%' : '10%';
   
   let dashboardStyle ={
    width: dashboardWidth,
    marginLeft: dashboardMargin
   }

   const tasksectionFlexDirection = viewportWidth < 1000 ? 'column-reverse' : 'row-reverse';
   
   let tasksectionStyle ={
    flexDirection: tasksectionFlexDirection
   }

   
   const taskscompletetableWidth = viewportWidth < 1000 ? '100%' : '70%';
   
   let taskscompletetableStyle ={
    width: taskscompletetableWidth
   }


   return (
     <div className="dashboard" style={dashboardStyle}>
     <div className="heading-wrapper justify-content-between">
       <h4 className="dashboard-title">Dashboard</h4>
       <h5>Hello, {user_name} Welcome Back</h5>
       </div><hr/><br/>
       <div className="d-flex flex-row task-section  justify-content-around align-items-center pt-3">
         <Card
           img={require(`../../../res/image/ongoing.png`)}
           header="Ongoing Tasks"
           value={task_progress_length}
           width={"30%"}
         />
         <Card
           img={require(`../../../res/image/under.png`)}
           header="Budget Defiecient"
           value="2"
           width={"30%"}
         />
         <Card
           img={require(`../../../res/image/high_risk.png`)}
           header="Expired Tasks"
           value="3"
           width={"30%"}
         />
       </div><br/><br/>
        {/* <Table/>  */}
       <h2>Task Progress</h2><hr/>
       { task_complete.length > 0 || complete_length > 0 || incomplete_length > 0 ?(<div className="project-progress justify-content-around"  style={tasksectionStyle}>
       { code == "2562" ? (
       <div className='task-complete-table ' style={taskscompletetableStyle}><h3>Review Completed Tasks</h3>
       { task_complete.length > 0 ? ( 
        <table className="table task-complete-table-main text-white table-striped table-hover mt-4">
         <thead>
         <th className='pb-3'>Mark</th>
          <th className='pb-3'>Title</th>
          <th className='pb-3'>Description</th>
          <th className='pb-3'>Assigned To</th>
          <th className='pb-3'>Status</th>
         </thead>
         <tbody className='task-complete-table-body'>
         { task_complete && task_complete.map((task,i) => {
           return ( 
           <MarkCompleteTask
           _id={task._id}
             title={task.title}
             description={task.description}
             spent={task.spent}
             status={task.status}
             assigned={task.assigned}         
           /> );
         })
       }</tbody>
       </table>):(<p className='quotes'>Nothing to preview</p>)}
</div>):(null)}
       {complete_length > 0 || incomplete_length > 0 ? ( 
         <div className="doughnut-wrap" style={doughnutStyle}>
           <DrawDoughnut
             title=""
             position={doughnutPosition}
             align="center"
             label={["Issue", "Not Started Yet", "Progress","Complete"]}
             values={[task_issue_length, task_not_started_length,task_progress_length, complete_length]}
             titpos="top"
             titalgn="center"
           />
         </div>):(<p className='quotes'>Nothing to preview</p>)}
         </div>):(<p className='quotes'>Nothing to preview</p>)}<br></br><br></br>
    
         <h2 className="project-by-priority-title mb-2">Tasks Overview</h2> <hr/>
         <div className="project-lists mt-3">
       <div className="task-list-table-wrapper">
        {task_list.length > 0?( <table className="table task-list-table text-white table-striped table-hover">
         <thead>
          <th>Title</th>
          <th>Description</th>
          <th>Assigned To</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Due Date</th>
          <th>Start Date</th>
         </thead>
         <tbody className='task-list-table-body'>
         { task_list && task_list.map((task,i) => {
           return ( 
           <Project
           _id={task._id}
             title={task.title}
             description={task.description}
             start_date={task.start_date}
             due_date={task.due_date}
             status={task.status}
             spent={task.spent}
             assigned={task.assigned}
             priority={task.priority}
             due={task.due_date}            
           /> );
         })
       }</tbody>
       </table>):(<p className='quotes'>Nothing to preview</p>)}</div><br/><br/>

        
             </div> <br/><br/>

        <h2 className='task-overview-title'>Kanban Board</h2><hr/>
        {task_not_started_length > 0 || complete_length > 0 || task_progress_length > 0 ?
(        <div className='tasks-overview'>
            <div className='tasks-wrapper justify-content-around'>
              <div className='todo-list'>
                <h4 className='todo-list-title todo'>Not Started Yet</h4>{task_not_started_length > 0 ?
                (<div className='todo-wrapper'>
                {task_not_started.map((task, i) => (
                  
              <Task key={i} task_id={task._id}  title={task.title} description={task.description} spent={task.spent} start_date={task.start_date} status={task.status} assigned={task.assigned} priority={task.priority} due_date={task.due_date} />
            ))}

                  
                </div>):(<p className='quotes'>Nothing to preview</p>)}
              </div> 
                  
              <div className='todo-list'>
                <h4 className='todo-list-title todo'>In Progress</h4>{task_progress_length > 0 ?
                (   
                <div className='todo-wrapper'>
                {task_progress.map((task, i) => (
                  
              <Task key={i} task_id={task._id}  title={task.title} description={task.description} spent={task.spent} start_date={task.start_date} status={task.status} assigned={task.assigned} priority={task.priority} due_date={task.due_date} />
            )) 
            
            }

                  
                </div>):(<p className='quotes'>Nothing to preview</p>)   }
              </div>   
              <div className='todo-list'>
                <h4 className='todo-list-title todo'>Issue</h4>
                {task_issue_length > 0 ?   
             (
                <div className='todo-wrapper'>
                {task_issue_list.map((task, i) => (
                      <Task key={i} task_id={task._id}  title={task.title} description={task.description} spent={task.spent} start_date={task.start_date} status={task.status} assigned={task.assigned} priority={task.priority} due_date={task.due_date} />
                ))}

                  
                </div>):(<p className='quotes'>Nothing to preview</p>)}
              </div>
              </div>
              </div>):(<p className='quotes'>Nothing to preview</p>) }

              <div className="w-50" style={{height:"10%"}}>
              <Navigator
      isDashboardSelected="true"
      /></div>
           
     </div>
   );
};

export default Dashboard;


