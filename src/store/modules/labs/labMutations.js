export default {
  CREATE_RECORD (state, payload) {
    state.labs.push(payload)
  },

  UPDATE_RECORD (state, payload) {
    state.labs = state.labs.map(lab => {
      if (lab.id == payload.id) {
        return payload
      }
      return lab
    })
  },

  ADD_META (state, payload) {
    state.meta = payload
  },

  ADD_RECORDS (state, payload) {
    state.labs = payload
  }
}