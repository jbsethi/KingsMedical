export default {
  ADD_RECORDS (state, payload) {
    state.users = payload
  },

  ADD_META (state, payload) {
    state.userMeta = payload
  },

  SET_CURRENT_USER (state, currentUserData) {
    state.currentUser = currentUserData
  }
}
