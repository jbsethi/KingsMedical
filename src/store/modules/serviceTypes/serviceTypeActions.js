import * as _ from 'lodash'
import { ServiceTypesService } from '@/services/serviceTypes.service'

export default {
  getAllServiceTypes ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      ServiceTypesService.getList(payload)
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

  storeServiceType ({ commit }, payload) {
    let serviceType = _.cloneDeep(payload.serviceType)
    const { name, active = false } = serviceType

    if (payload.serviceTypeId) {
      return new Promise((resolve, reject) => {
        ServiceTypesService.update(payload.serviceTypeId, { name, active })
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
        ServiceTypesService.create({ name, active })
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