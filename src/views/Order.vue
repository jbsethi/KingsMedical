<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <orders-table
            @create:order="toggleCreateOrderModal(true)"
            title="Orders Record"
          ></orders-table>
        </div>
      </div>
    </div>

    <CreateOrderModal
      :show="createOrderModal"
      @close="toggleCreateOrderModal(false)"
      modalClasses="modal--max-width"
    >
      <template slot="header">
        Create Order
      </template>
      <template>
        <form role="form">
          <section class="container">
            <section class="row">
              <base-input alternative
                          class="col-sm-4 mb-3"
                          label="Doctor Name"
                          placeholder="Doctor Name"
                          v-model="order.doctorName">
              </base-input>
              <base-input alternative
                          class="col-sm-4 mb-3"
                          label="Patient Name"
                          placeholder="Patient Name"
                          v-model="order.patientName">
              </base-input>
              <base-input alternative
                          class="col-sm-4 mb-3"
                          label="Age"
                          type="number"
                          placeholder="Age"
                          v-model="order.age">
              </base-input>
              <base-input alternative
                          class="col-sm-4 mb-3"
                          label="Clinic"
                          placeholder="Clinic"
                          v-model="order.clinic">
              </base-input>
              <base-input alternative
                          class="col-sm-4 mb-3"
                          label="Sent Date"
                          type="date"
                          placeholder="Sent Date"
                          v-model="order.sentDate">
              </base-input>
              <base-input alternative
                          class="col-sm-4 mb-3"
                          label="Return Date"
                          type="date"
                          placeholder="Return Date"
                          v-model="order.returnDate">
              </base-input>
            </section>
          </section>
        </form>
      </template>
    </CreateOrderModal>
  </div>
</template>
<script>
import OrdersTable from './Order/OrdersTable'
export default {
  components: {
    OrdersTable,
    CreateOrderModal: () => import('./../components/Modal')
  },
  data() {
    return {
      createOrderModal: false,
      order: {
        doctorName: ''
      }
    }
  },
  methods: {
    toggleCreateOrderModal(status) {
      this.createOrderModal = status
    }
  }
}
</script>

<style>
  .modal--max-width {
    max-width: 980px;
  }
</style>
