export default {
  ADD_LAB (state, payload) {
    state.labs.push(payload)
  },

  UPDATE_RECORD (state, payload) {
    state.labs = state.labs.map(lab => {
      if (lab.id == payload.labId) {
        return payload.lab
      }
      return lab
    })
  }
}