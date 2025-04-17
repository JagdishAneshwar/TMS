import React, {useState, useRef, useEffect, useContext} from 'react'
import "./_taskmodel.scss"
import projectContext from '../../../context/project/projectContext'
import Select from 'react-select'


const TaskModel = ({id}) => {
  const context = useContext(projectContext);

  const { createTask, getTasks, getAllEmployeeDetails } = context;



  const [employees, setEmployees] = useState([]); 
      const data = [
        {
          value: 1,
          label: "Jagdish"
        },
        {
          value: 2, 
          label: 'Venkatesh'
        },
        {value:3, label: 'Shivraj'},
        {value:4, label: 'Nil'}
    ]
    useEffect(() => {
      getAllEmployeeDetails().then((employeeData) => {
        // Assuming employeeData is an array of employee objects from getAllEmployeeDetails
        const employeeOptions = employeeData.map((employee) => ({
          value: employee.id,
          label: employee.name
        }));
        setEmployees(employeeOptions);
      });
  
      getTasks();
    }, [id]);
    const [task, settask] = useState({
      title: "",
      description:"",
      spent: "",
      status: "",
      project_id:id,
      priority:"",
      assigned:"",
      start_date:"",
      due_date:""
  })

    const ref = useRef(null);
    const refClose = useRef(null);
    const [selectedValue, setSelectedValue] = useState([]);
    const handleChange = (e) => {
      setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    }
  
    const onChange = (e) => {
        settask({ ...task, [e.target.name]: e.target.value });
      };
    const onClickCreateTask = (e) => {
      ref.current.click();
      console.log(task)
      createTask(task.title, task.description, task.spent, task.start_date, task.status, {assigned:selectedValue}, task.priority, task.project_id, task.due_date);
    };


  return (
<div class="task-modal" tabindex="-1">
<div class="task-modal modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header border-0">
        <h5 class="modal-title">Add Task</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form className="add-task">
          <div className="mb-3">
            <label htmlfor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Cost Spent
            </label>
            <input
              type="text"
              className="form-control"
              name="spent"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Assigned Date
            </label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
              Status
            </label>
            <input
              type="text"
              className="form-control"
              name="status"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              name="due_date"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Priority
            </label>
            <input
              type="text"
              className="form-control"
              name="priority"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Assign to
            </label>
            <Select className='dropdown text-dark'
            value={employees.filter(obj => selectedValue.includes(obj.value))}
            options={employees}
            onChange={handleChange}  
            isMulti
            isClearable
            placeholder="Select Option"
             />
          </div>
        </form>
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={onClickCreateTask}>Save changes</button>
      </div>
    </div>
  </div>
  </div>
  <button type="button" ref={ref} class="add-task-button btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add task</button>
</div>
  )
}

export default TaskModel