/* eslint-disable no-unused-vars */
import { InvoicesService } from '@/services/invoices.service'

export default {
  createInvoice ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      InvoicesService.uploadInvoice(payload)
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}