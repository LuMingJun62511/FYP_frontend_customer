import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    username: null,
    userId: null,
    cart:[
      {
        id:101,
        name:'test1',
        price:1,
        amount:1
      },
    ]
  },
  getters: {
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.username = name
    },
    SET_LOGIN: (state, login) => {
      state.isLogin = login
    },
    Cart_add: (state,commo) => {
      state.cart.push(commo)
    },
    Cart_modify: (state,id,amount) =>{
      const index = state.cart.findIndex(c => c.id === id)
      if (index !== -1) {
        state.cart[index].amount = amount
      }
    },
    Cart_delete: (state,id) =>{
      const index = state.cart.findIndex(c => c.id === id)
      if (index !== -1) {
        state.cart.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
