import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';



import projectContext from '../../../context/project/projectContext'
import "./_markcompletetask.scss"

const MarkCompleteTask = ({_id, title, description, start_date, due_date, spent, status, assigned, priority}) => {
    const Context = useContext(projectContext)
    const navigate = useNavigate();
    const {toComponentB, updateTask} = Context;
    const [checked, setChecked] = useState({checked: false});
    const [show, setShow] = useState(false);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const onChange = async (e) => {
    setShow(true)
    await delay(5000);
    const { checked } = e.target
    setChecked({checked: checked});
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    updateTask(    _id,
      title,
      description,
      spent,
      assigned,
      newStatus,
      priority,
      start_date,
      due_date);
      setShow(false)
      window.location.reload()
    };

    const [selectedStatus, setSelectedStatus] = useState(status);


  return (
    <> {show ? (swal("Tasks will be permanently archived")) : null}
    <tr className='task-complete-marking text-white' key={_id}>

        <td className='p-3'><input className="" type="checkbox" value="done" name="completedmark" id="flexCheckIndeterminate" defaultChecked={checked.checked}  onChange={(e)=>onChange(e)} /></td>
            <td>{title}</td>
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

        </tr>

        </>
  )
}

export default MarkCompleteTask