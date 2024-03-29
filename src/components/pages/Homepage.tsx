import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import Header from '../shared/Header'
import Body from '../shared/Body'
import NavBar from '../shared/NavBar'
import '../../sass/pages/homepage.scss'
import useStore from '../store/store'

const Homepage: React.FC = function () {
  const [isNavOpened, setIsNavOpened] = useState(false)
  const [isSideBarHidden, setIsSideBarHidden] = useState(false)
  const theme = useStore(state => state.theme())

  return (
    <div
      className="homepage"
      data-theme={theme}
      data-is_side_bar_hidden={isSideBarHidden}
    >
      <Header isNavOpened={isNavOpened} setIsNavOpened={setIsNavOpened} />
      <NavBar
        isNavOpened={isNavOpened}
        setIsSideBarHidden={setIsSideBarHidden}
      />
      <Body setIsSideBarHidden={setIsSideBarHidden} />
    </div>
  )
}

export default Homepage
