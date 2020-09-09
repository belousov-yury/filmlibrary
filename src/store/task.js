export default {
  state: {
    tasks: [
      {
        'id': 1,
        'title': 'GrowthBusters: Hooked on Growth',
        'description': 'I directed this documentary challenging the myths linking growth with prosperity and fulfillment. It explores how our beliefs about economic and consumption',
        'whatWatch': 'Film',
        'completed': false,
        'editing': false
      },
      {
        'id': 2,
        'title': 'Game of thrones',
        'description': 'Best serials',
        'whatWatch': 'Serial',
        'completed': false,
        'editing': false,
        'tags': [{title: 'Adventure'}]
      }
    ]
  },
  mutations: {
    newTask (state, payload) {
      state.tasks.push(payload)
    },
    deleteTask (state, payload) {
      let index
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id === payload) {
          index = i
          break
        }
      }
      if (index === null) {
        return
      }
      state.tasks.splice(index, 1)
    }
  },
  actions: {
    newTask ({commit}, payload) {
      payload.id = Math.random()
      commit('newTask', payload)
    },
    deleteTask ({commit}, payload) {
      commit('deleteTask', payload)
    }
  },
  getters: {
    tasksAll (state) {
      return state.tasks
    },
    taskCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed
      })
    },
    taskNotCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed === false
      })
    }
  }
}
