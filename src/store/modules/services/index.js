import state from './serviceState'
import mutations from './serviceMutations'
import getters from './serviceGetters'
import actions from './serviceActions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
