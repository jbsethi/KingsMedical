import * as _ from 'lodash'
import { LabsService } from '@/services/labs.service'

export default {
  getAllLabServices (context, payload) {
    return new Promise((resolve, reject) => {
      LabsService.getAllLabServices(payload)
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getAllLabs ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      LabsService.getList(payload)
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

  loadEveryLab () {
    return new Promise((resolve, reject) => {
      LabsService.loadEveryLab()
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  addService (context, payload) {
    return new Promise((resolve, reject) => {
      LabsService.addService(payload)
        .then(result => {
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
  },

  removeLabService  (_, payload) {
    return new Promise((resolve, reject) => {
      LabsService.removeLabService(payload)
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  updateStatusLabService (_, payload) {
    return new Promise((resolve, reject) => {
      LabsService.updateStatusLabService(payload)
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getEveryServicebyServiceTypeAndLab (_, payload) {
    return new Promise((resolve, reject) => {
      LabsService.getEveryServicebyServiceTypeAndLab(payload)
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}