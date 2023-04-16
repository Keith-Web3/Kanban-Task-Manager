import React from 'react'
import { nanoid } from 'nanoid'
import { motion } from 'framer-motion'

import useStore from '../store/store'
import logo from '../../assets/logo-mobile.svg'
import boardIcon from '../../assets/icon-board.svg'
import boardIconP from '../../assets/icon-board-purple.svg'
import plusP from '../../assets/icon-add-purple.svg'
import darkTheme from '../../assets/icon-dark-theme.svg'
import lightTheme from '../../assets/icon-light-theme.svg'
import '../../sass/shared/navbar.scss'

const NavBar: React.FC<{ isNavOpened: boolean }> = function ({ isNavOpened }) {
  const boards = useStore(state => state.boards)
  const [theme, toggleTheme] = useStore(state => [
    state.theme,
    state.toggleTheme,
  ])
  console.log(theme === 'light')
  const variants = {
    animate: {
      marginLeft: theme === 'light' ? 0 : 'auto',
    },
  }
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: Number(isNavOpened) }}
      className={`navbar ${isNavOpened ? 'active' : ''}`}
    >
      <div className="navbar__container">
        <div className="navbar__header">
          <img src={logo} alt="logo" />
          <p>kanban</p>
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
        <div className="navbar__theme">
          <img src={lightTheme} alt="light-theme" />
          <div
            data-isOn={theme === 'light'}
            className="navbar__theme-toggler"
            onClick={toggleTheme}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 700, damping: 30 }}
            ></motion.div>
          </div>
          <img src={darkTheme} alt="dark-theme" />
        </div>
      </div>
    </motion.nav>
  )
}

export default NavBar
