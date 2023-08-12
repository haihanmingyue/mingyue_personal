import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    roleList: [],
    routerList: []
  },
  getters: {
    getRoleList: state => state.roleList,
    getRouterList: state => state.routerList
  },
  mutations: {
    SET_ROLE_LIST(state, list) {
      state.roleList = list
    },
    SET_ROUTER_LIST(state, list) {
      state.routerList = list
    }
  },
  actions: {
  },
  modules: {
  }
})
