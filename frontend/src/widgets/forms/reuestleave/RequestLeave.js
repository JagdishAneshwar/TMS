import React, {useEffect, useState, useContext, useRef} from 'react'
import Input from '../../../components/input/Input';
import projectContext from '../../../context/project/projectContext';

const RequestLeave = () => {
    const [leave, setLeave] = useState({
      leavereason:"",
        from:"",
        to:""
    })
    

  

  const refClose = useRef();

  const { leaves, requestLeave }= useContext(projectContext);

  const onClickRequestLeave = async() => {
    await requestLeave(leave.leavereason, leave.from, leave.to);

  }

  const onChange = (e)=>{
    setLeave({...leave, [e.target.name]: e.target.value})
  }
    
    const addEmployeeFields = {
        from:{
            id: "from",
            label: "Start Date",   
            required: true,
            type: "date",
          },
          to:{
            id: "to",
            label: "End Date",   
            required: true,
            type: "date",
          },
          
      };

  return (
    <>
    <h1>Request Leave</h1><hr/><br/>
    <button type="button" class="btn btn-primary btn-lg mark-attendance" data-bs-toggle="modal" data-bs-target="#requestLeave">Request Leave</button>
    <div class="employee-modal modal fade" id="requestLeave" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
    <div class="modal-content employee-dialog">
      <div class="modal-header border-0">
        <h5 class="modal-title">Request Leave</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form className="addEmployee">
        <div className="row">
        <div className='col-md-6 mb-4'>
  <label htmlFor="leavereason" className="form-label">
    Reason
  </label>
  <textarea
    className="form-control"
    id="leavereason"
    aria-describedby="leavereason"
    name="leavereason"
    value={leave.leavereason} 
    onChange={onChange}
    required
  ></textarea>
</div>

        {Object.keys(addEmployeeFields).map((key) => (
            <Input
              wd="col-md-6"
              label={addEmployeeFields[key].label}
              type={addEmployeeFields[key].type}
              id={addEmployeeFields[key].id}
              value={leave[key]}
              onChange={onChange}
              key={addEmployeeFields[key].id}
              require={addEmployeeFields[key].required}
            />
        ))}
        </div>

      </form>
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={onClickRequestLeave}>Save changes</button>
      </div>
    </div>
  </div></div>

</>





  )
}

export default RequestLeave