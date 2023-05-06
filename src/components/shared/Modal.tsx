import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nanoid } from 'nanoid'

import ModifyTask from './ModifyTask'
import ViewTask from './ViewTask'
import useStore from '../store/store'
import ModifyBoards from './ModifyBoards'
import Delete from './Delete'

const Modal: React.FC = function () {
  const [modalType, setModalType] = useStore(state => [
    state.modalType,
    state.setModalType,
  ])
  return (
    <>
      {modalType.modalType === 'task-info' && (
        <ViewTask {...modalType.modalInfo!} />
      )}
      {modalType.modalType === 'add-task' && (
        <ModifyTask title="add new task" button="create task" />
      )}
      {modalType.modalType === 'edit-task' && modalType.showModal && (
        <ModifyTask editTask title="edit task" button="save changes" />
      )}
      {modalType.modalType === 'create-board' && (
        <ModifyBoards title="add new board" button="create new board" />
      )}
      {modalType.modalType === 'edit-board' && (
        <ModifyBoards editBoard title="edit board" button="save changes" />
      )}
      {modalType.modalType === 'delete-task' && <Delete isBoard={false} />}
      {modalType.modalType === 'delete-board' && <Delete isBoard />}
      {modalType.modalType === 'new-column' && (
        <ModifyBoards
          editBoard
          newColumn
          title="edit board"
          button="save changes"
        />
      )}
      <motion.div
        key={nanoid()}
        className="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => {
          setModalType({
            showModal: false,
            modalType: '',
          })
        }}
      ></motion.div>
    </>
  )
}

export default Modal
