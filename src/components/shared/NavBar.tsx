import React from 'react'
import { nanoid } from 'nanoid'
import { motion } from 'framer-motion'

import useStore from '../store/store'
import logo from '../../assets/logo-mobile.svg'
import boardIcon from '../../assets/icon-board.svg'
import boardIconP from '../../assets/icon-board-purple.svg'
import plusP from '../../assets/icon-add-purple.svg'
import '../../sass/shared/navbar.scss'

const NavBar: React.FC = function () {
  const boards = useStore(state => state.boards)
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="navbar"
    >
      <div className="navbar__container">
        <div className="navbar__header">
          <img src={logo} alt="logo" />
          <p>Kanban</p>
        </div>
        <p className="navbar__title">All boards({boards.length})</p>
        <div className="navbar__boards">
          {boards.map((board, idx) => (
            <div
              key={nanoid()}
              className={`navbar__board ${idx === 0 && 'active'}`}
            >
              <img src={boardIcon} alt="board" />
              <p>{board.name}</p>
            </div>
          ))}
          <div className="navbar__add-board navbar__board">
            <img src={boardIconP} alt="board" />
            <img src={plusP} alt="add board" />
            <p>create new board</p>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default NavBar
