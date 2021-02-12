<template>
  <div class="patient-info">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group">
          <label>
            <input type="checkbox" name="urgent" @input="updateUrgent"/>
            Urgent ?
          </label>
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group">
          <label>Order Notes</label>
          <textarea style="height: 5em" class="form-control" @input="updateNotes"></textarea>
        </div>
      </div>
    </div><hr/>
    <div class="row">
      <div class="col-md-12">
          <p class="text-center">Confirm order ?</p>
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
    updateNotes (e) {
      console.log(e.target.value)
      this.$emit('updateNotes', e.target.value)
    },
    updateUrgent (e) {
      console.log(e.target.checked)
      this.$emit('updateUrgentStatus', e.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 0;
  label {
    margin-bottom: 0;
  }
}
</style>
