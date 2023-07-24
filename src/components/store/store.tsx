import { DraggableLocation } from 'react-beautiful-dnd'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Modal = {
  modalType: string
  showModal: boolean
  modalInfo?: {
    name: string
    description: string
    id: number
    subtasks: { task: string; completed: boolean }[]
    status?: string
    statusId?: number
  }
}
type Board = {
  name: string
  id: number
  status: {
    name: string
    colorTag: string
    id: number
    tasks:
      | {
          name: string
          id: number
          description: string
          subtasks: { task: string; completed: boolean }[]
        }[]
      | []
  }[]
}
type State = {
  boards: Board[]
  theme: () => 'light' | 'dark' | 'normal'
  currentBoard: () => Board
  modalType: Modal
  createBoard: (boardName: string, boardColumns: string[]) => void
  deleteBoard: (boardId: number) => void
  deleteTask: (boardId: number, taskId: number) => void
  createTask: (
    title: string,
    description: string,
    subtasks: [string, string, boolean][] | [],
    status: number,
    boardId: number
  ) => void
  editTask: (
    title: string,
    description: string,
    subtasks: [string, string, boolean][] | [],
    status: number,
    boardId: number,
    taskId: number
  ) => void
  editBoard: (
    boardName: string,
    boardId: number,
    columns: { columnName: string; columnId: number }[]
  ) => void
  reorderBoard: (
    destination: DraggableLocation | null | undefined,
    source: DraggableLocation
  ) => void
  toggleTheme: () => void
  toggleTaskCompleted: (
    boardId: number,
    statusId: number,
    taskId: number,
    subtasks: { task: string; completed: boolean }[]
  ) => void
  setCurrentBoard: (id: number) => void
  setModalType: (newType: Modal) => void
}
type Action = {
  toggleTheme: () => void
}
const useStore = create<State & Action>()(
  persist(
    (set, get) => ({
      boards: [],
      theme: () =>
        JSON.parse(window.getComputedStyle(document.body).content) as
          | 'light'
          | 'dark'
          | 'normal',
      deleteBoard: function (boardId) {
        const newBoards = get().boards.filter(board => board.id !== boardId)
        let adjacentBoardIdx = get().boards.findIndex(
          board => board.id === boardId
        )
        adjacentBoardIdx = adjacentBoardIdx > 0 ? adjacentBoardIdx - 1 : 0

        set(() => ({ boards: newBoards }))
        get().setCurrentBoard(get().boards[adjacentBoardIdx]?.id || 0)
        get().setModalType({ modalType: '', showModal: false })
      },
      deleteTask: function (boardId, taskId) {
        const currentBoard = get().currentBoard()
        const otherBoards = get().boards.filter(board => board.id !== boardId)

        currentBoard.status.forEach(stat => {
          if (stat.tasks.some(task => task.id === taskId)) {
            stat.tasks = stat.tasks.filter(task => task.id !== taskId)
          }
        })

        set(() => ({
          boards: [...otherBoards, currentBoard].sort((a, b) => a.id! - b.id!),
        }))
        get().setCurrentBoard(boardId)
        get().setModalType({ modalType: '', showModal: false })
      },
      createTask: function (title, description, subtasks, status, boardId) {
        const otherBoards = get().boards.filter(board => board.id !== boardId)
        const currentBoard = get().boards.find(board => board.id === boardId)
        const otherStatuses = currentBoard!.status.filter(
          el => el.id !== status
        )
        const currentStatus = currentBoard!.status.find(el => el.id === status)

        const newTask = {
          name: title,
          description: description,
          id: Date.now(),
          subtasks: subtasks.map(el => ({ task: el[0], completed: el[2] })),
        }
        const allBoards = [
          ...otherBoards,
          {
            ...currentBoard,
            status: [
              ...otherStatuses,
              {
                ...currentStatus,
                tasks: [...currentStatus!.tasks, newTask].sort(
                  (a, b) => b.id - a.id
                ),
              },
            ].sort((a, b) => a.id! - b.id!),
          },
        ]
        const setter = function () {
          return { boards: allBoards.sort((a, b) => a.id! - b.id!) }
        } as
          | (State & Action)
          | Partial<State & Action>
          | ((
              state: State & Action
            ) => (State & Action) | Partial<State & Action>)
        set(setter)
        get().setCurrentBoard(boardId)
        get().setModalType({ modalType: '', showModal: false })
      },
      editTask: function (
        title,
        description,
        subtasks,
        status,
        boardId,
        taskId
      ) {
        const otherBoards = get().boards.filter(board => board.id !== boardId)
        const currentBoard = {
          ...get().boards.find(board => board.id === boardId),
        }

        const task = {
          name: title,
          description,
          id: taskId,
          subtasks: subtasks.map(el => ({ task: el[0], completed: el[2] })),
        }
        const newStatus = currentBoard
          .status!.map(status =>
            status.tasks.some(task => task.id === taskId)
              ? {
                  ...status,
                  tasks: status.tasks
                    .filter(el => el.id !== taskId)
                    .sort((a, b) => b.id - a.id),
                }
              : status
          )
          .map(el =>
            el.id === status ? { ...el, tasks: [...el.tasks, task] } : el
          )
          .sort((a, b) => a.id - b.id)

        const setter = function () {
          return {
            boards: [
              {
                ...currentBoard,
                status: newStatus.sort((a, b) => a.id - b.id),
              },
              ...otherBoards,
            ].sort((a, b) => a.id! - b.id!),
          }
        } as
          | (State & Action)
          | Partial<State & Action>
          | ((
              state: State & Action
            ) => (State & Action) | Partial<State & Action>)
        set(setter)
        get().setCurrentBoard(boardId)
        get().setModalType({ modalType: '', showModal: false })
      },
      createBoard: function (boardName, boardColumns) {
        const board: Board = {
          name: boardName,
          id: Date.now(),
          status: boardColumns.map((column, idx) => ({
            name: column,
            colorTag: `#${(0x1000000 + Math.random() * 0xffffff)
              .toString(16)
              .substr(1, 6)}`,
            tasks: [],
            id: Date.now() + idx,
          })),
        }
        set(() => ({
          boards: [...get().boards, board].sort((a, b) => a.id - b.id),
        }))
        get().setModalType({ modalType: '', showModal: false })
      },
      editBoard: function (boardName, boardId, allColumns) {
        const otherBoards = get().boards.filter(board => board.id !== boardId)
        const currentBoard = get().boards.find(board => board.id === boardId)

        const newBoard: Board = {
          name: boardName,
          id: currentBoard!.id,
          status: allColumns.map(({ columnName, columnId }, idx) => {
            const status = currentBoard?.status.find(el => el.id === columnId)
            if (status) return { ...status, name: columnName }
            return {
              name: columnName,
              colorTag: `#${(0x1000000 + Math.random() * 0xffffff)
                .toString(16)
                .substr(1, 6)}`,
              tasks: [],
              id: Date.now() + idx,
            }
          }),
        }
        set(() => ({
          boards: [...otherBoards, newBoard].sort((a, b) => a.id - b.id),
        }))
        get().setCurrentBoard(boardId)
        get().setModalType({ modalType: '', showModal: false })
      },
      reorderBoard: function (destination, source) {
        const board = get().currentBoard()
        const otherBoards = get().boards.filter(
          otherBoard => board.id !== otherBoard.id
        )

        if (!destination) return
        if (
          source.droppableId === destination.droppableId &&
          source.index === destination.index
        )
          return

        const [deletedTask] = board.status
          .find(column => column.id === +source.droppableId)!
          .tasks.splice(source.index, 1)

        board.status
          .find(column => column.id === +destination.droppableId)!
          .tasks.splice(destination.index, 0, deletedTask)

        set(() => ({
          boards: [...otherBoards, board].sort((a, b) => a.id! - b.id!),
        }))
      },
      currentBoard: () => get().boards[0] || null,
      toggleTheme: function () {
        set(() => {
          if (get().theme() === 'light') {
            document.body.style.backgroundColor = '#20212c'
            return { theme: () => 'dark' }
          }
          document.body.style.backgroundColor = '#f4f7fd'
          return { theme: () => 'light' }
        })
      },
      toggleTaskCompleted: function (boardId, statusId, taskId, subtasks) {
        const otherBoards = get().boards.filter(board => board.id !== boardId)!
        const currentBoard = {
          ...get().boards.find(board => board.id === boardId)!,
        }

        const task = currentBoard!
          .status!.find(stat => stat.id === statusId)!
          .tasks.find(task => task.id === taskId)!
        task!.subtasks = subtasks

        set(() => ({
          boards: [...otherBoards, currentBoard].sort((a, b) => a.id - b.id),
        }))
      },
      setCurrentBoard: function (id) {
        const setter = () => {
          const board = get().boards.find(board => board.id === id)!
          return { currentBoard: () => board }
        }
        set(setter)
      },
      modalType: { modalType: '', showModal: false },
      setModalType: function (newType) {
        set(() => ({ modalType: newType }))
      },
    }),
    {
      name: 'kanban-task-manager',
    }
  )
)

export default useStore
