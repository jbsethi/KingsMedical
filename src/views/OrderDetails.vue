<template>
  <CreateOrderForm class="printView" :orderDetails="order" />
</template>

<script>
import { mapActions } from 'vuex'
import CreateOrderForm from './Order/CreateOrderForm'
export default {
  data () {
    return {
      order: {}
    }
  },
  components: {
    CreateOrderForm
  },
  methods: {
    ...mapActions('orders', [
      'getOrderDetails'
    ])
  },
  mounted () {
    const orderId = this.$route.params.id
    this.getOrderDetails(orderId).then((result) => {
      this.order = result.data;
    });
  }
}
</script>

<style lang="scss" scoped>
.printView {
  padding: 30px;
}
</style>
