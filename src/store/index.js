import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    username: null,
    userId: null,
    cart:[
      // {
      //   id:101,
      //   name:'test1',
      //   price:1,
      //   amount:1
      // },
    ],
    products:[
      // {
      //   id:101,
      //   name:'test1',
      //   price:1,
      //   image:'test1',
      //   category:'test1',
      //   created_time:'test1',
      //   is_low:'test1',
      //   amount:1,
      // }
    ],
    hotSaleProducts:[

    ],
    newProducts:[

    ]
  },
  getters: {
  },
  mutations: {
    SET_USER_ID: (state, id) => {
        state.userId = id
    },
    SET_NAME: (state, name) => {
      state.username = name
    },
    SET_LOGIN: (state, login) => {
      state.isLogin = login
    },
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    SET_HOT_SALE_PRODUCTS(state, hotSaleProducts) {
      state.hotSaleProducts = hotSaleProducts
    },
    SET_NEW_PRODUCTS(state, newProducts) {
        state.newProducts = newProducts
    },
    Cart_add: (state,commo) => {
      const newCommo = { ...commo };
      state.cart.push(newCommo);
      // state.cart.push(commo)
    },
    Cart_modify: (state,commo) =>{
      const index = state.cart.findIndex(c => c.id === commo.id)
      if (index !== -1) {
        state.cart[index].amount = state.cart[index].amount + commo.amount
      }
    },
    Cart_delete: (state,commo) =>{
      const index = state.cart.findIndex(c => c.id === commo.id)
      if (index !== -1) {
        state.cart.splice(index, 1)
      }
    },

  },
  actions: {
  },
  modules: {
  }
})
