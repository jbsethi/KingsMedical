import { BaseService } from './base.service'
import { ResponseWrapper, ErrorWrapper } from './util'

export class ServicesService extends BaseService {
  static get entity () {
    return 'services'
  }

  static async getAllList () {
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
}
