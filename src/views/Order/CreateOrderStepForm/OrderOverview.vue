<template>
  <div class="patient-info">
    <div class="row">
      <div class="col-md-12">
          <p class="text-center">Confirm order or add another service.</p>
          <p class="text-center mt-5 mb-0"><base-button size="sm" type="primary">Add Another Service</base-button></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderOverview',
  props: {
  },
  components: {
    // Select: () => import('vue-select')
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
