import React from 'react'

import Header from '../shared/Header'
import Body from '../shared/Body'
import '../../sass/pages/homepage.scss'

const Homepage: React.FC = function () {
  return (
    <div className="homepage">
      <Header />
      <Body />
    </div>
  )
}

export default Homepage
