<template>
  <div class="service-selection">
    <div class="row">
      <div class="col-md-12">
        <div class="form-group mb-3 has-label">
          <label class="form-control-label">Service Type</label>
          <Select required
                  :clearable="false"
                  placeholder="Service Type"
                  class="service-type--select"
                  :options="serviceTypes"
                  :value="serviceSelection.serviceType"
                  @input="updateServiceSelection('serviceType', $event)"
                  @change="updateServices"
                  :reduce="(option) => option.id"
                  label="name">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!serviceSelection.serviceType"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </Select>
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group mb-3 has-label">
          <label class="form-control-label">Service</label>
          <Select required
                  :clearable="false"
                  placeholder="Service"
                  class="service--select"
                  :options="services"
                  :value="serviceSelection.service"
                  @input="updateServiceSelection('service', $event)"
                  :reduce="(option) => option.id"
                  label="name">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!serviceSelection.service"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </Select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ServiceSelection',
  props: {
    serviceSelection: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      serviceTypes: [],
      services: []
    }
  },
  components: {
    Select: () => import('vue-select')
  },
  methods: {
    updateServices (newServiceType, oldServiceType) {
      if (newServiceType !== oldServiceType) {
        this.getEveryServicebyServiceType(newServiceType)
          .then(resp => {
            this.updateServiceSelection('service', null)
            this.services = resp?.data?.content || []
          })
      }
    },

    updateServiceSelection (key, value) {
      this.$emit('update:serviceSelection', [key, value])
    },

    ...mapActions('serviceTypes', [
      'getEveryServiceTypes',
      'getEveryServicebyServiceType'
    ])
  },
  watch: {
    'serviceSelection.serviceType': {
      deep: true,
      handler: 'updateServices'
    }
  },
  mounted () {
    this.getEveryServiceTypes()
      .then(resp => {
        this.serviceTypes = resp?.data?.content || []
      })
  }
}
</script>
