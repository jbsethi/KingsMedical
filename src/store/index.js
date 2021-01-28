import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  state: {
    isSearchActive: false
  },
  strict: process.env.NODE_ENV === 'development'
})
