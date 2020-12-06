<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <services-table
                      @create:service="toggleCreateServiceModal(true)"
                      @edit:service="editService"
                      title="Services Record"
                      :tableData="services">
                    </services-table>
                </div>
            </div>
        </div>
        
        <CreateServiceModal :show="createServiceModal" @close="toggleCreateServiceModal(false)">
          <template slot="header">
            {{ service.id ? 'Update Service' : 'Create Service' }}
          </template>
          <template>
            <form role="form">
              <div class="form-group mb-3 has-label">
                <label class="form-control-label">Service Type</label>
                <Select required
                        :clearable="false"
                        placeholder="Service Type"
                        class="service-type--select"
                        :options="serviceTypes"
                        v-model="service.serviceType"
                        :reduce="(type) => type.id"
                        label="name">
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!service.serviceType"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </Select>
              </div>
              <base-input alternative
                          class="mb-3"
                          label="Name"
                          placeholder="Name"
                          v-model="service.name">
              </base-input>
              <base-input alternative
                          class="mb-3"
                          label="Replacement ( In Days )"
                          placeholder="Replacement Interval"
                          v-model="service.replaceInterval">
              </base-input>
              <base-input alternative
                          class="mb-3"
                          label="Price"
                          placeholder="Price"
                          v-model="service.price">
              </base-input>
              <div class="form-group">
                <label class="form-control-label">Description</label>
                <textarea class="form-control form-control-alternative mb-3"
                          label="Description"
                          rows="3"
                          placeholder="Description ..."
                          v-model="service.description">
                </textarea>
              </div>
              <div class="d-flex align-items-center mt-3">
                <base-switch class="mb-0 mr-2" v-model="service.active"></base-switch> <span>Active</span>
              </div>
              <div class="text-center">
                  <base-button @click="createService" type="primary" class="my-4">
                    <template v-if="!createLoading">
                      {{ service.id ? 'Update Service' : 'Create Service' }}
                    </template>
                    <template v-else>
                      Loading ...
                    </template>
                  </base-button>
              </div>
          </form>
          </template>
        </CreateServiceModal>
    </div>
</template>
<script>
import * as _ from 'lodash'
import { mapActions, mapState } from 'vuex'
import ServicesTable from './Service/ServicesTable'
import 'vue-select/src/scss/vue-select.scss'

export default {
  components: {
    ServicesTable,
    CreateServiceModal: () => import('./../components/Modal'),
    Select: () => import('vue-select')
  },
  data() {
    return {
      createLoading: false,
      createServiceModal: false,
      service: {
        id: null,
        name: '',
        description: '',
        serviceType: '',
        replaceInterval: '',
        price: '',
        active: false
      }
    }
  },
  computed: {
    ...mapState({
      services: state => state.services.services,
      serviceTypes: state => state.serviceTypes.serviceTypes
    })
  },
  methods: {
    toggleCreateServiceModal (status) {
      this.createServiceModal = status
      if (this.createServiceModal && this.serviceTypes.length === 0) this.getAllServiceTypes()
    },

    resetForm () {
      this.service = {
        id: null,
        name: '',
        description: '',
        serviceType: '',
        replaceInterval: '',
        price: '',
        active: false
      }
    },

    editService (serviceId) {
      const serviceIdx = _.findIndex(this.services, ['id', serviceId])

      if (serviceIdx >= 0) {
        this.service = _.cloneDeep(this.services[serviceIdx])
      }

      this.toggleCreateServiceModal(true)
    },

    createService () {
      if (!this.createLoading) {
        this.createLoading = true

        const service = this.service
        service.image = null

        this.storeService({service, serviceId: this.service.id})
          .then(() => {
            this.toggleCreateServiceModal(false)
            this.resetForm()
          })
          .catch(error => {
            this.$notify(error)
          })
          .finally(this.createLoading = false)
      }
    },
    ...mapActions('serviceTypes', [
      'getAllServiceTypes',
    ]),
    ...mapActions('services', [
      'getAllServices',
      'storeService'
    ])
  },
  mounted () {
    this.getAllServices()
  }
}
</script>

<style>

.service-type--select .vs__search::placeholder,
.service-type--select .vs__dropdown-toggle,
.service-type--select .vs__dropdown-menu {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #8898aa;
  text-transform: capitalize;
}

.service-type--select .vs__dropdown-toggle {
  height: calc(1.5em + 1.25rem + 2px);
  border: 1px solid #cad1d7;
}

.service-type--select .vs__dropdown-menu {
  border: 1px solid #cad1d7;
}

.service-type--select .vs__clear,
.service-type--select .vs__open-indicator {
  fill: #8898aa;
}
</style>
