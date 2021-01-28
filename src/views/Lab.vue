<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <labs-table
                      @create:lab="toggleCreateLabModal(true)"
                      @create:labService="toggleCreateLabServiceModal(true)"
                      @edit:lab="editLab"
                      @click:viewServices="viewServices"
                      title="Labs Record"
                      :pageNo="pageNo"
                      :meta="labMeta"
                      :tableData="labs">
                    </labs-table>
                </div>
            </div>
        </div>
        <Modal :show="createLabModal" @close="toggleCreateLabModal(false)">
          <template slot="header">
            Create Lab
          </template>
          <template>
            <form role="form">
              <base-input alternative
                          class="mb-3"
                          placeholder="Name"
                          v-model="lab.name"
                          addon-left-icon="ni ni-shop">
              </base-input>
              <base-input alternative
                          class="mb-3"
                          placeholder="Location"
                          v-model="lab.location"
                          addon-left-icon="ni ni-world-2">
              </base-input>
              <textarea class="form-control form-control-alternative"
                        rows="3"
                        placeholder="Description ..."
                        v-model="lab.description">
              </textarea>
              <div class="d-flex align-items-center mt-3">
                <base-switch class="mb-0 mr-2" v-model="lab.active"></base-switch> <span>Active</span>
              </div>
              <div class="text-center">
                  <base-button @click="createLab" type="primary" class="my-4">
                    <template v-if="!createLoading">
                      {{ lab.id ? 'Update Lab' : 'Create Lab' }}
                    </template>
                    <template v-else>
                      Loading ...
                    </template>
                  </base-button>
              </div>
          </form>
          </template>
        </Modal>

        <Modal :show="createLabServiceModal" @close="toggleCreateLabServiceModal(false)">
          <template slot="header">
            Add Service in lab
          </template>
          <template>
            <form role="form">
              <div class="form-group mb-3 has-label">
                <label class="form-control-label">Lab</label>
                <Select required
                        :clearable="false"
                        placeholder="Labs"
                        class="lab--select"
                        :options="allLabs"
                        v-model="labService.labId"
                        :reduce="(option) => option.id"
                        label="name">
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!labService.labId"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </Select>
              </div>

              <div class="form-group mb-3 has-label">
                <label class="form-control-label">Service</label>
                <Select required
                        :clearable="false"
                        placeholder="Service"
                        class="service--select"
                        :options="allServices"
                        v-model="labService.serviceId"
                        :reduce="(option) => option.id"
                        label="name">
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!labService.serviceId"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </Select>
              </div>

              <base-input alternative
                          class="mb-3"
                          label="Price"
                          placeholder="Price"
                          v-model="labService.price">
              </base-input>
              <div class="d-flex align-items-center mt-3">
                <base-switch class="mb-0 mr-2" v-model="labService.active"></base-switch> <span>Active</span>
              </div>
              <div class="text-center">
                  <base-button @click="addServiceToLab" type="primary" class="my-4">
                    <template v-if="!addServiceLoading">
                      Add Service
                    </template>
                    <template v-else>
                      Loading ...
                    </template>
                  </base-button>
              </div>
          </form>
          </template>
        </Modal>

        <Modal :show="showLabServices" @close="toggleShowLabServicesModal(false)">
          <template slot="header">
            Lab Services
          </template>
          <template>
            <table class="service-list-table table">
              <thead>
                <th>Service</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </thead>
              <tbody v-if="labServices.length > 0">
                <tr v-for="ls in labServices" :key="ls.id">
                  <td>{{ ls.Service.name }}</td>
                  <td>{{ ls.price }}</td>
                  <td>
                    <button @click="updateLabServiceStatus(ls, false)" v-if="ls.active" class="btn-info">Active</button>
                    <button @click="updateLabServiceStatus(ls, true)" v-else class="btn-warning">Inactive</button>
                  </td>
                  <td>
                    <button v-if="['Super Administrator'].includes(role || null)" @click="removeItem(ls)" class="btn-danger">Remove</button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3">
                    No records exisit !
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </Modal>
    </div>
</template>
<script>
import * as _ from 'lodash'
import LabsTable from './Lab/LabsTable'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    LabsTable,
    Select: () => import('vue-select'),
    Modal: () => import('./../components/Modal')
  },
  data() {
    return {
      createLabModal: false,
      showLabServices: false,

      allLabs: [],
      allServices: [],
      labServices: [],
      
      createLabServiceModal: false,

      createLoading: false,
      addServiceLoading: false,

      pageNo: 1,
      lab: {
        id: null,
        title: '',
        location: '',
        description: '',
        active: false
      },

      labService: {
        labId: '',
        serviceId: '',
        price: '',
        active: false
      }
    }
  },
  computed: {
    ...mapState({
      labs: state => state.labs.labs,
      labMeta : state => state.labs.meta,
      role: state => state.user?.currentUser?.role?.name || null
    })
  },
  methods: {
    removeItem (labService) {
      console.log(labService)
      this.removeLabService(labService.id)
        .then(() => {
          this.labServices = this.labServices.filter(service => service.id !== labService.id)
        })
        .catch(err => {
          console.log(err)
          this.$notify('Couldn\'t Remove try again later')
        })
    },

    updateLabServiceStatus (labService, status) {
      if (['Super Administrator'].includes(this.role || null)) {
        const { labId, serviceId, active, price } = { ...labService, active: status}

        this.updateStatusLabService({ id: labService.id, data: { labId, serviceId, active, price } })
          .then(() => {
            this.labServices = this.labServices.map(service => {
              if (service.id == labService.id) {
                service.active = status
              }

              return service
            })
          })
          .catch(err => {
            console.log(err)
            this.$notify('Couldn\'t update try again later')
          })
      }
    },

    viewServices (labId) {
      this.getAllLabServices(labId)
        .then(resp => {
          this.labServices = resp.data.content.rows
          this.showLabServices = true
        })
    },

    initLabsAndServices (status) {
      if (status) {
        this.loadEveryLab()
          .then(resp => {
            this.allLabs = resp.data.content
          })

        this.getAllServicesRecords()
          .then(resp => {
            this.allServices = resp.data.content
          })
      }
    },

    toggleShowLabServicesModal (status) {
      this.showLabServices = status
    },

    toggleCreateLabModal (status) {
      this.createLabModal = status
    },

    toggleCreateLabServiceModal (status) {
      this.createLabServiceModal = status
    },

    resetForm () {
      this.lab = {
        id: null,
        name: '',
        location: '',
        description: '',
        active: false
      }
    },

    resetServiceForm () {
      this.lab = {
        labId: null,
        serviceId: null,
        price: '',
        active: false
      }
    },

    editLab (labId) {
      const labIdx = _.findIndex(this.labs, ['id', labId])

      if (labIdx >= 0) {
        this.lab = _.cloneDeep(this.labs[labIdx])
      }

      this.toggleCreateLabModal(true)
    },

    createLab () {
      if (!this.createLoading) {
        this.createLoading = true

        const lab = this.lab
        lab.image = null

        console.log(this.lab)

        this.storeLab({lab, labId: this.lab.id})
          .then(() => {
            this.toggleCreateLabModal(false)
            this.resetForm()
          })
          .catch(error => {
            console.log(error)
          })
          .finally(this.createLoading = false)
      }
    },

    addServiceToLab () {
      if (!this.addServiceLoading) {
        this.addServiceLoading = true

        this.addService(this.labService)
          .then(() => {
            this.toggleCreateLabServiceModal(false)
            this.resetServiceForm()
          })
          .catch(error => {
            console.log(error)
          })
          .finally(this.addServiceLoading = false)
      }
    },

    ...mapActions('labs', [
      'getAllLabs',
      'loadEveryLab',
      'getAllLabServices',
      'storeLab',
      'addService',
      'removeLabService',
      'updateStatusLabService'
    ]),

    ...mapActions('services', [
      'getAllServicesRecords',
    ])
  },
  mounted () {
    if (this.$route.query.pageNo && Number.isInteger(this.$route.query.pageNo) && this.$route.query.pageNo > 0) {
      this.getAllLabs({ pageNo: this.$route.query.pageNo })
      this.pageNo = this.$route.query.pageNo
    }

    this.getAllLabs()
  },
  watch: {
    '$route.query': {
      deep: true,
      handler (query) {
        if (query.pageNo && Number.isInteger(query.pageNo) && query.pageNo > 0) {
          this.getAllLabs({ pageNo: query.pageNo })
          this.pageNo = query.pageNo
        }
      }
    },
    'createLabServiceModal': {
      handler: 'initLabsAndServices'
    }
  }
}
</script>
<style scoped lang="scss">
.service-list-table {
  width: 100%;
}
</style>
