import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'

import projectContext from '../../../context/project/projectContext'
import "./_project.scss"

const Project = ({_id, title, description, start_date, due_date, spent, status, assigned, priority, where="true"}) => {
    const Context = useContext(projectContext)
    const navigate = useNavigate();
    const {toComponentB} = Context;
    

    console.log({_id, title, description, start_date, due_date, spent, status, assigned, priority, where})

    // const total_tasks_of_project = tasks.filter((task)=>{
    //     return(
    //         task.project_id === _id
    //     )
    // })

    // const completed_tasks = total_tasks_of_project.filter((task)=>{
    //     return(task.status === "complete")
    // })

    

    // const progress = (completed_tasks.length / total_tasks_of_project.length) * 100
    
  return (


        <tr className='task-row text-white' key={_id}  onClick={() => { toComponentB({  _id,  title, 
        description,
        start_date, 
        due_date, 
        spent,
        status,
        priority,
        where,
        assigned}, navigate);}}>
            <td  className='p-3'>{title}</td>
            <td>{description}</td>
            <td>{assigned[0][0].assigned}</td>
            {
    status === "in progress" ? (
      <td><span className='warning'>{status}</span></td>
    ) : status === "completed" ? (
      <td><span className='primary'>{status}</span></td>
    ) : status === "not started yet" ? (
      <td><span className='grey'>{status}</span></td>
    ) : status === "issue" ? (
      <td><span className='danger'>{status}</span></td>
    ) : null
  }
            
  {
    priority === "Low" ? (
      <td><span className='primary'>{priority}</span></td>
    ) : priority === "Medium" ? (
      <td><span className='warning'>{priority}</span></td>
    ) : priority === "High" ? (
      <td><span className='danger'>{priority}</span></td>
    ) : null
  }
            <td>{start_date}</td>
            <td>{due_date}</td>
        </tr>

  )
}

export default Project
