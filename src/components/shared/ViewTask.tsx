import React, { useId } from 'react'

import ellipsis from '../../assets/icon-vertical-ellipsis.svg'
import '../../sass/shared/viewtask.scss'
import { nanoid } from 'nanoid'

const SubTask: React.FC<{ task: string; completed: boolean }> = function ({
  task,
  completed,
}) {
  const id = useId()
  return (
    <label className="subtask" htmlFor={id}>
      <input defaultChecked={completed} type="checkbox" id={id} />
      {task}
    </label>
  )
}
const ViewTask: React.FC<{
  name: string
  description?: string
  subtasks: { task: string; completed: boolean }[]
}> = function ({ name, description, subtasks }) {
  return (
    <div className="view-task">
      <div className="view-task__header">
        <p className="view-task__title">{name}</p>
        <img src={ellipsis} alt="ellipsis" />
      </div>
      <p className="view-task__description">{description}</p>
      <p className="view-task__subtasks">Subtasks (2 of 3)</p>
      {subtasks.map(el => (
        <SubTask key={nanoid()} {...el} />
      ))}
      <p className="view-task__current">current status</p>
    </div>
  )
}

export default ViewTask
