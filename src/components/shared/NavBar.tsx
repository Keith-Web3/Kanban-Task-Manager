import React from 'react'
import { motion } from 'framer-motion'

import useStore from '../store/store'
import logo from '../../assets/logo-mobile.svg'
import boardIcon from '../../assets/icon-board.svg'
import boardIconP from '../../assets/icon-board-purple.svg'
import plusP from '../../assets/icon-add-purple.svg'
import darkTheme from '../../assets/icon-dark-theme.svg'
import lightTheme from '../../assets/icon-light-theme.svg'
import eye from '../../assets/icon-hide-sidebar.svg'
import '../../sass/shared/navbar.scss'

const NavBar: React.FC<{
  isNavOpened: boolean
  setIsSideBarHidden: React.Dispatch<React.SetStateAction<boolean>>
}> = function ({ isNavOpened, setIsSideBarHidden }) {
  const boards = useStore(state => state.boards)
  const currentBoard = useStore(state => state.currentBoard())
  const setCurrentBoard = useStore(state => state.setCurrentBoard)
  const [theme, toggleTheme] = useStore(state => [
    state.theme,
    state.toggleTheme,
  ])
  const setModalType = useStore(state => state.setModalType)

  const navVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: Number(isNavOpened),
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
  }
  const boardVariants = {
    initial: {
      opacity: 0,
      scaleX: 0,
    },
    animate: {
      opacity: 1,
      scaleX: 1,
    },
  }
  return (
    <motion.nav
      layout
      variants={navVariant}
      initial="initial"
      animate="animate"
      // transition={{ type: 'spring', stiffness: 900, damping: 30 }}
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
            <motion.div
              variants={boardVariants}
              key={idx}
              className={`navbar__board ${
                board.id === currentBoard.id ? 'active' : ''
              }`}
              onClick={() => setCurrentBoard(board.id)}
            >
              <img src={boardIcon} alt="board" />
              <p>{board.name}</p>
            </motion.div>
          ))}
          <div className="navbar__add-board navbar__board">
            <img src={boardIconP} alt="board" />
            <img src={plusP} alt="add board" />
            <p
              onClick={() =>
                setModalType({ modalType: 'create-board', showModal: true })
              }
            >
              create new board
            </p>
          </div>
        </div>
        <div className="navbar__theme">
          <img src={lightTheme} alt="light-theme" />
          <div
            data-ison={theme === 'light'}
            className="navbar__theme-toggler"
            onClick={toggleTheme}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            ></motion.div>
          </div>
          <img src={darkTheme} alt="dark-theme" />
        </div>
        <div className="navbar__hide" onClick={() => setIsSideBarHidden(true)}>
          <img src={eye} alt="hide sidebar" />
          <p>hide sidebar</p>
        </div>
      </div>
    </motion.nav>
  )
}

export default NavBar
