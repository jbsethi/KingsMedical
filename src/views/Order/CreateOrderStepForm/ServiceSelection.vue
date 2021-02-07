<template>
  <div class="service-selection">
    <div class="row">
      <div class="col-md-12">
        <div class="service-types">
          <div v-for="t in serviceTypes" :key="t.id" class="service-types__type">
            <div class="service-types__heading">
              {{t.name}}
            </div>
            <div class="service-types__services">
              <div>
                <p v-for="s in getServicesbyType(t.id)" :key="s.id">
                  <input class="serviceRadio" @input="updateServiceSelection(s.id, $event)" type="radio" name="serviceSelect" :id="s.id" :value="s.id">
                  <label class="service-label" :for="s.id">{{s.name}}</label>
                </p>
                <small v-if="getServicesbyType(t.id).length == 0">
                  <em>No service for type</em>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-12">
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
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ServiceSelection',
  props: {
    patientInfo: {
      type: Object,
      required: true
    },
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
    // Select: () => import('vue-select')
  },
  methods: {
    // updateServices (newServiceType, oldServiceType) {
    //   if (newServiceType && newServiceType !== oldServiceType) {
    //     const labId = this.patientInfo.labId
    //     this.getEveryServicebyServiceTypeAndLab({ serviceTypeId: newServiceType, labId })
    //       .then(resp => {
    //         this.updateServiceSelection('service', null)
    //         this.services = (resp?.data || []).map(service => {
    //           return {
    //             ...service,
    //             name: service.Service.name
    //           }
    //         })
    //       }).
    //       catch(() => {
    //         this.$notify('Couldn\'t get services try again later')
    //       })
    //   }
    // },

    getServicesbyType (typeId) {
      return this.services.filter(s => {
        if (s.Service.serviceType == typeId) {
          return true
        }

        return false
      })
    },

    updateServiceSelection (serviceId, e) {
      if (e.target.checked) {
        this.$emit('update:serviceSelection', ['service', serviceId])
      }
    },

    ...mapActions('serviceTypes', [
      'getEveryServiceTypes',
    ]),

    ...mapActions('labs', [
      'getEveryServicebyServiceTypeAndLab'
    ])
  },
  mounted () {
    this.getEveryServiceTypes()
      .then(resp => {
        this.serviceTypes = resp?.data?.content || []
        const labId = this.patientInfo.labId
        this.serviceTypes.forEach(t => {
          this.getEveryServicebyServiceTypeAndLab({ serviceTypeId: t.id, labId })
            .then(resp => {
              this.services = this.services.concat((resp?.data || []).map(service => {
                return {
                  ...service,
                  name: service.Service.name
                }
              }))
            }).
            catch(() => {
              this.$notify('Couldn\'t get services try again later')
            })
        })
      })
  },
  watch: {
    serviceSelection: {
      deep: true,
      handler () {
        if (this.serviceSelection.service == '') {
          document.getElementsByClassName('serviceRadio').forEach(el => {
            el.checked = false
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.service-label {
  padding-left: 10px;
}
</style>
