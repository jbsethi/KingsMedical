import { RolesService } from '@/services/roles.service'

export default {
  getAllRoles ({ commit }) {
    return new Promise((resolve, reject) => {
      RolesService.getList()
        .then(result => {
          commit('ADD_RECORDS', result.data.content)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}