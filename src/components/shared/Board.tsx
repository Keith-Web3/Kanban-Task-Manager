import React from 'react'
import { nanoid } from 'nanoid'

import '../../sass/shared/board.scss'

const Board: React.FC<{
  name: string
  tasks: {
    name: string
    subtasks: { task: string; completed: boolean }[]
  }[]
  setTaskInfo: React.Dispatch<
    React.SetStateAction<{
      task: {
        name: string
        description?: string
        subtasks?: {
          task: string
          completed: boolean
        }[]
      }
      showTask: boolean
    }>
  >
}> = function ({ name, tasks, setTaskInfo }) {
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
            onClick={() => setTaskInfo({ task, showTask: true })}
          >
            <p>{task.name}</p>
            <p>0 of 1 subtasks</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
