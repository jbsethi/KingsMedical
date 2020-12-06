export default {
  CREATE_RECORD (state, payload) {
    state.services.push(payload)
  },

  UPDATE_RECORD (state, payload) {
    state.services = state.services.map(service => {
      if (service.id == payload.id) {
        return payload
      }
      return service
    })
  },

  ADD_RECORDS (state, payload) {
    state.services = payload
  },
}