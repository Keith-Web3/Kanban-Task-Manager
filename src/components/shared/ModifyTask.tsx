import React, { useId, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nanoid } from 'nanoid'

import cancelImg from '../../assets/icon-cross.svg'
import '../../sass/shared/modify-task.scss'
import useStore from '../store/store'
import chevron from '../../assets/icon-chevron-down.svg'

const ModifyTask: React.FC<{ title: string; button: string }> = function ({
  title,
  button,
}) {
  const id = useId()
  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const currentBoard = useStore(state => state.currentBoard)

  const statusVariants = {
    initial: { scale: 0 },
    animate: {
      scale: isStatusOpen ? 1 : 0,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.05,
        duration: 0.3,
      },
    },
    exit: { scale: 0, transition: { duration: 0.3 } },
  }
  const itemVariants = {
    initial: { y: '-20px', opacity: 0 },
    animate: { y: '0px', opacity: 1 },
    exit: { y: '-20px', opacity: 0 },
  }

  return (
    <div className="add-task">
      <p className="add-task__header">{title}</p>
      <label htmlFor="task-title">
        Title
        <input
          type="text"
          id="task-title"
          placeholder="e.g. Take coffee break"
        />
      </label>
      <label htmlFor="task-description">
        Description
        <textarea
          id="task-description"
          placeholder="e.g. It’s always good to take a break. This 5 minute break will recharge the batteries a little."
        />
      </label>
      <div className="subtasks">
        <p className="subtasks__header">Subtasks</p>
        <label htmlFor={`subtask${id}`} className="subtasks__input">
          <input
            type="text"
            id={`subtask${id}`}
            placeholder="e.g. Make coffee"
          />
          <img src={cancelImg} alt="cancel" />
        </label>
        <label htmlFor={`subtask${id}1`} className="subtasks__input">
          <input
            type="text"
            id={`subtask${id}1`}
            placeholder="e.g. Drink coffee & smile"
          />
          <img src={cancelImg} alt="cancel" />
        </label>
        <button className="add__subtask">+ add new subtask</button>
      </div>
      <div className="add-task__dropdown">
        <p className="status__header">Status</p>
        <div
          className="status-dropdown"
          onClick={() => setIsStatusOpen(prev => !prev)}
        >
          <p>Doing</p>
          <motion.img
            initial={{ rotate: '180deg' }}
            animate={{ rotate: isStatusOpen ? '0deg' : '180deg' }}
            src={chevron}
            alt="open"
          />
        </div>
        <AnimatePresence>
          {isStatusOpen && (
            <motion.div
              layout
              variants={statusVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="status-menu"
            >
              {currentBoard.status.map(el => (
                <motion.p key={nanoid()} variants={itemVariants}>
                  {el.name}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button>{button}</button>
      </div>
    </div>
  )
}

export default ModifyTask
