import React, { useId } from 'react'
import { nanoid } from 'nanoid'

import ellipsis from '../../assets/icon-vertical-ellipsis.svg'
import '../../sass/shared/viewtask.scss'
import chevron from '../../assets/icon-chevron-down.svg'
import check from '../../assets/check-solid.svg'

const SubTask: React.FC<{ task: string; completed: boolean }> = function ({
  task,
  completed,
}) {
  const id = useId()
  return (
    <label className="subtask" htmlFor={id}>
      <input defaultChecked={completed} type="checkbox" id={id} />
      <div className="custom-checkbox">
        <img src={check} alt="check" />
      </div>
      {task}
    </label>
  )
}
const ViewTask: React.FC<{
  name: string
  description?: string
  subtasks: { task: string; completed: boolean }[]
}> = function ({ name, description, subtasks }) {
  const completed = subtasks.filter(el => el.completed).length
  return (
    <div className="view-task">
      <div className="view-task__header">
        <p className="view-task__title">{name}</p>
        <img src={ellipsis} alt="ellipsis" />
      </div>
      <p className="view-task__description">{description}</p>
      <p className="view-task__subtasks">
        Subtasks ({completed} of {subtasks.length})
      </p>
      {subtasks.map(el => (
        <SubTask key={nanoid()} {...el} />
      ))}
      <p className="view-task__current">current status</p>
      <div className="view-task__status">
        <div className="status-dropdown">
          <p>Doing</p>
          <img src={chevron} alt="open" />
        </div>
      </div>
    </div>
  )
}

export default ViewTask
