import React, { useId, useReducer, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { nanoid } from 'nanoid'

import cancelImg from '../../assets/icon-cross.svg'
import '../../sass/shared/modify-task.scss'
import useStore from '../store/store'
import chevron from '../../assets/icon-chevron-down.svg'

type Task = {
  title: string
  description: string
  subtasks: [string, string, boolean][]
  column: number
}

interface ModifyTaskProps {
  title: string
  button: string
  editTask?: boolean
}

const modifyTaskReducer: (
  state: Task,
  action:
    | {
        payload: string
        type: 'TITLE' | 'DESCRIPTION' | 'ADD-SUBTASK' | 'REMOVE-SUBTASK'
      }
    | { payload: [string, number]; type: 'EDIT-SUBTASK' }
    | { payload: number; type: 'COLUMN' }
) => Task = function (state, action) {
  switch (action.type) {
    case 'TITLE': {
      return {
        ...state,
        title: action.payload,
      }
    }
    case 'DESCRIPTION': {
      return {
        ...state,
        description: action.payload,
      }
    }
    case 'COLUMN': {
      return {
        ...state,
        column: action.payload,
      }
    }
    case 'ADD-SUBTASK': {
      return {
        ...state,
        subtasks: [...state.subtasks, ['', nanoid(), false]],
      }
    }
    case 'REMOVE-SUBTASK': {
      const newSubtasks = [...state.subtasks]
      newSubtasks.splice(+action.payload, 1)
      return {
        ...state,
        subtasks: newSubtasks,
      }
    }
    case 'EDIT-SUBTASK': {
      const newSubtasks = [...state.subtasks]
      newSubtasks[action.payload[1]][0] = action.payload[0]
      return {
        ...state,
        subtasks: newSubtasks,
      }
    }
  }
}
const ModifyTask = function ({
  title,
  button,
  editTask = false,
}: ModifyTaskProps) {
  const id = useId()
  const [isStatusOpen, setIsStatusOpen] = useState(false)

  const modalType = useStore(state => state.modalType)
  const currentBoard = useStore(state => state.currentBoard())
  const createTask = useStore(state => state.createTask)
  const editTaskHandler = useStore(state => state.editTask)
  const theme = useStore(state => state.theme())

  const [taskInfo, dispatchTaskInfo] = useReducer(modifyTaskReducer, {
    title: editTask ? modalType.modalInfo!.name : '',
    description: editTask ? modalType.modalInfo!.description : '',
    subtasks: editTask
      ? modalType.modalInfo!.subtasks.map(
          el => [el.task, nanoid(), el.completed] as [string, string, boolean]
        )
      : [
          ['', nanoid(), false],
          ['', nanoid(), false],
        ],
    column: editTask
      ? modalType.modalInfo!.statusId!
      : currentBoard.status[0].id,
  })

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
    <div className="add-task" data-theme={theme}>
      <p className="add-task__header">{title}</p>
      <label htmlFor="task-title">
        Title
        <input
          type="text"
          id="task-title"
          placeholder="e.g. Take coffee break"
          value={taskInfo.title}
          onChange={e =>
            dispatchTaskInfo({ payload: e.target.value, type: 'TITLE' })
          }
        />
      </label>
      <label htmlFor="task-description">
        Description
        <textarea
          id="task-description"
          placeholder="e.g. It’s always good to take a break. This 5 minute break will recharge the batteries a little."
          value={taskInfo.description}
          onChange={e =>
            dispatchTaskInfo({ payload: e.target.value, type: 'DESCRIPTION' })
          }
        />
      </label>
      <div className="subtasks" data-theme={theme}>
        <p className="subtasks__header">Subtasks</p>
        <AnimatePresence>
          {taskInfo.subtasks.map((el, idx) => (
            <motion.label
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              key={el[1]}
              layout
              htmlFor={`subtask${id}${idx}`}
              className="subtasks__input"
            >
              <input
                type="text"
                id={`subtask${id}${idx}`}
                placeholder="e.g. Make coffee"
                value={el[0]}
                onChange={e =>
                  dispatchTaskInfo({
                    payload: [e.target.value, idx],
                    type: 'EDIT-SUBTASK',
                  })
                }
              />
              <img
                onClick={() =>
                  dispatchTaskInfo({
                    payload: `${idx}`,
                    type: 'REMOVE-SUBTASK',
                  })
                }
                src={cancelImg}
                alt="cancel"
              />
            </motion.label>
          ))}
        </AnimatePresence>
        <button
          className="add__subtask"
          onClick={() => dispatchTaskInfo({ payload: '', type: 'ADD-SUBTASK' })}
        >
          + add new subtask
        </button>
      </div>
      <div className="add-task__dropdown">
        <p className="status__header">Status</p>
        <div
          className="status-dropdown"
          onClick={() => setIsStatusOpen(prev => !prev)}
        >
          <p>
            {
              currentBoard.status.find(stat => stat.id === taskInfo.column)
                ?.name
            }
          </p>
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
                <motion.p
                  onClick={() => {
                    dispatchTaskInfo({ payload: el.id, type: 'COLUMN' })
                    setIsStatusOpen(false)
                  }}
                  key={nanoid()}
                  variants={itemVariants}
                >
                  {el.name}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          disabled={
            taskInfo.title.trim() === '' ||
            taskInfo.subtasks.some(el => el[0].trim() === '')
          }
          onClick={() =>
            editTask
              ? editTaskHandler(
                  taskInfo.title,
                  taskInfo.description,
                  taskInfo.subtasks,
                  taskInfo.column,
                  currentBoard.id,
                  modalType.modalInfo!.id
                )
              : createTask(
                  taskInfo.title,
                  taskInfo.description,
                  taskInfo.subtasks,
                  taskInfo.column,
                  currentBoard.id
                )
          }
        >
          {button}
        </button>
      </div>
    </div>
  )
}

export default ModifyTask
