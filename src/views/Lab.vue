<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <labs-table
                      @create:lab="toggleCreateLabModal(true)"
                      @edit:lab="editLab"
                      title="Labs Record"
                      :tableData="labs">
                    </labs-table>
                </div>
            </div>
        </div>
        <CreateLabModal :show="createLabModal" @close="toggleCreateLabModal(false)">
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
        </CreateLabModal>
    </div>
</template>
<script>
import * as _ from 'lodash'
import LabsTable from './Lab/LabsTable'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    LabsTable,
    CreateLabModal: () => import('./../components/Modal')
  },
  data() {
    return {
      createLabModal: false,
      createLoading: false,
      lab: {
        id: null,
        title: '',
        location: '',
        description: '',
        active: false
      },
    }
  },
  computed: {
    ...mapState({
      labs: state => state.labs.labs
    })
  },
  methods: {
    toggleCreateLabModal (status) {
      this.createLabModal = status
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

    ...mapActions('labs', [
      'getAllLabs',
      'storeLab'
    ])
  },
  mounted () {
    this.getAllLabs()
  }
}
</script>
<style></style>
