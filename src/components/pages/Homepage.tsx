import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import Header from '../shared/Header'
import Body from '../shared/Body'
import '../../sass/pages/homepage.scss'
import NavBar from '../shared/NavBar'

const Homepage: React.FC = function () {
  const [isNavOpened, setIsNavOpened] = useState(false)
  const [isSideBarHidden, setIsSideBarHidden] = useState(false)

  return (
    <div className="homepage" data-is_side_bar_hidden={isSideBarHidden}>
      <Header isNavOpened={isNavOpened} setIsNavOpened={setIsNavOpened} />
      <NavBar
        isNavOpened={isNavOpened}
        setIsSideBarHidden={setIsSideBarHidden}
        key={nanoid()}
      />
      <Body setIsSideBarHidden={setIsSideBarHidden} />
    </div>
  )
}

export default Homepage
