import { create } from 'zustand'

console.log(window.getComputedStyle(document.body).content)
type State = {
  boards: {
    name: string
    status: {
      name: string
      tasks: {
        name: string
        subtasks: { task: string; completed: boolean }[]
      }[]
    }[]
  }[]
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
type Action = {
  toggleTheme: () => void
}

const useStore = create<State & Action>((set, get) => ({
  boards: [
    {
      name: 'platform launch',
      status: [
        {
          name: 'Todo',
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              subtasks: [
                { task: 'Do this', completed: false },
                { task: 'Do that', completed: false },
                { task: 'complete that', completed: false },
              ],
            },
            {
              name: 'Build UI for search',
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          tasks: [
            {
              name: 'Design settings and search pages',
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
      status: [
        {
          name: 'Todo',
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              subtasks: [
                { task: 'Do this', completed: false },
                { task: 'Do that', completed: false },
                { task: 'complete that', completed: false },
              ],
            },
            {
              name: 'Build UI for search',
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'roadmap',
          tasks: [
            {
              name: 'Design settings and search pages',
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
      status: [
        {
          name: 'Todo',
          tasks: [
            {
              name: 'Build UI for onboarding flow',
              subtasks: [
                { task: 'Do this', completed: false },
                { task: 'Do that', completed: false },
                { task: 'complete that', completed: false },
              ],
            },
            {
              name: 'Build UI for search',
              subtasks: [{ task: 'build ui', completed: false }],
            },
            {
              name: 'Build settings UI',
              subtasks: [
                { task: 'build settings', completed: false },
                { task: 'buuld gret', completed: false },
              ],
            },
          ],
        },
        {
          name: 'Doing',
          tasks: [
            {
              name: 'Design settings and search pages',
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
  toggleTheme: function () {
    console.log(get().theme)
    set(() => {
      if (get().theme === 'light') return { theme: 'dark' }
      return { theme: 'light' }
    })
  },
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}))

export default useStore
