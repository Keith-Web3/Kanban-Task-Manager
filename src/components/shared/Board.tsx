import React from 'react'

import '../../sass/shared/board.scss'
import useStore from '../store/store'
import { motion } from 'framer-motion'

const Board: React.FC<{
  name: string
  colorTag: string
  id: number
  tasks: {
    name: string
    id: number
    description: string
    subtasks: { task: string; completed: boolean }[]
  }[]
}> = function ({ name, tasks, id, colorTag }) {
  const setModalType = useStore(state => state.setModalType)
  return (
    <div className="board">
      <motion.div layout className="board__header">
        <motion.div
          layout
          style={{
            backgroundColor: colorTag,
          }}
        ></motion.div>
        <motion.p layout>
          {name} ({tasks.length})
        </motion.p>
      </motion.div>
      {tasks && (
        <div className="board__tasks">
          {tasks.map(task => (
            <motion.div
              layout
              key={task.id}
              className="board__task"
              onClick={() =>
                setModalType({
                  modalType: 'task-info',
                  showModal: true,
                  modalInfo: { ...task, statusId: id, status: name },
                })
              }
            >
              <p>{task.name}</p>
              <p>
                {task.subtasks.filter(el => el.completed).length} of{' '}
                {task.subtasks.length} subtasks
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Board
