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
type State = {
  boards: {
    name: string
    id: number
    status: {
      name: string
      colorTag: string
      tasks: {
        name: string
        id: string
        description: string
        subtasks: { task: string; completed: boolean }[]
      }[]
    }[]
  }[]
  theme: 'light' | 'dark'
  toggleTheme: () => void
  currentBoard: () => {
    name: string
    id: number
    status: {
      name: string
      colorTag: string
      tasks: {
        name: string
        id: string
        description: string
        subtasks: { task: string; completed: boolean }[]
      }[]
    }[]
  }
  setCurrentBoard: (id: number) => void
  modalType: Modal
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
