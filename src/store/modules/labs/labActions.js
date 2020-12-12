import * as _ from 'lodash'
import { LabsService } from '@/services/labs.service'

export default {
  getAllLabs ({ commit }) {
    return new Promise((resolve, reject) => {
      LabsService.getList()
        .then(result => {
          commit('ADD_RECORDS', result.data.content)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  storeLab ({ commit }, payload) {
    let lab = _.cloneDeep(payload.lab)
    const { name, active, description, image } = lab

    if (payload.labId) {
      return new Promise((resolve, reject) => {
        LabsService.update(payload.labId, { name, active, description, image })
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
        LabsService.create({ name, active, description, image })
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