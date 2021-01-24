import { BaseService } from './base.service'
import { ErrorWrapper, ResponseWrapper } from './util'

export class LabsService extends BaseService {
  static get entity () {
    return 'labs'
  }

  static async loadEveryLab () {
    try {
      const response = await this.request({ auth: true }).get(`${this.entity}/all/records`)
      
      const data = {
        content: response.data
      }

      return new ResponseWrapper(response, data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }

  static async getAllLabServices (payload) {
    try {
      const response = await this.request({ auth: true }).get(`${this.entity}/services/${payload}/all`)
      
      const data = {
        content: response.data
      }

      return new ResponseWrapper(response, data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async addService (payload) {
    try {
      const response = await this.request({ auth: true }).post(`${this.entity}/services`, payload)
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async removeLabService (payload) {
    try {
      const response = await this.request({ auth: true }).delete(`${this.entity}/services/${payload}`)
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async updateStatusLabService (payload) {
    try {
      const response = await this.request({ auth: true }).put(`${this.entity}/services/${payload.id}`, payload.data)
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }

  static async getEveryServicebyServiceTypeAndLab (payload) {
    try {
      const response = await this.request({ auth: true }).post(`${this.entity}/type/services`, payload)
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}
