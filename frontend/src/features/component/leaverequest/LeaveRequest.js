import React, { useState, useContext, useEffect } from 'react';
import projectContext from '../../../context/project/projectContext';
import "./_leaverequest.scss"

const LeaveRequest = ({leave, i, id}) => {

  const context = useContext(projectContext);
  const { updateLeaveApproval } = context;

    const [approvestatus, setapprovestatus] = useState("under approval")
    const [updateleave, setupdateleave] = useState({
        comment:""
    })
    const onChange = (e)=>{
      setupdateleave({...updateleave, [e.target.name]: e.target.value})
    }
    const code = localStorage.getItem("code")
    const onClickApprove= async ()=>{
    await setapprovestatus("approved")
    updateLeaveApproval(id,approvestatus, updateleave.comment)
    }

    const onClickreject= async ()=>{
    await setapprovestatus("rejected")
    updateLeaveApproval(id,approvestatus, updateleave.comment)
    }

    const calculateDateDifference = (from, to) => {
        const fromDate = new Date(from);
        const toDate = new Date(to);
        const timeDifference = toDate.getTime() - fromDate.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference
      };

      let statusColor;
      switch (leave.status) {
        case 'under approval':
          statusColor = 'grey';
          break;
        case 'approved':
          statusColor = '#00ba88';
          break;
        case 'rejected':
          statusColor = '#ff6384';
          break;
        default:
          statusColor = 'grey';
      }

      const statusStyle = {
        color : `${statusColor}`
      }

      const requeststatusStyle = {
        borderLeft : `8px solid ${statusColor}`
      }


  return (
    <>

  <div class="card leave-request mb-5 p-3" key={i} style={requeststatusStyle}>
  <div class="form card-body">
    <p>{code == "2562" ? (<>{leave.name.charAt(0).toUpperCase() + leave.name.slice(1)} has </>):(<>You have </>)} requested leave for {calculateDateDifference(leave.from, leave.to)} Days, starting from <b>{leave.from.split("-").reverse().join("-")}</b> To <b>{leave.to.split("-").reverse().join("-")}</b>, because of the following reason:</p>
    <hr/>
    <p class="card-text text-muted">{leave.leavereason}</p>
    {code != "2562" ? (<><hr/><div className="d-flex flex-row justify-content-between">
      <p class="card-text">Comment: {leave.comment}</p>
    <p class="card-text">Status: <span style={statusStyle}>{leave.status.charAt(0).toUpperCase() + leave.status.slice(1) }</span></p>
    </div></>) : null}
    {code == "2562" ? (
      <>
        <div className='col-md-6 mb-4'>
        
  <label htmlFor="comment" className="form-label">
    Comment
  </label>
  <textarea
    className="form-control"
    id="comment"
    aria-describedby="comment"
    name="comment"
    value={updateleave.comment} 
    onChange={onChange}
    required
  ></textarea>
</div></>) :null}
    
    {code =="2562" ? (<><hr/>
    <div className="d-flex flex-row">
    <div class="btn" onClick={onClickApprove}  data-bs-target="#v-pills-messages">{approvestatus == "rejected" ?(
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="#4bc0c0" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="#4bc0c0" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
</svg>) }</div>
    <div class="btn"  onClick={onClickreject}  data-bs-target="#v-pills-messages">{approvestatus == "approved" ?(
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ff6384" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>):(<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ff6384" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
</svg>)}
    </div>
    </div></>) : null}
  </div>
</div></>
  )
}

export default LeaveRequest
