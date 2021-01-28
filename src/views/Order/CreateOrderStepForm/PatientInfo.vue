<template>
  <div class="patient-info">
    <div class="row">
      <div class="col-md-12">
        <base-input class="mb-3" :value="patientInfo.emiratesId" @input="updatePatientInfo('emiratesId', $event)" label="Emirates Id" placeholder="Emirates ID"></base-input>
      </div>
      <div class="col-md-12">
        <base-input class="mb-3" :value="patientInfo.name" @input="updatePatientInfo('name', $event)" label="Patient Name" placeholder="Patient Name"></base-input>
      </div>
      <div class="col-md-6">
        <base-input class="mb-3" :value="patientInfo.age" @input="updatePatientInfo('age', $event)" label="Age" type="number"></base-input>
      </div>
      <div class="col-md-6">
        <div class="form-group mb-3 has-label">
          <label class="form-control-label">Gender</label>
          <Select required
                  :clearable="false"
                  placeholder="Gender"
                  :options="[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]"
                  :value="patientInfo.gender"
                  @input="updatePatientInfo('gender', $event)"
                  :reduce="(option) => option.value"
                  label="label">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!patientInfo.gender"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </Select>
        </div>
      </div>
      <div class="col-md-12">
        <div class="form-group mb-3 has-label">
          <label class="form-control-label">Lab</label>
          <Select required
                  :clearable="false"
                  placeholder="Labs"
                  class="lab--select"
                  :options="labs"
                  :value="patientInfo.labId"
                  @input="updatePatientInfo('labId', $event)"
                  :reduce="(option) => option.id"
                  label="name">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!patientInfo.labId"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </Select>
        </div>
      </div>
      <div class="col-md-6">
        <base-input class="mb-3" :value="patientInfo.sendDate" @input="updatePatientInfo('sendDate', $event)" label="Send Date" type="date"></base-input>
      </div>
      <div class="col-md-6">
        <base-input class="mb-3" :value="patientInfo.returnDate" @input="updatePatientInfo('returnDate', $event)" label="Return Date" type="date"></base-input>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PatientInformation',
  props: {
    patientInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      labs: []
    }
  },
  components: {
    Select: () => import('vue-select')
  },
  methods: {
    updatePatientInfo (key, value) {
      this.$emit('update:patientInfo', [key, value])
    },
    ...mapActions('labs', [
      'getAllActiveLab'
    ])
  },
  mounted () {
    this.getAllActiveLab()
      .then(resp => {
        this.labs = resp?.data?.content || []
      })
  }
}
</script>

<style lang="scss">
.patient-info {
  .form-control-label {
    margin-bottom: 0.25em;
    padding-left: 1px;
  }
  .form-control {
    height: calc(1em + 1.2rem + 2px);
  }
}
</style>
