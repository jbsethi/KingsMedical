export default {
  ADD_RECORDS (state, payload) {
    state.users = payload
  },

  CREATE_RECORD (state, payload) {
    state.users.push(payload)
  },

  REMOVE_RECORD (state, payload) {
    state.users = state.users.filter(user => {
      if (user.id == payload.id) {
        return false
      }
      return true
    })
  },

  ADD_META (state, payload) {
    state.userMeta = payload
  },

  SET_CURRENT_USER (state, currentUserData) {
    state.currentUser = currentUserData
  }
}
