import React, { useState, useEffect, useContext } from 'react';
import projectContext from "../../../context/project/projectContext";
import { useNavigate } from "react-router-dom";
import './_task.scss';

const Task = ({task_id, title, description, spent, start_date, status, assigned, priority, due_date }) => {
  const context = useContext(projectContext);
  const navigate = useNavigate();
  const { deleteTask, updateTask, toComponentB } = context;
  const onClickRemoveTask = () => {
    deleteTask(task_id);
  };

  const [selectedStatus, setSelectedStatus] = useState(status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    updateTask(    task_id,
      title,
      description,
      spent,
      assigned,
      newStatus,
      priority,
      start_date,
      due_date);
  };

  let statusColor;
  switch (selectedStatus) {
    case 'not started yet':
      statusColor = 'grey';
      break;
    case 'in progress':
      statusColor = '#F6D155';
      break;
    case 'issue':
      statusColor = '#ff6384';
      break;
    default:
      statusColor = 'grey';
  }

  let priorityColor;
  switch (priority) {
    case 'low':
      priorityColor = '#34BB78';
      break;
    case 'medium':
      priorityColor = 'yellow';
      break;
    case 'high':
      priorityColor = '#C5120B';
      case 'High':
        priorityColor = '#C5120B';
      break;
    default:
      priorityColor = 'grey';
  }


  const taskStyle = {
    borderLeft: `8px solid ${statusColor}`,
  };

  const priorityStyle = {
    color: `${priorityColor}`,
  };



  return (
    <div className='task-card d-flex flex-column mb-3 mt-3' style={taskStyle}>
      <div className='task-info'onClick={() => {
      toComponentB({
        task_id,    
        title,
        description,
        spent,
        assigned,
        status,
        priority,
        start_date,
        due_date
      }, navigate);
    }}>
        <p className='task-header'><b>{title}</b></p>
        <p className='task-value'>{description}</p>
      </div><hr/>
      <div className='task-footer  d-flex flex-row justify-content-between'>
        <div className='task-card-priority'>Priority: <br/><span style={priorityStyle}><b>{priority}</b></span></div>
        <div className='task-card-due'>Due Date:<br/><span style={{color:'black'}}>{due_date}</span></div>
        <div className='task-status'>
          <label htmlFor='status'>Status</label><br/>
          <select value={selectedStatus} onChange={handleStatusChange} className='status-selector-task'>
            <option value='not started yet' className='val-status'>Not Started</option>
            <option value='in progress' className='val-status'>In Progress</option>
            <option value='completed' className='val-status'>Completed</option>
          </select>
        </div>
      </div>
      <button
        type='button'
        className='btn delete-task btn-danger'
        onClick={onClickRemoveTask}
        data-bs-dismiss='modal'
        aria-label='Close'
      >
        Remove
      </button>
    </div>
  );
};

export default Task;
