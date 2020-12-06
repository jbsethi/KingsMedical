/* eslint-disable no-unused-vars */
import { UsersService } from '@/services/users.service'
import { AuthService } from '@/services/auth.service'
import * as _ from 'lodash'

export default {
  getAllUsers ({ commit }) {
    return new Promise((resolve, reject) => {
      UsersService.getList()
        .then(result => {
          console.log(result)
          commit('ADD_RECORDS', result.data.content)
          commit('ADD_META', result.data.meta)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  storeUser ({ commit }, payload) {
    let user = _.cloneDeep(payload.user)

    const {
      emiratesId,
      role,
      name,
      username,
      email,
      password,
      labId = null,
      active = false
    } = user

    if (payload.userId) {
      return new Promise((resolve, reject) => {
        UsersService.update(payload.userId, {emiratesId, role, name, email, password, labId, active})
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
        UsersService.create({emiratesId, role, name, username, email, password, labId, active})
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

  activateUser ({ state, commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      UsersService.update(payload.id, { active: payload.status })
        .then(result => {
          commit('UPDATE_RECORD', result.data)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })

  },

  getCurrent ({ commit }) {
    return UsersService.getCurrent()
      .then(user => commit('SET_CURRENT_USER', user.data))
      .catch(error => commit('toast/NEW', { type: 'error', message: error.message }, { root: true }))
  },

  login ({commit}, payload) {
    return new Promise((resolve, reject) => {
      AuthService.makeLogin(payload)
        .then(result => {
          const { id, role, name, username } = result.data
          commit('SET_CURRENT_USER', { id, role, name, username })
          resolve(result)
        })
        .catch(error => {
          commit('toast/NEW', { type: 'error', message: error.message }, { root: true })
          reject(error.message)
        })
    })
  },

  logout ({commit}) {
    return new Promise((resolve, reject) => {
      AuthService.makeLogout()
        .catch(error => {
          commit('toast/NEW', { type: 'error', message: error.message }, { root: true })
        })
    })
  }
}
