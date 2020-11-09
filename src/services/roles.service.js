import { BaseService } from './base.service'

export class RolesService extends BaseService {
  static get entity () {
    return 'roles'
  }
}
