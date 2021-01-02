import { BaseService } from './base.service'
import { ResponseWrapper, ErrorWrapper } from './util'

export class ServiceTypesService extends BaseService {
  static get entity () {
    return 'serviceTypes'
  }

  static async getServicesByServiceType (payload) {
    try {
      const response = await this.request({ auth: true }).get(`${this.entity}/${payload}/services`)
      
      const data = {
        content: response.data
      }

      return new ResponseWrapper(response, data)
    } catch (error) {
      const message = error.response.data ? error.response.data.error : error.response.statusText
      throw new ErrorWrapper(error, message)
    }
  }
}
