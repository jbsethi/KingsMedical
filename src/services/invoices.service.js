import { BaseService } from './base.service'
import { ErrorWrapper, ResponseWrapper } from './util'

export class InvoicesService extends BaseService {
  static get entity () {
    return 'invoices'
  }

  static async uploadInvoice (data) {
    try {
      const response = await this.request({ auth: true }).post(`${this.entity}`, data)
      return new ResponseWrapper(response, response.data)
    } catch (error) {
      throw new ErrorWrapper(error)
    }
  }
}
