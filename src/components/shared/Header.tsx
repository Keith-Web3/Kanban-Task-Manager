import React, { useState } from 'react'
import { motion } from 'framer-motion'

import logo from '../../assets/logo-mobile.svg'
import chevronDown from '../../assets/icon-chevron-down.svg'
import add from '../../assets/icon-add-task-mobile.svg'
import ellipsis from '../../assets/icon-vertical-ellipsis.svg'
import '../../sass/shared/header.scss'
import Button from '../ui/Button'
import useStore from '../store/store'

const Header: React.FC<{
  isNavOpened: boolean
  setIsNavOpened: React.Dispatch<React.SetStateAction<boolean>>
}> = function ({ isNavOpened, setIsNavOpened }) {
  const variants = {
    initial: {
      rotate: 0,
    },
    final: {
      rotate: isNavOpened ? '180deg' : 0,
    },
  }
  const currentBoard = useStore(state => state.currentBoard)

  return (
    <motion.header
      layout
      // transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="header"
    >
      <div className="header__sidebar-hidden">
        <img src={logo} alt="logo" />
        <p>kanban</p>
      </div>
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__title">{currentBoard.name}</p>
      <motion.img
        onClick={() => setIsNavOpened(prev => !prev)}
        variants={variants}
        initial="initial"
        animate="final"
        className="header__chevron"
        src={chevronDown}
        alt="down arrow"
      />
      <Button
        className={`header__add-task btn--one ${
          currentBoard.status.length ? '' : 'disabled'
        }`}
      >
        <img src={add} alt="add board" />
        <p>add new task</p>
      </Button>
      <img className="header__ellipsis" src={ellipsis} alt="ellipsis" />
    </motion.header>
  )
}

export default Header
