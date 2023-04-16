import React from 'react'
import { motion } from 'framer-motion'

import plus from '../../assets/icon-add-task-mobile.svg'
import Button from '../ui/Button'
import '../../sass/shared/body.scss'
import useStore from '../store/store'
import eye from '../../assets/icon-show-sidebar.svg'

const Body: React.FC<{
  setIsSideBarHidden: React.Dispatch<React.SetStateAction<boolean>>
}> = function ({ setIsSideBarHidden }) {
  const boards = useStore(state => state.boards)

  return (
    <motion.main
      layout
      // transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="body"
    >
      <div className="empty">
        <p className="empty__message">
          This board is empty. Create a new column to get started.
        </p>
        <Button className="btn--one">
          <img src={plus} alt="add" />
          Add New Column
        </Button>
      </div>
      <div className="hide-sidebar" onClick={() => setIsSideBarHidden(false)}>
        <img src={eye} alt="eye" />
      </div>
    </motion.main>
  )
}

export default Body
