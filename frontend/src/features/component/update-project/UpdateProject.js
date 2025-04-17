import React, { useState, useEffect, useRef, useContext } from 'react';
import projectContext from '../../../context/project/projectContext';
import '../task-model/_taskmodel.scss';

const UpdateProject = ({ id, title, description, budget, spent, start_date, due_date, priority, client, tasklist,members, img })=> {
  const context = useContext(projectContext);
  const { updateProject } = context;

  const [project, setProject] = useState({
    title: title || '',
    description: description || '',
    budget: budget || '',
    spent: spent || '',
    start_date: start_date || '',
    due_date: due_date || '',
    priority: priority || '',
    client: client || '',
    tasklist: tasklist || '',
    members: members || '',
    img: img || '',
  });

  const refClose = useRef(null);

  const onChange = (e) => {
    setProject((prevProject) => ({
      ...prevProject,
      [e.target.name]: e.target.value,
    }));
  };

  const onClickProjectUpdate = (e) => {
    e.preventDefault();
    updateProject(
      id,
      project.title,
      project.description,
      project.budget,
      project.spent,
      project.start_date,
      project.due_date,
      project.priority,
      project.client,
      project.tasklist,
      project.members,
      project.img
    );
    console.log(project);
    refClose.current.click(); 
  };
  return (
    <div class="update-project-modal modal fade" tabindex="-1" id="updateproject" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h5 class="modal-title">Update Project</h5>
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

                value={project.title || ''}
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

                value={project.description || ''}
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
                onChange={onChange}
                value={project.spent || ''}
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
                value={project.due_date || ''}
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
                value={project.priority || ''}
              />
            </div>
          </form>
        </div>
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"  ref={refClose}>Close</button>
          <button type="button" class="btn btn-primary"  onClick={onClickProjectUpdate} >Save changes</button>
        </div>
      </div>
    </div>
  </div>
  )
}
export default UpdateProject;