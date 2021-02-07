<template>
  <div class="service-selection">
    <div class="row">
      <div class="col-md-12">
        <section class="order__teeths">
          <div
            :style="{
              'background-image':
                'url(' + require('../../../assets/Human_dental_arches.png') + ')'
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

    <div class="row mt-5">
      <div class="col-md-12">
        <div class="form-group mb-3 has-label">
          <label class="form-control-label">Pointic Design</label>
          <Select required
                  :clearable="false"
                  placeholder="Pointic Design"
                  class="pointic-design--select"
                  :options="pointicDesigns"
                  :value="teethSelection.pointicDesign"
                  @input="updateTeethSelection('pointicDesign', $event)"
                  :reduce="(option) => option.id"
                  label="title">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!teethSelection.pointicDesign"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </Select>
        </div>
      </div>

      <div class="col-md-12">
        <div class="form-group mb-3 has-label">
          <label class="form-control-label">Shade</label>
          <Select required
                  :clearable="false"
                  placeholder="Shade"
                  class="shade--select"
                  :options="[{ id: 1, name: 'Shader' }]"
                  :value="teethSelection.shade"
                  @input="updateTeethSelection('shade', $event)"
                  :reduce="(option) => option.id"
                  label="name">
            <template #search="{attributes, events}">
              <input
                class="vs__search"
                :required="!teethSelection.shade"
                v-bind="attributes"
                v-on="events"
              />
            </template>
          </Select>
        </div>
      </div>

      <div v-if="showHistory" class="col-md-12 pt-5">
        <p>The Patient has History for same service on teeth below :</p>
        <div v-for="toothId in Object.keys(history)" :key="toothId">
          <div class="d-flex align-items-center justify-content-center">
            <div class="mr-2">Tooth no </div>
            <div><strong>{{toothId}}</strong></div>
          </div>
          <div class="d-flex align-items-center justify-content-center">
            <div class="mr-2 mt-2">Send Date</div>
            <div><strong>{{history[toothId][0].sentDate}}</strong></div>
          </div>
          <div class="d-flex align-items-center justify-content-center mt-1">
            <div class="d-flex align-items-center justify-content-center">
              <base-switch class="mb-0 mr-2" v-model="noChargeHistory[toothId]"></base-switch> <span>Charge ?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeethSelection',
  props: {
    teethSelection: {
      type: Object,
      required: true
    },
    history: {
      type: Object
    }
  },
  data() {
    return {
      showHistory: false,
      selectedTeeths: [],
      noChargeHistory: {}
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
    },
    pointicDesigns () {
      const pointicDesigns = [
        {
          id: 6,
          image: 'teeths/design1.png',
          title: 'Moddified Ridge'
        },
        {
          id: 5,
          image: 'teeths/design1.png',
          title: 'Full Ridge'
        },
        {
          id: 4,
          image: 'teeths/design1.png',
          title: 'No Ridge'
        },
        {
          id: 3,
          image: 'teeths/design1.png',
          title: 'No Contact'
        },
        {
          id: 2,
          image: 'teeths/design1.png',
          title: 'Point Contact'
        },
        {
          id: 1,
          image: 'teeths/design1.png',
          title: 'Ovate'
        }
      ]

      return pointicDesigns
    }
  },
  components: {
    Select: () => import('vue-select')
  },
  methods: {
    isChecked(toothId) {
      if (this.teethSelection.teeths.find(teeth => teeth == toothId) != undefined) return true
      return false
    },

    checkIfOrderedBefore (toothId) {
      this.$emit('validateHistory', toothId)
    },

    removeCheckIfOrderedBefore (toothId) {
      this.$emit('removeFromHistory', toothId)
    },

    selectTeeth (toothId, e) {
      if (e.target.checked) {
        this.checkIfOrderedBefore(toothId)
        this.selectedTeeths.push(toothId)
      } else {
        this.removeCheckIfOrderedBefore(toothId)
        this.selectedTeeths = this.selectedTeeths.filter(id => id !== toothId)
      }
      this.updateTeethSelection('teeths', this.selectedTeeths)
    },

    updateTeethSelection (key, value) {
      this.$emit('update:teethSelection', [key, value])
    }
  },
  mounted () {
    console.log(this.teethSelection, this.selectedTeeths)
  },
  watch: {
    teethSelection: {
      deep: true,
      handler () {
        if (this.teethSelection.teeths.length == 0) {
          this.selectedTeeths = []
        }
      }
    },
    noChargeHistory: {
      deep: true,
      handler (tooths) {
        this.$emit('chargeTeethHistoryStatus', tooths)
      }
    },
    history: {
      immediate: true,
      deep: true,
      handler (history) {
        if (Object.keys(history).length > 0) {
          this.showHistory = true
        } else {
          this.showHistory = false
        }
      }
    }
  }
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
