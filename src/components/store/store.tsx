import { create } from 'zustand'
import { nanoid } from 'nanoid'

export type Modal = {
  modalType: string
  showModal: boolean
  modalInfo?: {
    name: string
    description: string
    subtasks: { task: string; completed: boolean }[]
  }
}
type Board = {
  name: string
  id: number
  status: {
    name: string
    colorTag: string
    tasks:
      | {
          name: string
          id: string
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
    subtasks: string[] | [],
    status: string,
    boardName: string,
    boardId: number
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
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
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
              id: nanoid(),
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Design settings and search pages',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
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
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
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
              id: nanoid(),
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'roadmap',
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Design settings and search pages',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
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
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
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
              id: nanoid(),
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          colorTag:
            '#' +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6),
          tasks: [
            {
              name: 'Design settings and search pages',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              id: nanoid(),
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
  createTask: function (
    title,
    description,
    subtasks,
    status,
    boardName,
    boardId
  ) {
    const otherBoards = get().boards.filter(board => board.name !== boardName)
    const currentBoard = get().boards.find(board => board.name === boardName)
    const otherStatuses = currentBoard!.status.filter(el => el.name !== status)
    const currentStatus = currentBoard!.status.find(el => el.name === status)
    const newTask = {
      name: title,
      description: description,
      id: Date.now(),
      subtasks: subtasks.map(el => ({ task: el, completed: false })),
    }
    const allBoards = [
      ...otherBoards,
      {
        ...currentBoard,
        status: [
          ...otherStatuses,
          {
            ...currentStatus,
            tasks: [...currentStatus!.tasks, newTask],
          },
        ],
      },
    ]
    const setter = function () {
      return { boards: allBoards }
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
      status: boardColumns.map(column => ({
        name: column,
        colorTag: `#${(0x1000000 + Math.random() * 0xffffff)
          .toString(16)
          .substr(1, 6)}`,
        tasks: [],
      })),
    }
    set(() => ({ boards: [...get().boards, board] }))
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
