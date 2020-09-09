export default {
  state: {
    tags: [
      {
        title: 'Comedy',
        use: false
      },
      {
        title: 'Western',
        use: false
      },
      {
        title: 'Adventure',
        use: false
      }
    ]
  },
  mutations: {
    newTag (state, payload) {
      if (payload !== state.tags[state.tags.indexOf(payload)]) {
        state.tags.push(payload)
      }
    },
    deleteTag (state, payload) {
      let index = null
      for (let i = 0; i < state.tags.length; i++) {
        if (state.tags[i].title === payload) {
          index = i
          break
        }
      }
      if (index === null) {
        return
      }
      state.tags.splice(index, 1)
    }
  },
  actions: {
    newTag ({commit}, payload) {
      commit('newTag', payload)
    },
    deleteTag ({commit}, payload) {
      commit('deleteTag', payload)
    }
  },
  getters: {
    tags (state) {
      return state.tags
    }
  }
}
