<template>
  <div class="service-selection">
    <div class="row">
      <div class="col-md-12">
        <base-input class="mb-3" :value="patientInfo.emiratesId || ''" label="Emirates Id" placeholder="Emirates ID" disabled></base-input>
        <base-input class="mb-3" :value="patientInfo.name || ''" label="Name" placeholder="Emirates ID" disabled></base-input>
        <base-input class="mb-5" :value="patientInfo.service || ''" label="Service" placeholder="Emirates ID" disabled></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <section class="order__teeths">
          <div
            :style="{
              'background-image':
                'url(' + require('../../assets/Human_dental_arches.png') + ')'
            }"
            class="teeth-mark"
          >
            <div class="teeth__left">
              <div class="teeth__upper-arch">
                <label
                  v-for="tooth in teeths.upperLeft"
                  :key="tooth.id"
                  class="checkbox__container"
                  >{{ tooth.value }}
                  <input
                    name="teeths"
                    type="checkbox"
                    @input="selectTeeth(tooth.id, $event)"
                    :checked="isChecked(tooth.id)"
                    :disabled="isDisabled(tooth.id)"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="teeth__lower-arch">
                <label
                  v-for="tooth in teeths.lowerLeft"
                  :key="tooth.id"
                  class="checkbox__container"
                  >{{ tooth.value }}
                  <input
                    name="teeths"
                    type="checkbox"
                    @input="selectTeeth(tooth.id, $event)"
                    :checked="isChecked(tooth.id)"
                  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="teeth__right">
              <div class="teeth__upper-arch">
                <label
                  v-for="tooth in teeths.upperRight"
                  :key="tooth.id"
                  class="checkbox__container container-rev"
                  >{{ tooth.value }}
                  <input
                    name="teeths"
                    type="checkbox"
                    @input="selectTeeth(tooth.id, $event)"
                    :checked="isChecked(tooth.id)"
                  />
                  <span class="checkmark checkmark--right"></span>
                </label>
              </div>
              <div class="teeth__lower-arch">
                <label
                  v-for="tooth in teeths.lowerRight"
                  :key="tooth.id"
                  class="checkbox__container container-rev"
                  >{{ tooth.value }}
                  <input
                    name="teeths"
                    type="checkbox"
                    @input="selectTeeth(tooth.id, $event)"
                    :checked="isChecked(tooth.id)"
                  />
                  <span class="checkmark checkmark--right"></span>
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <base-button @click="returnOrder" outline type="primary" size="sm">Return Order</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'TeethSelection',
  props: {
    orderID: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      orderData: null,
      selectedTeeths: [],
      orderedTeeths: [],
      patientInfo: {}
    }
  },
  computed: {
    tooths () {
      const tooths = [
        { id: 1, value: '1', type: 'ul' },
        { id: 2, value: '2', type: 'ul'  },
        { id: 3, value: '3', type: 'ul'  },
        { id: 4, value: '4', type: 'ul'  },
        { id: 5, value: '5', type: 'ul'  },
        { id: 6, value: '6', type: 'ul'  },
        { id: 7, value: '7', type: 'ul'  },
        { id: 8, value: '8', type: 'ul'  },
        { id: 9, value: '9', type: 'ur'  },
        { id: 10, value: '10', type: 'ur' },
        { id: 11, value: '11', type: 'ur' },
        { id: 12, value: '12', type: 'ur' },
        { id: 13, value: '13', type: 'ur' },
        { id: 14, value: '14', type: 'ur' },
        { id: 15, value: '15', type: 'ur' },
        { id: 16, value: '16', type: 'ur' },
        { id: 17, value: '17', type: 'll' },
        { id: 18, value: '18', type: 'll' },
        { id: 19, value: '19', type: 'll' },
        { id: 20, value: '20', type: 'll' },
        { id: 21, value: '21', type: 'll' },
        { id: 22, value: '22', type: 'll' },
        { id: 23, value: '23', type: 'll' },
        { id: 24, value: '24', type: 'll' },
        { id: 25, value: '25', type: 'lr' },
        { id: 26, value: '26', type: 'lr' },
        { id: 27, value: '27', type: 'lr' },
        { id: 28, value: '28', type: 'lr' },
        { id: 29, value: '29', type: 'lr' },
        { id: 30, value: '30', type: 'lr' },
        { id: 31, value: '31', type: 'lr' },
        { id: 32, value: '32', type: 'lr' },
      ]

      return tooths
    },
    teeths () {
      
      const teeths = this.tooths.reduce((teethbyType, tooth) => {
        switch (tooth.type) {
          case 'ul':
            teethbyType.upperLeft.push(tooth)
            break
          case 'ur':
            teethbyType.upperRight.push(tooth)
            break
          case 'll':
            teethbyType.lowerLeft.push(tooth)
            break
          case 'lr':
            teethbyType.lowerRight.push(tooth)
            break
        }

        return teethbyType
      }, {
        upperLeft: [],
        upperRight: [],
        lowerLeft: [],
        lowerRight: []
      })

      return teeths
    }
  },
  components: {
  },
  methods: {
    close () {
      this.$emit('click:close')
    },
    
    returnOrder () {
      const data = {
        "patientEmiratesId": this.orderData.patientEmiratesId,
        "patientName":  this.orderData.Patient.name,
        "patientGender":  this.orderData.Patient.gender,
        "patientContact": this.orderData.Patient.contact,
        "sentDate": this.orderData.sentDate,
        "returnDate": this.orderData.returnDate || new Date(),
        "notes": this.orderData.notes,
        "urgent": true,
        "labId": this.orderData.tooths[0].ToothServices[0].LabService.labId,
        "shadeId": 1,
        "parentId": this.orderID
      }


      const tooths = this.selectedTeeths.map(teeth => {
        return {
          toothId: teeth,
          serviceIds: [this.orderData.tooths[0].ToothServices[0].LabService.id],
          ponticDesignIds: [this.orderData.tooths[0].ToothPonticDesign[0].ponticDesignId],
          charge: false
        }
      })

      data.tooths = tooths

      this.storeOrder(data)
        .then(() => {
          this.close()
        })
        .catch((err) => {
          this.$notify('Error occured: ' + err.message)
        })
    },

    markSelectedTeeths (tooths) {
      tooths.forEach(tooth => {
        this.selectedTeeths.push(tooth.toothId)
        this.orderedTeeths.push(tooth.toothId)
      })
    },

    isChecked(toothId) {
      if (this.selectedTeeths.find(teeth => teeth == toothId) != undefined) return true
      return false
    },

    isDisabled(toothId) {
      if (this.orderedTeeths.find(teeth => teeth == toothId) != undefined) return false
      return true
    },

    selectTeeth (toothId, e) {
      if (e.target.checked) {
        this.selectedTeeths.push(toothId)
      } else {
        this.selectedTeeths = this.selectedTeeths.filter(id => id !== toothId)
      }
    },

    ...mapActions('orders', [
      'getOrderDetails',
      'storeOrder'
    ])
  },

  mounted () {
    this.getOrderDetails(this.orderID)
      .then(result => {
        console.log(result)
        this.markSelectedTeeths(result.data.tooths)

        this.patientInfo = {
          emiratesId: result.data.patientEmiratesId,
          name: result.data.Patient.name,
          service: result.data.tooths[0].ToothServices[0].LabService.Service.name,
        }


        this.orderData = result.data
      })
      .catch(error => {
        console.log(error.message)
      })
  },
}
</script>

<style lang="scss" scoped>
@mixin media($min, $max, $type: false) {
  @if $type == true {
    @media only screen and (max-width: #{$max}) and (min-width: #{$min}) {
      @content;
    }
  } @else if $max != null {
    @media only screen and (max-width: $max) {
      @content;
    }
  } @else if $min != null {
    @media only screen and (min-width: $min) {
      @content;
    }
  }
}

.teeth-mark {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  @include media (null, 768px) {
    background-size: 150px;
  }
  .teeth__left {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .teeth__upper-arch {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .teeth__lower-arch {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
  }
  .teeth__right {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .teeth__upper-arch {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .teeth__lower-arch {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
  }
}


/* The container */
.checkbox__container {
  display: block;
  position: relative;
  padding-left: 25px;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 1.025em;
  font-weight: 600;
  line-height: 1.125em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &.container-rev {
    padding-left: 0;
    padding-right: 25px;
  }
}

/* Hide the browser's default checkbox */
.checkbox__container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  &.checkmark--right {
    left: auto;
    right: 0;
  }
}

/* On mouse-over, add a grey background color */
.checkbox__container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox__container input:checked ~ .checkmark {
  background-color: #2196f3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox__container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox__container .checkmark:after {
  left: 6px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
