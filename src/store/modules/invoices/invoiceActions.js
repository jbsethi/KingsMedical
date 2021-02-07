/* eslint-disable no-unused-vars */
import { InvoicesService } from '@/services/invoices.service'

export default {
  totalInvoices () {
    return new Promise((resolve, reject) => {
      InvoicesService.getList()
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  
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

  getOrderInvoice (context, payload) {
    return new Promise((resolve, reject) => {
      InvoicesService.getOrderInvoice(payload)
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}