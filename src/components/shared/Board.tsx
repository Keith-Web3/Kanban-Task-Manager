import React from 'react'
import { nanoid } from 'nanoid'

import '../../sass/shared/board.scss'
import useStore, { Modal } from '../store/store'

const Board: React.FC<{
  name: string
  tasks: {
    name: string
    subtasks: { task: string; completed: boolean }[]
  }[]
}> = function ({ name, tasks }) {
  const setModalType = useStore(state => state.setModalType)
  return (
    <div className="board">
      <div className="board__header">
        <div
          style={{
            backgroundColor:
              '#' +
              (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          }}
        ></div>
        <p>
          {name} ({tasks.length})
        </p>
      </div>
      <div className="board__tasks">
        {tasks.map(task => (
          <div
            key={nanoid()}
            className="board__task"
            onClick={() =>
              setModalType({
                modalType: 'task-info',
                showModal: true,
                modalInfo: task,
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
    </div>
  )
}

export default Board
