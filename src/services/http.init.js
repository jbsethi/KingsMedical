/**
 * HTTP request layer
 * if auth is required return patched axios instance(with access token in headers)
 * else return clear axios instance
 */

import axios from 'axios'

import { AuthService } from '@/services/auth.service'
import { API_URL } from '../.env'

export class Http {
  constructor (status) {
    this.isAuth = status && status.auth ? status.auth : false
    this.instance = axios.create({
      baseURL: API_URL
    })

    return this.init()
  }

  init () {
    if (this.isAuth) {
      this.instance.interceptors.request.use(request => {
        request.headers.authorization = AuthService.getBearer()
        // if access token expired and refreshToken is exist >> Logout
        if (AuthService.isAccessTokenExpired() && AuthService.hasRefreshToken()) {
          AuthService.makeLogout()
        } else {
          return request
        }
      }, error => {
        return Promise.reject(error)
      })
    }

    return this.instance
  }
}
