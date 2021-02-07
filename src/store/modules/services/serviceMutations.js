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

  ADD_META (state, payload) {
    state.meta = payload
  },

  ADD_RECORDS (state, payload) {
    state.services = payload
  },

  REMOVE_RECORDS (state, payload) {
    state.services = state.services.filter(service => service.id != payload.id )
  }
}