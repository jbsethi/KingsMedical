import { BaseService } from './base.service'

export class OrdersService extends BaseService {
  static get entity () {
    return 'orders'
  }
}
