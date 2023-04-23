import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
  const currentBoard = useStore(state => state.currentBoard())
  const setModalType = useStore(state => state.setModalType)
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  useEffect(() => {
    const classNames = [
      'header',
      'header__dropdown',
      'header__ellipsis',
      'dropdown__option',
    ]
    const listener = function (e: MouseEvent) {
      if (!classNames.includes((e.target as HTMLElement).className)) {
        setIsDropDownOpen(false)
      }
    }
    document.body.addEventListener('click', listener)

    return () => {
      document.body.removeEventListener('click', listener)
    }
  }, [])

  return (
    <motion.header
      layout
      // transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="header"
    >
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="header__sidebar-hidden"
      >
        <img src={logo} alt="logo" />
        <p>kanban</p>
      </motion.div>
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
        onClick={() => setModalType({ modalType: 'add-task', showModal: true })}
        className="header__add-task btn--on"
        disabled={currentBoard.status.length === 0}
      >
        <img src={add} alt="add board" />
        <p>add new task</p>
      </Button>
      <img
        onClick={() => setIsDropDownOpen(prev => !prev)}
        className="header__ellipsis"
        src={ellipsis}
        alt="ellipsis"
      />
      <AnimatePresence>
        {isDropDownOpen && (
          <motion.div
            initial={{ y: '-10px', opacity: 0 }}
            animate={{ y: '0px', opacity: 1 }}
            exit={{ y: '-10px', opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="header__dropdown"
          >
            <p
              onClick={() =>
                setModalType({ modalType: 'edit-board', showModal: true })
              }
              className="dropdown__option"
            >
              edit board
            </p>
            <p className="dropdown__option">delete board</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header
