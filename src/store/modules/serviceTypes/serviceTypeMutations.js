export default {
  CREATE_RECORD (state, payload) {
    state.serviceTypes.push(payload)
  },

  UPDATE_RECORD (state, payload) {
    state.serviceTypes = state.serviceTypes.map(serviceType => {
      if (serviceType.id == payload.id) {
        return payload
      }
      return serviceType
    })
  },

  ADD_META (state, payload) {
    state.meta = payload
  },

  ADD_RECORDS (state, payload) {
    state.serviceTypes = payload
  },
}