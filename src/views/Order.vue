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
      <template>
        <CreateOrderForm />
      </template>
    </CreateOrderModal>
  </div>
</template>
<script>
import OrdersTable from './Order/OrdersTable'
export default {
  components: {
    OrdersTable,
    CreateOrderForm: () => import('./Order/CreateOrderForm'),
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
    max-width: 1600px;
  }
</style>
