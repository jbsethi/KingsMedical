import * as _ from 'lodash'

export default {
  storeLab ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        let lab = _.cloneDeep(payload.lab)
        if (payload.labId) {
          lab.id = payload.labId

          commit('UPDATE_RECORD', payload)
          resolve(payload.lab)
        } else {
          lab.id = '_' + Math.random().toString(36).substr(2, 9);
  
          commit('ADD_LAB', lab)
          resolve(lab)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
}