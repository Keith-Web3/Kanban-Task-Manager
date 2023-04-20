import React from 'react'
import { motion } from 'framer-motion'
import { nanoid } from 'nanoid'

import ModifyTask from './ModifyTask'
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
      {modalType.modalType === 'add-task' && (
        <ModifyTask title="add new task" button="create task" key={nanoid()} />
      )}
      {modalType.modalType === 'edit-task' && (
        <ModifyTask title="edit task" button="save changes" key={nanoid()} />
      )}
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
    </>
  ) : (
    <></>
  )
}

export default Modal
