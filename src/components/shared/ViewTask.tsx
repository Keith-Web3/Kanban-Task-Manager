import React, { useId, useState } from 'react'
import { nanoid } from 'nanoid'
import { AnimatePresence, motion } from 'framer-motion'

import ellipsis from '../../assets/icon-vertical-ellipsis.svg'
import '../../sass/shared/viewtask.scss'
import chevron from '../../assets/icon-chevron-down.svg'
import useStore from '../store/store'

const SubTask: React.FC<{ task: string; completed: boolean }> = function ({
  task,
  completed,
}) {
  const id = useId()
  const [isChecked, setIsChecked] = useState(completed)
  const theme = useStore(state => state.theme())
  const tickVariants = {
    // pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  }
  const boxVariants = {
    checked: { backgroundColor: '#635fc7' },
    unchecked: { backgroundColor: theme === 'light' ? '#ffffff' : '#2b2c37' },
  }
  return (
    <label className="subtask" htmlFor={id}>
      <input
        checked={isChecked}
        onChange={e => {
          setIsChecked(e.target.checked)
        }}
        type="checkbox"
        id={id}
      />
      <motion.div
        variants={boxVariants}
        initial={false}
        animate={isChecked ? 'checked' : 'unchecked'}
        className="custom-checkbox"
      >
        {isChecked && (
          <motion.svg
            transition={{ when: 'beforeChildren' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <motion.path
              variants={tickVariants}
              initial={'unchecked'}
              animate={'checked'}
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
              pathLength="100"
              fill="#ffffff"
            />
          </motion.svg>
        )}
      </motion.div>
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

  const currentBoard = useStore(state => state.currentBoard())
  const setModalType = useStore(state => state.setModalType)
  const modalType = useStore(state => state.modalType)
  const theme = useStore(state => state.theme())

  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-theme={theme}
        layout
        className="view-task"
      >
        <div className="view-task__header">
          <p className="view-task__title">{name}</p>
          <img
            onClick={() => setIsDropDownOpen(prev => !prev)}
            src={ellipsis}
            alt="ellipsis"
          />
          <AnimatePresence>
            {isDropDownOpen && (
              <motion.div
                initial={{ y: '-10px', opacity: 0 }}
                animate={{ y: '0px', opacity: 1 }}
                exit={{ y: '-10px', opacity: 0 }}
                className="view-task__dropdown"
              >
                <p
                  onClick={() =>
                    setModalType({
                      modalType: 'edit-task',
                      showModal: true,
                      modalInfo: {
                        name,
                        description: description || '',
                        subtasks,
                        statusId: modalType.modalInfo?.statusId,
                        id: modalType.modalInfo!.id,
                        status: modalType.modalInfo?.status,
                      },
                    })
                  }
                >
                  edit task
                </p>
                <p>delete task</p>
              </motion.div>
            )}
          </AnimatePresence>
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
          <div
            className="status-dropdown"
            onClick={() => setIsStatusOpen(prev => !prev)}
          >
            <p>{modalType.modalInfo?.status}</p>
            <motion.img
              initial={{ rotate: '180deg' }}
              animate={{ rotate: isStatusOpen ? '0deg' : '180deg' }}
              src={chevron}
              alt="open"
            />
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {isStatusOpen && (
          <motion.div
            layout
            variants={statusVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="status-menu"
            data-theme={theme}
          >
            {currentBoard.status.map(el => (
              <motion.p key={nanoid()} variants={itemVariants}>
                {el.name}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ViewTask
