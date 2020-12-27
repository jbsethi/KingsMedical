/* eslint-disable no-unused-vars */
import { OrdersService } from '@/services/orders.service'

export default {
  storeOrder ({ commit }, payload) {
    const orderData = {
      patientEmiratesId: payload.emiratesId,
      patientName: payload.patientName,
      patientGender: payload.gender,
      patientContact: '0123456789',
      sendDate: new Date(payload.sendDate),
      returnDate: new Date(payload.returnDate),
      notes: payload.note,
      urgent: false,
      labId: payload.lab,
      shadeId: '1',
      parentId: null
    }

    const OrderTeethRecords = payload.orders.reduce((teeths, data) => {
      const insertTeeths = []
      data.teeths.forEach(teeth => {
        const teethIdx = teeths.findIndex(teethItem => teethItem.toothId === teeth.id)
        if (teethIdx >= 0) {
          teeths[teethIdx].serviceIds.push(data.service.id)
          if (!teeths[teethIdx].ponticDesignIds.includes(data.pointicDesign.id)) {
            teeths[teethIdx].ponticDesignIds.push(data.pointicDesign.id)
          }
        } else {
          insertTeeths.push(teeth)
        }
      })

      const teethMap = insertTeeths.map(tooth => {
        const temp = {
          toothId: tooth.id,
          serviceIds: [],
          ponticDesignIds: []
        }
        temp.serviceIds.push(data.service.id)
        temp.ponticDesignIds.push(data.pointicDesign.id)

        return temp
      })

      teeths = teeths.concat(teethMap)
      return teeths
    }, [])

    orderData.tooths = OrderTeethRecords

    return new Promise((resolve, reject) => {
      OrdersService.create(orderData)
        .then(result => {
          commit('CREATE_RECORD', result.data)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getAllOrders ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      OrdersService.getList()
        .then(result => {
          commit('ADD_RECORDS', result.data.content)
          commit('ADD_META', result.data.meta)
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getOrderDetails ({commit}, payload) {
    return new Promise((resolve, reject) => {
      OrdersService.getById(payload)
        .then(result => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}