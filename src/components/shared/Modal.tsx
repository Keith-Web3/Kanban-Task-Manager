import React from 'react'
import { motion } from 'framer-motion'
import { nanoid } from 'nanoid'

import AddTask from './AddTask'
import ViewTask from './ViewTask'
import useStore from '../store/store'

const Modal: React.FC = function () {
  const currentBoard = useStore(state => state.currentBoard)
  const [modalType, setModalType] = useStore(state => [
    state.modalType,
    state.setModalType,
  ])
  return modalType.showModal ? (
    <>
      {modalType.modalType === 'task-info' && (
        <ViewTask key={nanoid()} {...currentBoard.status[0].tasks[0]} />
      )}
      {modalType.modalType === 'add-task' && <AddTask key={nanoid()} />}
      <motion.div
        key={nanoid()}
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          console.log(modalType.showModal)
          setModalType({ showModal: false, modalType: '' })
        }}
      ></motion.div>
    </>
  ) : (
    <></>
  )
}

export default Modal
