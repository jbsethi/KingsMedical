export default {
  ADD_RECORDS (state, payload) {
    state.users = payload
  },

  CREATE_RECORD (state, payload) {
    state.users.push(payload)
  },

  UPDATE_RECORD (state, payload) {
    state.labs = state.users.map(user => {
      if (user.id == payload.id) {
        return payload
      }
      return user
    })
  },

  ADD_META (state, payload) {
    state.userMeta = payload
  },

  SET_CURRENT_USER (state, currentUserData) {
    state.currentUser = currentUserData
  }
}
