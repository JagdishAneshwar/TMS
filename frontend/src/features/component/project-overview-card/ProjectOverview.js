import React, { useContext } from 'react';
import projectContext from "../../../context/project/projectContext";
import { useNavigate } from "react-router-dom";
import "./_taskoverviewcard.scss"

const ProjectOverview = ({
  _id,
  title,
  description,
  spent,
  assigned,
  status,
  priority,
  start_date,
  due_date
}) => {
  const context = useContext(projectContext);
  const navigate = useNavigate();
  const { deleteTask, updateTask, toComponentB } = context;

  const onClickRemoveTask = () => {
    deleteTask(_id);
    window.location.reload();
  };

  let statusColor;
  switch (status) {
    case 'not started yet':
      statusColor = 'grey';
      break;
    case 'in progress':
      statusColor = '#F6D155';
      break;
    case 'issue':
      statusColor = '#C5120B';
      break;
    default:
      statusColor = 'grey';
  }

  let priorityColor;
  switch (priority) {
    case 'Low':
      priorityColor = '#34BB78';
      break;
    case 'Medium':
      priorityColor = 'yellow';
      break;
    case 'High':
      priorityColor = '#C5120B';
      break;
    default:
      priorityColor = 'grey';
  }


  const taskStyle = {
    borderTop: `4px solid ${priorityColor}`,
  };

  const statusStyle = {
    color: `${statusColor}`,
  };

  return (
    <div
      className="project-card-overview"
      onClick={() => {
        toComponentB({
          _id,    
          title,
          description,
          spent,
          assigned,
          status,
          priority,
          start_date,
          due_date
        }, navigate);
      }}
    >
      <div className="project-overview" key={_id} style={taskStyle}>
        <div className="card-body project-overview-body">
          <h5 className="card-title project-overview-title border-bottom pb-2" >{title}</h5>

          <p className="card-text project-overview-description"><b>Desc:</b> <br/>{description}</p>
          { assigned[0][0] ? (<p className="card-text project-overview-description"><b>Assigned to:</b> <br/>none</p>):(<p className="card-text project-overview-description"><b>Assigned to:</b> <br/>{assigned[0][0].assigned}</p>)}
          <span className='bottom-task-card-overview border-top pt-2'>
          <div className="card-text project-overview-description d-flex justify-content-between"><p className="card-text project-overview-description"><b>Due:</b> <br/>{due_date}</p><p className="card-text project-overview-description"><b>Status:</b> <br/> <svg height="30px" width="30px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill={statusColor}><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <path class="st0" d="M498.472,223.88l-17.143-17.468L386.3,124.158c-8.627-7.452-19.646-11.558-31.024-11.558H157.146 c-11.703,0-22.95,4.314-31.667,12.139L15.712,223.313C5.73,232.293,0,245.144,0,258.575v93.417C0,378.137,21.263,399.4,47.4,399.4 h417.2c26.137,0,47.4-21.263,47.4-47.407v-94.945C512,244.577,507.196,232.798,498.472,223.88z M349.463,233.51l-1.293,5.433 c-10.224,42.873-48.126,72.812-92.174,72.812c-44.047,0-81.943-29.939-92.166-72.812l-1.292-5.433h-20.096l-65.857,0.628 l77.657-72.472c1.182-1.106,2.724-1.714,4.341-1.714h195.068c1.549,0,3.042,0.56,4.204,1.582l82.972,71.975H349.463z"></path> </g> </g></svg></p><p className="card-text project-overview-description"><b>Priority:</b> <br/>{priority}</p></div>
          <button
            type="button"
            className="btn-danger w-100 project-overview-remove"
            onClick={onClickRemoveTask}
          >
            Remove
          </button></span>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
