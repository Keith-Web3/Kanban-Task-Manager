import React, { useId, useState } from 'react'
import { nanoid } from 'nanoid'
import { motion, AnimatePresence } from 'framer-motion'

import cancelImg from '../../assets/icon-cross.svg'
import '../../sass/shared/modify-boards.scss'
import useStore from '../store/store'

const ModifyBoards: React.FC<{
  title: string
  button: string
  editBoard?: boolean
}> = function ({ title, button, editBoard = false }) {
  const id = useId()
  const modalType = useStore(state => state.modalType)
  const currentBoard = useStore(state => state.currentBoard)
  const [boardName, setBoardName] = useState(
    editBoard ? currentBoard().name : ''
  )
  const [boardColumns, setBoardColumns] = useState<[string, number][]>(
    editBoard
      ? currentBoard().status.map(el => [el.name, el.id])
      : [
          ['', Date.now() + 1],
          ['', Date.now() + 1],
        ]
  )
  const [createBoard, editBoardHandler] = useStore(state => [
    state.createBoard,
    state.editBoard,
  ])
  return (
    <div className="modify-boards">
      <p className="modify-boards__title">{title}</p>
      <label htmlFor={`${id}1`} className="subtask__input">
        board name
        <input
          value={boardName}
          onChange={e => setBoardName(e.target!.value)}
          type="text"
          placeholder="e.g. Web Design"
          id={`${id}1`}
        />
      </label>
      <div className="columns">
        <p className="columns__header">board columns</p>
        <AnimatePresence>
          {boardColumns.map((el, idx) => (
            <motion.label
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              layout
              key={el[1]}
              htmlFor={`subtask${id}${idx}`}
              className="columns__input"
            >
              <input
                type="text"
                id={`subtask${id}${idx}`}
                placeholder="e.g. Drink coffee & smile"
                value={el[0]}
                onChange={e => {
                  setBoardColumns(prev => {
                    const newBoards = [...prev]
                    prev[idx][0] = e.target.value
                    return newBoards
                  })
                }}
              />
              <img
                onClick={() =>
                  setBoardColumns(prev => {
                    const newBoards = [...prev]
                    newBoards.splice(idx, 1)
                    return newBoards
                  })
                }
                src={cancelImg}
                alt="cancel"
              />
            </motion.label>
          ))}
        </AnimatePresence>
      </div>
      <button
        onClick={() => setBoardColumns(prev => [...prev, ['', Date.now()]])}
      >
        + add new column
      </button>
      <button
        disabled={
          boardName.trim() === '' ||
          boardColumns.some(columns => columns[0].trim() === '')
        }
        onClick={() =>
          editBoard
            ? editBoardHandler(
                boardName,
                currentBoard().id,
                boardColumns.map(([columnName, columnId]) => ({
                  columnName,
                  columnId,
                }))
              )
            : createBoard(
                boardName,
                boardColumns.map(el => el[0])
              )
        }
      >
        {button}
      </button>
    </div>
  )
}

export default ModifyBoards
