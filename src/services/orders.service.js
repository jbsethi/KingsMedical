import { BaseService } from './base.service'
import { ErrorWrapper, ResponseWrapper } from './util'

export class OrdersService extends BaseService {
  static get entity () {
    return 'orders'
  }

  static async validateHistory (payload) {
    try {
      const response = await this.request({ auth: true }).post(`${this.entity}/status`, payload)
      
      const data = {
        content: response.data
      }

      return new ResponseWrapper(response, data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}
