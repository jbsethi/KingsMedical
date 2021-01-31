import { BaseService } from './base.service'
import { ErrorWrapper, ResponseWrapper } from './util'

export class UsersService extends BaseService {
  static get entity () {
    return 'users'
  }

  static async getCurrent () {
    try {
      const response = await this.request({ auth: true }).get(`${this.entity}/current`)
      return new ResponseWrapper(response, response.data.data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static async resetUserPassword (payload) {
    try {
      const response = await this.request({ auth: true }).post(`${this.entity}/password-reset/${payload.userId}`, payload.data)
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}
