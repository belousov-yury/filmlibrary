import firebase from 'firebase/app'
import Tasks from './task_help'

export default {
  state: {
    tasks: []
  },
  mutations: {
    loadTasks (state, payload) {
      state.tasks = payload
    },
    newTask (state, payload) {
      state.tasks.push(payload)
    },
    editTask (state, {id, title, description}) {
      const task = state.tasks.find(t => {
        return t.id === id
      })
      task.title = title
      task.description = description
    }
  },
  actions: {
    async loadTasks ({commit}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // done logic
        const task = await firebase.database().ref('tasks').once('value')
        console.log(task)
        const tasks = task.val()
        const tasksArray = []
        Object.keys(tasks).forEach(key => {
          console.log(key)
          const t = tasks[key]
          tasksArray.push(
            new Tasks(
              t.title,
              t.description,
              t.whatWatch,
              t.time,
              t.tags,
              t.completed,
              t.editing,
              t.user,
              key
            )
          )
        })
        console.log(tasksArray)
        commit('loadTasks', tasksArray)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async newTask ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // done logic
        const newTask = new Tasks(
          payload.title,
          payload.description,
          payload.whatWatch,
          payload.time,
          payload.tags,
          payload.completed,
          payload.editing,
          getters.user.id
        )
        const task = await firebase.database().ref('tasks').push(newTask)
        commit('newTask', {
          ...newTask,
          id: task.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async editTask ({commit}, {id, title, description}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // done logic
        await firebase.database().ref('tasks').child(id).update({
          title,
          description
        })
        commit('editTask', {id, title, description})
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async deleteTask ({commit}, id) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // done logic
        await firebase.database().ref('tasks').child(id).remove()
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    tasksAll (state, getters) {
      return state.tasks.filter(task => {
        return task.user === getters.user.id
      })
    },
    taskCompleted (state, getters) {
      return getters.tasksAll.filter(task => {
        return task.completed
      })
    },
    taskNotCompleted (state, getters) {
      return getters.tasksAll.filter(task => {
        return task.completed === false
      })
    }
  }
}
