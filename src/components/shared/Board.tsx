import React from 'react'

import '../../sass/shared/board.scss'
import useStore from '../store/store'

const Board: React.FC<{
  name: string
  colorTag: string
  tasks: {
    name: string
    id: string
    description: string
    subtasks: { task: string; completed: boolean }[]
  }[]
}> = function ({ name, tasks, colorTag }) {
  const setModalType = useStore(state => state.setModalType)
  return (
    <div className="board">
      <div className="board__header">
        <div
          style={{
            backgroundColor: colorTag,
          }}
        ></div>
        <p>
          {name} ({tasks.length})
        </p>
      </div>
      {tasks && (
        <div className="board__tasks">
          {tasks.map(task => (
            <div
              key={task.id}
              className="board__task"
              onClick={() =>
                setModalType({
                  modalType: 'task-info',
                  showModal: true,
                  modalInfo: { ...task, status: name },
                })
              }
            >
              <p>{task.name}</p>
              <p>
                {task.subtasks.filter(el => el.completed).length} of{' '}
                {task.subtasks.length} subtasks
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Board
