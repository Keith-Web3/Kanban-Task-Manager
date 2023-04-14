import React, { useState } from 'react'
import { motion } from 'framer-motion'

import logo from '../../assets/logo-mobile.svg'
import chevronDown from '../../assets/icon-chevron-down.svg'
import add from '../../assets/icon-add-task-mobile.svg'
import ellipsis from '../../assets/icon-vertical-ellipsis.svg'
import '../../sass/shared/header.scss'
import Button from '../ui/Button'

const Header: React.FC = function () {
  const [isNavOpened, setIsNavOpened] = useState(false)

  const variants = {
    initial: {
      rotate: 0,
    },
    final: {
      rotate: isNavOpened ? '180deg' : 0,
    },
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <p className="header__title">platform launch</p>
      <motion.img
        onClick={() => setIsNavOpened(prev => !prev)}
        variants={variants}
        initial="initial"
        animate="final"
        className="header__chevron"
        src={chevronDown}
        alt="down arrow"
      />
      <Button className="header__add-board btn--one">
        <img src={add} alt="add board" />
      </Button>
      <img className="header__ellipsis" src={ellipsis} alt="ellipsis" />
    </header>
  )
}

export default Header
