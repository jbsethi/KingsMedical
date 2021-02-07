import * as _ from 'lodash'
import { ServicesService } from '@/services/services.service'

export default {
  totalServices () {
    return new Promise((resolve, reject) => {
      ServicesService.getList()
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  removeService ({commit}, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      ServicesService.remove(payload)
        .then(result => {
          commit('REMOVE_RECORDS', result.data)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getAllServices ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ServicesService.getList(payload)
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

  getAllServicesRecords ({ commit }) {
    return new Promise((resolve, reject) => {
      ServicesService.getAllList()
        .then(result => {
          commit('ADD_RECORDS', result.data.content)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  storeService ({ commit }, payload) {
    let service = _.cloneDeep(payload.service)
    const { name, active, serviceType, replaceInterval, price, description } = service

    if (payload.serviceId) {
      return new Promise((resolve, reject) => {
        ServicesService.update(payload.serviceId, { name, active, serviceType, replaceInterval, price, description })
          .then(result => {
            commit('UPDATE_RECORD', result.data)
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    } else {
      return new Promise((resolve, reject) => {
        ServicesService.create({ name, active, serviceType, replaceInterval, price, description })
          .then(result => {
            commit('CREATE_RECORD', result.data)
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}