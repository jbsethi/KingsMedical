<template>
  <Modal :show="showCreateModal">
    <section>
      <section class="header">
        <h3 class="header__title">Create Order</h3>
        <p class="header__step-info">Step : <span>{{ currentStep }}</span> / {{ totalSteps }}</p>
        <div class="header__step-bar">
          <div :style="{ width: barProgress }"></div>
        </div>
      </section>

      <section class="py-4">
        <keep-alive>
          <component
            :is="stepComponent"
            :patientInfo="patientInfo"
            :serviceSelection="serviceSelection"
            :teethSelection="teethSelection"
            @validateHistory="validateToothHistory"
            @removeFromHistory="removeToothHistory"
            @update:patientInfo="updatePatientInfo"
            @update:serviceSelection="updateServiceSelection"
            @update:teethSelection="updateTeethSelection"
            @updateNotes="updateNotes"
            @updateUrgentStatus="updateUrgentStatus"
          ></component>
        </keep-alive>
      </section>

      <section v-if="history.length > 0 && currentStep == 3" class="row">
        <div class="col-md-12 pt-5">
          <p>The Patient has History for same service on teeth below :</p>
          <div :class="((+index + 1) < history.length) ? 'list--bottom pb-2' : 'mt-3'" v-for="(tooth, index) in history" :key="tooth.toothId">
            <div class="d-flex">
              <span class="bullet"></span>
            </div>
            <div class="d-flex">
              <div class="mr-2">Tooth no </div>
              <div><strong>{{tooth.toothId}}</strong></div>
            </div>
            <div class="d-flex">
              <div class="mr-2 mt-2">Send Date</div>
              <div class=" mt-2"><strong>{{ getDate(tooth.data[0].sentDate || tooth.data[0].updatedAt) }}</strong></div>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-1">
              <div class="d-flex align-items-center justify-content-center">
                <base-switch class="mb-0 mr-2" v-model="toothsChargeStatuses[tooth.toothId]"></base-switch> <span>Charge ?</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <template slot="footer">
      <section class="d-flex justify-content-between w-100">
        <section>
          <base-button @click="close" class="btn-small" type="danger">Close</base-button>
        </section>
        <section>
          <base-button v-if="currentStep != 1" @click="move('back')" class="btn-small" type="secondary">Back</base-button>
          <base-button v-if="currentStep != totalSteps" @click="move('next')" class="btn-small" type="primary">Next</base-button>
          <!-- <base-button v-if="currentStep == totalSteps" @click="confirmCreate(true)" class="btn-small" type="primary">Create and add Another</base-button> -->
          <base-button v-if="currentStep == totalSteps" @click="confirmCreate(false)" class="btn-small" type="primary">Create and Close</base-button>
        </section>
      </section>
    </template>
  </Modal>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CreateOrderStepForm',
  props: {
    showCreateModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentStep: 1,
      totalSteps: 4,

      patientInfo: {
        emiratesId: '',
        name: '',
        age: '',
        gender: '',
        labId: '',
        sendDate: null,
        returnDate: null
      },

      serviceSelection: {
        service: ''
      },

      teethSelection: {
        teeths: [],
        pointicDesign: '',
        shade: ''
      },

      history: [],
      toothsChargeStatuses: {},

      notes: '',
      urgent: false
    }
  },
  computed: {
    isPatientInfoValid () {
      if (this.patientInfo.emiratesId == '') return false
      if (this.patientInfo.name == '') return false
      if (this.patientInfo.labId == '') return false
      if (this.patientInfo.sendDate == '') return false
      return true
    },

    isServiceSelectionValid () {
      if (this.serviceSelection.service == '') return false
      return true
    },

    isTeethSelectionValid () {
      if (this.teethSelection.pointicDesign == '') return false
      if (this.teethSelection.shade == '') return false
      return true
    },

    stepComponent () {
      switch (this.currentStep) {
        case 2:
          return () => import('./CreateOrderStepForm/ServiceSelection.vue')
        case 3:
          return () => import('./CreateOrderStepForm/TeethSelection.vue')
        case 4:
          return () => import('./CreateOrderStepForm/OrderOverview.vue')
        default:
          return () => import('./CreateOrderStepForm/PatientInfo.vue')
      }
    },
    barProgress () {
      return ((100 / this.totalSteps + 1) * (this.currentStep)) + '%'
    }
  },
  methods: {
    getDate (date) {
      const dayFormat =  new Date(date)
      return `${dayFormat.getDay()}-${+dayFormat.getMonth() + 1}-${dayFormat.getFullYear()}`
    },

    updateNotes (notes) {
      this.notes = notes
    },

    updateUrgentStatus (status) {
      this.urgent = status
    },

    validateToothHistory (toothId) {
      const data = {
        toothId,
        patientEmiratesId: this.patientInfo.emiratesId,
        labServiceId: this.serviceSelection.service
      }

      this.validateHistory(data)
        .then(resp => {
          this.history.push({ toothId, data: resp.data.content })
        })
    },

    removeToothHistory (toothId) {
      this.history = this.history.filter(teeth => teeth.toothId !== toothId)
    },

    confirmCreate (addMore = false) {
      const formData = {
        patientEmiratesId: this.patientInfo.emiratesId,
        patientName: this.patientInfo.name,
        patientGender: this.patientInfo.gender,
        patientContact: '090078601',
        sentDate: this.patientInfo.sendDate,
        returnDate: this.patientInfo.returnDate,
        notes: this.notes,
        urgent: this.urgent,
        labId: this.patientInfo.labId,
        shadeId: this.teethSelection.shade,
        tooths: [],
        parentId: null
      }

      formData.tooths = this.teethSelection.teeths.map(tooth => {
        return {
          toothId: tooth,
          serviceIds: [this.serviceSelection.service],
          ponticDesignIds: [this.teethSelection.pointicDesign],
          charge: (this.toothsChargeStatuses[tooth] !== undefined) ? this.toothsChargeStatuses[tooth] : true
        }
      })

      this.storeOrder(formData)
        .then(() => {
          this.serviceSelection = {
            serviceType: '',
            service: ''
          },

          this.teethSelection = {
            teeths: [],
            pointicDesign: '',
            shade: ''
          }
          
          if (addMore) {
            this.currentStep = 1
          } else {
            this.close()
          }
        })
        .catch((err) => {
          this.$notify('Error occured: ' + err.message)
        })
    },

    close () {
      this.$emit('click:close')
      this.resetFormData()
    },

    move (dir) {
      if (dir == 'next') {
        console.log('next')
        if (this.currentStep < this.totalSteps) {
          if (this.currentStep == 1 && this.isPatientInfoValid) {
            this.currentStep += 1
          } else if (this.currentStep == 2 && this.isServiceSelectionValid) {
            this.currentStep += 1
          } else if (this.currentStep == 3 && this.isTeethSelectionValid) {
            this.currentStep += 1
          }
        }
      } else if (dir == 'back') {
        if (this.currentStep > 1)
        this.currentStep -= 1
      }
    },

    resetFormData () {
      this.currentStep = 1

      this.patientInfo = {
        emiratesId: '',
        name: '',
        age: '',
        gender: '',
        labId: '',
        sendDate: null,
        returnDate: null
      },

      this.serviceSelection = {
        serviceType: '',
        service: ''
      },

      this.teethSelection = {
        teeths: [],
        pointicDesign: '',
        shade: ''
      }
    },

    updatePatientInfo (patientInfo) {
      this.patientInfo[patientInfo[0]] = patientInfo[1]
    },

    updateServiceSelection (serviceSelection) {
      this.serviceSelection[serviceSelection[0]] = serviceSelection[1]
    },

    updateTeethSelection (teethSelection) {
      this.teethSelection[teethSelection[0]] = teethSelection[1]
    },

    ...mapActions('orders', [
      'storeOrder',
      'validateHistory'
    ])
  },
  components: {
    Modal: () => import('./../../components/Modal')
  },
}
</script>

<style lang="scss" scoped>
.header{
  &__title {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.125em;
    color: #1D273E;
    margin-bottom: 0;
  }
  &__step-info {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1em;
    color: #1D273E;
    margin-bottom: 0;
    span {
      font-size: 1.25em;
      font-weight: 500;
    }
  }
  &__step-bar{
    margin: 5px 0px;
    width: 100%;
    height: 5px;
    background-color: #eee;
    border-radius: 10px;
    div {
      height: 5px;
      width: 0px;
      transition: width 0.5s;
      background-color: #5e72e4;
    }
  }
  hr {
    margin: 5px 0px;
  }
}

.list--bottom {
  border-bottom: 1px solid black;
}
</style>
