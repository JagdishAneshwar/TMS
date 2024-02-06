import React, {useState, useEffect, useRef, useContext} from 'react'
import projectContext from "../../../context/project/projectContext"
import Select from 'react-select'
import "./_tasks.scss";

const UpdateTask = ({ taskInfo }) => {
  const [selectedValue, setSelectedValue] = useState([]);
    const context = useContext(projectContext);
  const [task, setTask] = useState({
    task_id: taskInfo._id,
    title: taskInfo.title,
    description: taskInfo.description,
    spent: taskInfo.spent,
    start_date: taskInfo.start_date,
    status: taskInfo.status,
    assigned: selectedValue,
    priority: taskInfo.priority,
    due_date: taskInfo.due_date,
  });


  const members = taskInfo.assigned
  const { updateTask, employees } = context;
  const refClose = useRef(null);
  
  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleChange = (selectedOptions) => {
    setSelectedValue(...[selectedOptions]);
  };

  const employeeOptions = employees
    ? employees.map((employee) => ({
          value: employee.name,
          label: employee.name,
        }))
    : [];

  useEffect(() => {
    setTask({
      task_id: taskInfo._id,
      title: taskInfo.title,
      description: taskInfo.description,
      spent: taskInfo.spent,
      start_date: taskInfo.start_date,
      status: taskInfo.status,
      assigned: taskInfo.members,
      priority: taskInfo.priority,
      due_date: taskInfo.due_date,
    });

    if(taskInfo.assigned[0][0].assigned){
    var initialSelectedOptions = taskInfo.assigned[0][0].assigned.map((assigned, index) => ({
      value: index,
      label: assigned,
    }));}else{
      var initialSelectedOptions = ""
    }

    // const selectedOptionsWithNames = initialSelectedOptions.map((option) => ({
    //   ...option,
    //   label: employees.find((employee) => employee._id.toString() === option.label.toString())?.name || option.label,
    // }));
  
    setSelectedValue(initialSelectedOptions);
  }, [taskInfo, employees, members]);

  const onClickUpdateTask = () => {
    updateTask(
      task.task_id,
      task.title,
      task.description,
      task.spent,
      task.start_date,
      task.status,
      task.priority,
      task.due_date
    );
    console.log("hello")
  };

  return (
    <div className="task-modal modal fade" tabIndex="-1" id="updateproject" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">Update task</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="add-task">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="title"
                  value={task.title}
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
                  value={task.description}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Cost Spent
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="spent"
                  value={task.spent}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  value={task.due_date}
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
                  value={task.priority}
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
                  value={selectedValue}
                  options={employeeOptions}
                  onChange={handleChange}
                  isMulti
                  isClearable
                  placeholder="Select Employee"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer border-0">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onClickUpdateTask}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



export default UpdateTask