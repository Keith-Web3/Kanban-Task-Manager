import { motion } from 'framer-motion'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import '../../sass/shared/board.scss'
import useStore from '../store/store'

interface BoardProps {
  name: string
  colorTag: string
  id: number
  tasks: {
    name: string
    id: number
    description: string
    subtasks: { task: string; completed: boolean }[]
  }[]
}

const Board = function ({ name, tasks, id, colorTag }: BoardProps) {
  const setModalType = useStore(state => state.setModalType)

  return (
    <Droppable droppableId={`${id}`}>
      {provided => (
        <div
          className="board"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <motion.div className="board__header">
            <motion.div
              layout
              style={{
                backgroundColor: colorTag,
              }}
            ></motion.div>
            <motion.p layout>
              {name} ({tasks.length})
            </motion.p>
          </motion.div>
          {tasks && (
            <div className="board__tasks">
              {tasks.map((task, index) => (
                <Draggable
                  draggableId={`${task.id}`}
                  key={task.id}
                  index={index}
                >
                  {provided => (
                    <div
                      className="board__task"
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      onClick={() =>
                        setModalType({
                          modalType: 'task-info',
                          showModal: true,
                          modalInfo: { ...task, statusId: id, status: name },
                        })
                      }
                    >
                      <p>{task.name}</p>
                      <p>
                        {task.subtasks.filter(el => el.completed).length} of{' '}
                        {task.subtasks.length} subtasks
                      </p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </div>
      )}
    </Droppable>
  )
}

export default Board
