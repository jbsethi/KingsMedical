  /* eslint-disable no-unused-vars */
import { OrdersService } from '@/services/orders.service'

export default {
  storeOrder ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      OrdersService.create(payload)
        .then(result => {
          commit('CREATE_RECORD', result.data)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getAllOrders ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      OrdersService.getList()
        .then(result => {
          commit('ADD_RECORDS', result.data.content)
          commit('ADD_META', result.data.meta)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getOrderDetails ({commit}, payload) {
    return new Promise((resolve, reject) => {
      OrdersService.getById(payload)
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}