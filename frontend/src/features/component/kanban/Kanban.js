import React from 'react'
import Task from '../task-card/Task'

const Kanban = ({task_not_started_length, complete_length, task_progress_length, task_not_started, task_progress, task_issue_length, task_issue_list }) => {
  return (
    <div>        <h2 className='task-overview-title'>Kanban Board</h2><hr/>
    {task_not_started_length > 0 || complete_length > 0 || task_progress_length > 0 ?
(        <div className='tasks-overview'>
        <div className='tasks-wrapper justify-content-around'>
          <div className='todo-list'>
            <h4 className='todo-list-title todo'>Not Started Yet</h4>{task_not_started_length > 0 ?
            (<div className='todo-wrapper'>
            {task_not_started.map((task, i) => (
              
          <Task key={i} task_id={task._id}  title={task.title} description={task.description} spent={task.spent} start_date={task.start_date} status={task.status} assigned={task.assigned} priority={task.priority} due_date={task.due_date} />
        ))}

              
            </div>):(<p className='quotes'>Nothing to preview</p>)}
          </div> 
              
          <div className='todo-list'>
            <h4 className='todo-list-title todo'>In Progress</h4>{task_progress_length > 0 ?
            (   
            <div className='todo-wrapper'>
            {task_progress.map((task, i) => (
              
          <Task key={i} task_id={task._id}  title={task.title} description={task.description} spent={task.spent} start_date={task.start_date} status={task.status} assigned={task.assigned} priority={task.priority} due_date={task.due_date} />
        ))}

              
            </div>):(<p className='quotes'>Nothing to preview</p>)   }
          </div>   
          <div className='todo-list'>
            <h4 className='todo-list-title todo'>Issue</h4>
            {task_issue_length > 0 ?   
         (
            <div className='todo-wrapper'>
            {task_issue_list.map((task, i) => (
                  <Task key={i} task_id={task._id}  title={task.title} description={task.description} spent={task.spent} start_date={task.start_date} status={task.status} assigned={task.assigned} priority={task.priority} due_date={task.due_date} />
            ))}

              
            </div>):(<p className='quotes'>Nothing to preview</p>)}
          </div>
          </div>
          </div>):(<p className='quotes'>Nothing to preview</p>) }</div>
  )
}

export default Kanban