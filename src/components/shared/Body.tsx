import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nanoid } from 'nanoid'

import plus from '../../assets/icon-add-task-mobile.svg'
import Button from '../ui/Button'
import '../../sass/shared/body.scss'
import useStore from '../store/store'
import eye from '../../assets/icon-show-sidebar.svg'
import Board from './Board'
import ViewTask from './ViewTask'
import AddTask from './AddTask'

const Body: React.FC<{
  setIsSideBarHidden: React.Dispatch<React.SetStateAction<boolean>>
}> = function ({ setIsSideBarHidden }) {
  const currentBoard = useStore(state => state.currentBoard)
  const [taskInfo, setTaskInfo] = useState<{
    task: {
      name: string
      description?: string
      subtasks?: { task: string; completed: boolean }[]
    }
    showTask: boolean
  }>({ task: { name: '' }, showTask: false })
  return (
    <motion.main
      layout
      // transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="body"
    >
      {currentBoard.status.length && (
        <div className="body__boards">
          {currentBoard.status.map(el => (
            <Board setTaskInfo={setTaskInfo} key={nanoid()} {...el} />
          ))}
          <div className="body__add-board">
            <p>+ new column</p>
          </div>
        </div>
      )}
      <div className="empty">
        <p className="empty__message">
          This board is empty. Create a new column to get started.
        </p>
        <Button className="btn--one">
          <img src={plus} alt="add" />
          Add New Column
        </Button>
      </div>
      <div className="hide-sidebar" onClick={() => setIsSideBarHidden(false)}>
        <img src={eye} alt="eye" />
      </div>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {taskInfo.showTask && (
            <>
              {/* <ViewTask key={nanoid()} {...currentBoard.status[0].tasks[0]} /> */}
              <AddTask />
              <motion.div
                key={nanoid()}
                className="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() =>
                  setTaskInfo(prev => ({ ...prev, showTask: false }))
                }
              ></motion.div>
            </>
          )}
        </AnimatePresence>,
        document.getElementById('modal-root')!
      )}
    </motion.main>
  )
}

export default Body
