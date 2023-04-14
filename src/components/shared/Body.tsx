import React from 'react'

import plus from '../../assets/icon-add-task-mobile.svg'
import Button from '../ui/Button'
import '../../sass/shared/body.scss'

const Body: React.FC = function () {
  return (
    <main className="body">
      <div className="empty">
        <p className="empty__message">
          This board is empty. Create a new column to get started.
        </p>
        <Button className="btn--one">
          <img src={plus} alt="add" />
          Add New Column
        </Button>
      </div>
    </main>
  )
}

export default Body
