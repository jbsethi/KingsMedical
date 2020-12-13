<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
        <div class="row">
            <div class="col">
                <service-types-table
                  @create:ServiceType="toggleCreateServiceTypeModal(true)"
                  @edit:serviceType="editServiceType"
                  title="Service Types Record"
                  :meta="serviceTypeMeta"
                  :tableData="serviceTypes"
                ></service-types-table>
            </div>
        </div>
    </div>
    <CreateServiceTypeModal :show="createServiceTypeModal" @close="toggleCreateServiceTypeModal(false)">
      <template slot="header">
        {{ serviceType.id ? 'Update Service Type' : 'Create Service Type' }}
      </template>
      <template>
        <form role="form">
          <base-input alternative
                      class="mb-3"
                      placeholder="Name"
                      v-model="serviceType.name"
                      addon-left-icon="ni ni-shop">
          </base-input>
          <div class="d-flex align-items-center mt-3">
            <base-switch class="mb-0 mr-2" v-model="serviceType.active"></base-switch> <span>Active</span>
          </div>
          <div class="text-center">
              <base-button @click="createServiceType" type="primary" class="my-4">
                <template v-if="!createLoading">
                  {{ serviceType.id ? 'Update Service Type' : 'Create Service Type' }}
                </template>
                <template v-else>
                  Loading ...
                </template>
              </base-button>
          </div>
      </form>
      </template>
    </CreateServiceTypeModal>
  </div>
</template>
<script>
import * as _ from 'lodash'
import { mapActions, mapState } from 'vuex'
import ServiceTypesTable from './ServiceType/ServiceTypesTable'
export default {
  components: {
    ServiceTypesTable,
    CreateServiceTypeModal: () => import('./../components/Modal')
  },
  data() {
    return {
      createLoading: false,
      createServiceTypeModal: false,
      serviceType: {}
    }
  },
  computed: {
    ...mapState({
      serviceTypes: state => state.serviceTypes.serviceTypes,
      serviceTypeMeta : state => state.serviceTypes.meta,
    })
  },
  methods: {
    toggleCreateServiceTypeModal (status) {
      this.createServiceTypeModal = status
    },

    resetForm () {
      this.serviceType = {
        id: null,
        active: false
      }
    },

    editServiceType (serviceTypeId) {
      const serviceTypeIdx = _.findIndex(this.serviceTypes, ['id', serviceTypeId])

      if (serviceTypeIdx >= 0) {
        this.serviceType = _.cloneDeep(this.serviceTypes[serviceTypeIdx])
      }

      this.toggleCreateServiceTypeModal(true)
    },

    createServiceType () {
      if (!this.createLoading) {
        this.createLoading = true

        const serviceType = this.serviceType
        serviceType.image = null

        this.storeServiceType({serviceType, serviceTypeId: this.serviceType.id})
          .then(() => {
            this.toggleCreateServiceTypeModal(false)
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
      'storeServiceType'
    ])
  },
  mounted () {
    if (this.$route.query.pageNo && Number.isInteger(this.$route.query.pageNo) && this.$route.query.pageNo > 0) {
      this.getAllServiceTypes({ pageNo: this.$route.query.pageNo })
      this.pageNo = this.$route.query.pageNo
    }

    this.getAllServiceTypes()
  },
  watch: {
    '$route.query': {
      deep: true,
      handler (query) {
        if (query.pageNo && Number.isInteger(query.pageNo) && query.pageNo > 0) {
          this.getAllServiceTypes({ pageNo: query.pageNo })
          this.pageNo = query.pageNo
        }
      }
    }
  }
}
</script>
<style></style>
