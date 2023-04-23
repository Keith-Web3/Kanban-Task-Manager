import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nanoid } from 'nanoid'

import ModifyTask from './ModifyTask'
import ViewTask from './ViewTask'
import useStore from '../store/store'
import ModifyBoards from './ModifyBoards'

const Modal: React.FC = function () {
  const currentBoard = useStore(state => state.currentBoard)
  const [modalType, setModalType] = useStore(state => [
    state.modalType,
    state.setModalType,
  ])
  return (
    <AnimatePresence>
      {modalType.modalType === 'task-info' && (
        <ViewTask {...modalType.modalInfo!} />
      )}
      {modalType.modalType === 'add-task' && (
        <ModifyTask title="add new task" button="create task" />
      )}
      {modalType.modalType === 'edit-task' && (
        <ModifyTask title="edit task" button="save changes" />
      )}
      {modalType.modalType === 'create-board' && (
        <ModifyBoards title="add new board" button="create new board" />
      )}
      {modalType.modalType === 'edit-board' && (
        <ModifyBoards title="edit board" button="save changes" />
      )}
      {modalType.showModal && (
        <motion.div
          key={nanoid()}
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setModalType({ showModal: false, modalType: '' })
          }}
        ></motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
