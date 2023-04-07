import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    username: null,
    userId: null,
    cart: [],
  },
  getters: {
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.username = name
    },
    SET_LOGIN: (state, login) => {
      state.isLogin = login
    }
  },
  actions: {
  },
  modules: {
  }
})
