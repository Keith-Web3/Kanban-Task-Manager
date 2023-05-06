import React from 'react'

import useStore from '../store/store'
import Button from '../ui/Button'
import '../../sass/shared/delete.scss'

const Delete: React.FC<{ isBoard: boolean }> = function ({ isBoard }) {
  const [
    modalType,
    setModalType,
    currentBoard,
    theme,
    deleteBoard,
    deleteTask,
  ] = useStore(state => [
    state.modalType,
    state.setModalType,
    state.currentBoard,
    state.theme(),
    state.deleteBoard,
    state.deleteTask,
  ])

  return (
    <div className="delete" data-theme={theme}>
      <p className="delete__header">
        Delete this {isBoard ? 'board' : 'task'}?
      </p>
      <p className="delete__message">
        {isBoard
          ? `Are you sure you want to delete the ‘${
              currentBoard().name
            }’ board? This action will remove all columns and tasks and cannot be reversed.`
          : `Are you sure you want to delete the ‘${modalType.modalInfo?.name}’ task and its subtasks? This action cannot be reversed.`}
      </p>
      <div className="delete__btn-container">
        <Button
          className="del"
          onClick={() =>
            isBoard
              ? deleteBoard(currentBoard().id)
              : deleteTask(currentBoard().id, modalType.modalInfo!.id)
          }
        >
          Delete
        </Button>
        <Button
          className=" del del--cancel"
          onClick={() => setModalType({ modalType: '', showModal: false })}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default Delete
