import React from 'react'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { nanoid } from 'nanoid'

import plus from '../../assets/icon-add-task-mobile.svg'
import Button from '../ui/Button'
import '../../sass/shared/body.scss'
import useStore from '../store/store'
import eye from '../../assets/icon-show-sidebar.svg'
import Board from './Board'
import Modal from './Modal'

const Body: React.FC<{
  setIsSideBarHidden: React.Dispatch<React.SetStateAction<boolean>>
}> = function ({ setIsSideBarHidden }) {
  const currentBoard = useStore(state => state.currentBoard())
  const modalType = useStore(state => state.modalType)
  return (
    <motion.main
      layout // transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="body"
    >
      {!currentBoard.status.every(el => !el.tasks.length) && (
        <motion.div layout className="body__boards">
          {currentBoard.status
            .filter(el => el.tasks.length)
            .map(el => (
              <Board key={nanoid()} {...el} />
            ))}
          <motion.div layout className="body__add-board">
            <motion.p layout>+ new column</motion.p>
          </motion.div>
        </motion.div>
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
        modalType.showModal ? <Modal /> : <></>,
        document.getElementById('modal-root')!
      )}
    </motion.main>
  )
}

export default Body
