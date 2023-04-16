import React from 'react'

const Board: React.FC<{
  name: string
  tasks: {
    name: string
    subtasks: { task: string; completed: boolean }[]
  }[]
}> = function ({ name, tasks }) {
  return <p>board</p>
}

export default Board
