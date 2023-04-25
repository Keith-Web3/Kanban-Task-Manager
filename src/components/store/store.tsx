import { create } from 'zustand'
import { nanoid } from 'nanoid'

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
  theme: 'light' | 'dark'
  currentBoard: () => Board
  modalType: Modal
  createBoard: (boardName: string, boardColumns: string[]) => void
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
  toggleTheme: () => void
  setCurrentBoard: (id: number) => void
  setModalType: (newType: Modal) => void
}
type Action = {
  toggleTheme: () => void
}

const useStore = create<State & Action>((set, get) => ({
  boards: [
    {
      name: 'platform launch',
      id: 1,
      status: [
        {
          name: 'Todo',
          id: Date.now(),
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                { task: 'Do this', completed: false },
                { task: 'Do that', completed: false },
                { task: 'complete that', completed: false },
              ],
            },
            {
              name: 'Build UI for search',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          id: Date.now(),
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Design settings and search pages',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                {
                  task: 'design settings',
                  completed: false,
                },
                {
                  task: 'search pages',
                  completed: true,
                },
                {
                  task: 'platform launch',
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'marketing plan',
      id: 2,
      status: [
        {
          name: 'Todo',
          id: Date.now(),
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                { task: 'Do this', completed: false },
                { task: 'Do that', completed: false },
                { task: 'complete that', completed: false },
              ],
            },
            {
              name: 'Build UI for search',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'roadmap',
          id: Date.now(),
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Design settings and search pages',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                {
                  task: 'design settings',
                  completed: false,
                },
                {
                  task: 'search pages',
                  completed: true,
                },
                {
                  task: 'platform launch',
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'roadmap',
      id: 3,
      status: [
        {
          name: 'Todo',
          id: Date.now(),
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                { task: 'Do this', completed: false },
                { task: 'Do that', completed: false },
                { task: 'complete that', completed: false },
              ],
            },
            {
              name: 'Build UI for search',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          id: Date.now(),
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Design settings and search pages',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: Date.now(),
              subtasks: [
                {
                  task: 'design settings',
                  completed: false,
                },
                {
                  task: 'search pages',
                  completed: true,
                },
                {
                  task: 'platform launch',
                  completed: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  theme: window.getComputedStyle(document.body).content as 'light' | 'dark',
  createTask: function (title, description, subtasks, status, boardId) {
    const otherBoards = get().boards.filter(board => board.id !== boardId)
    const currentBoard = get().boards.find(board => board.id === boardId)
    const otherStatuses = currentBoard!.status.filter(el => el.id !== status)
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
        ],
      },
    ]
    const setter = function () {
      return { boards: allBoards.sort((a, b) => a.id! - b.id!) }
    } as
      | (State & Action)
      | Partial<State & Action>
      | ((state: State & Action) => (State & Action) | Partial<State & Action>)
    set(setter)
    get().setCurrentBoard(boardId)
    get().setModalType({ modalType: '', showModal: false })
  },
  editTask: function (title, description, subtasks, status, boardId, taskId) {
    const otherBoards = get().boards.filter(board => board.id !== boardId)
    const currentBoard = { ...get().boards.find(board => board.id === boardId) }

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
          { ...currentBoard, status: newStatus.sort((a, b) => a.id - b.id) },
          ...otherBoards,
        ].sort((a, b) => a.id! - b.id!),
      }
    } as
      | (State & Action)
      | Partial<State & Action>
      | ((state: State & Action) => (State & Action) | Partial<State & Action>)
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
  currentBoard: () => get().boards[0],
  toggleTheme: function () {
    set(() => {
      console.log(get())
      if (get().theme === 'light') return { theme: 'dark' }
      return { theme: 'light' }
    })
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
}))

export default useStore
