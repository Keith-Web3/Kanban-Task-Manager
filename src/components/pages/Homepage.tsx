import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { nanoid } from 'nanoid'

import Header from '../shared/Header'
import Body from '../shared/Body'
import '../../sass/pages/homepage.scss'
import NavBar from '../shared/NavBar'

const Homepage: React.FC = function () {
  const [isNavOpened, setIsNavOpened] = useState(false)

  return (
    <div className="homepage">
      <Header isNavOpened={isNavOpened} setIsNavOpened={setIsNavOpened} />
      <AnimatePresence>
        {isNavOpened && <NavBar key={nanoid()} />}
      </AnimatePresence>
      <Body />
    </div>
  )
}

export default Homepage
