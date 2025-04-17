import React, {useState, useEffect, useRef, useContext} from 'react'
import ProjectOverview from '../../../features/component/project-overview-card/ProjectOverview';
import projectContext from "../../../context/project/projectContext"
import Select from 'react-select'
import "./_projects.scss";
import Navigator from '../../../features/component/navigator/Navigator';

const Projects = () => {
  const context = useContext(projectContext);
  const { getAllEmployeeDetails, tasks, createTask, getTasks, employees } = context;

  const [task, setTask] = useState({
    title: '',
    description: '',
    spent: '',
    status: '',
    priority: '',
    assigned: '',
    start_date: '',
    due_date: ''
  });

  const refClose = useRef(null);
  const [selectedValue, setSelectedValue] = useState([]);
  
  useEffect(() => {
    getTasks();
    getAllEmployeeDetails();
  }, []);

  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onClickCreateTask = () => {

    createTask(
      task.title,
      task.description,
      task.spent,
      task.status,
      task.priority,
      { assigned: selectedValue },
      task.start_date,
      task.due_date
    );
    window.location.reload()
  };

  const employeeOptions = employees.map((employee, index) => ({
    value: employee.name,
    label: employee.name
  }));

  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const dashboardWidth = viewportWidth < 1000 ? '100%' : '80%';
  const dashboardMargin = viewportWidth < 1000 ? '0%' : '10%';
  
  let dashboardStyle ={
   width: dashboardWidth,
   marginLeft: dashboardMargin
  }

  
return(
    <div className='projects' style={dashboardStyle}>

    <div class="task-modal modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title">Assign Task</h5>
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
            <Select
                className="dropdown text-dark"
                value={employeeOptions.filter((obj) => selectedValue.includes(obj.value))}
                options={employeeOptions}
                onChange={handleChange}
                isMulti
                isClearable
                placeholder="Select Employee"
              />

          </div>
        </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" onClick={onClickCreateTask}>Create Task</button>
        </div>
      </div>
    </div>
  </div>
   {/* main-part */}
      <h1>Tasks </h1><hr/><br/>
     <div class="all-project-lists row row-cols-2 row-cols-md-3">
     <div class=" project-card-overview">
        <div class="project-overview">
        <div alt="heelo" type="button" class="create-project-button" data-bs-toggle="modal" data-bs-target="#exampleModal"></div>
        </div>
      </div>
     {tasks && tasks.map((task)=>{

          return(
          <ProjectOverview
          key={task._id}
                _id={task._id}
                title={task.title}
                description={task.description}
                spent={task.spent}
                assigned={task.assigned}
                status={task.status}
                priority={task.priority}
                due_date={task.due_date}
                start_date={task.start_date}
                />)
        })}       

      </div>
      <Navigator/>
    </div>
  )
}

export default Projects