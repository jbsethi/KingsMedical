export default {
  CREATE_RECORD (state, payload) {
    state.orders.push(payload)
  },

  UPDATE_RECORD (state, payload) {
    state.orders = state.orders.map(order => {
      if (order.id == payload.id) {
        return payload
      }
      return order
    })
  },

  ADD_META (state, payload) {
    state.meta = payload
  },

  ADD_RECORDS (state, payload) {
    state.orders = payload
  },
}