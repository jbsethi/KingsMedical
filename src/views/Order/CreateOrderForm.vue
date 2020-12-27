<template>
  <div class="order-container">
    <form ref="orderForm">
      <div class="order">
        <section class="order__client">
          <header>
            Kings Medical Center
          </header>
          <base-input placeholder="Emirates ID"
                      label="Emirates ID"
                      class="mb-0"
                      v-model="order.emiratesId"
                      alternative="">
          </base-input>
          <base-input placeholder="Patient's Name"
                      label="Patient's Name"
                      class="mb-0"
                      v-model="order.patientName"
                      alternative="">
          </base-input>
          <div class="form-group mb-0 has-label">
            <label class="form-control-label">Clinic</label>
            <Select required
                    :clearable="false"
                    placeholder="Select Clinic"
                    :options="labs"
                    v-model="order.lab"
                    :reduce="(lab) => lab.id"
                    label="name">
              <template #search="{attributes, events}">
                <input
                  class="vs__search"
                  :required="!order.lab"
                  v-bind="attributes"
                  v-on="events"
                />
              </template>
            </Select>
          </div>
          <base-input placeholder="Send Date"
                      label="Send Date"
                      class="mb-0"
                      type="date"
                      v-model="order.sendDate"
                      alternative="">
          </base-input>
          <base-input placeholder="Return Date"
                      label="Return Date"
                      class="mb-0"
                      type="date"
                      v-model="order.returnDate"
                      alternative="">
          </base-input>
          <div class="form-group-items gap-1">
            <base-input placeholder="Age"
                        label="Age"
                        class="mb-0"
                        v-model="order.age"
                        alternative="">
            </base-input>
            <div>
              <label class="form-control-label">Gender:</label>
              <div class="">
                <base-radio :inline="true" name="male" v-model="order.gender">
                  Male
                </base-radio>
                <base-radio :inline="true" name="female" v-model="order.gender">
                  Female
                </base-radio>
              </div>
            </div>
          </div>
          <section v-if="!isViewDetails" class="order__teeth-design">
            <header>Pointic Design</header>
            <section>
              <ul class="order__teeth-design--display-grid">
                <li v-for="pointicDesignItem in pointicDesigns" :key="pointicDesignItem.id">
                  <figure>
                    <img :src="require(`../../assets/teeths/design1.png`)" />
                    <figcaption>
                      <p>{{ pointicDesignItem.title }}</p>
                      <input v-model="orderData.pointicDesign" type="radio" name="design" :value="pointicDesignItem.id" />
                    </figcaption>
                  </figure>
                </li>
              </ul>
            </section>
          </section>
        </section>
        <section v-if="Object.values(serviceTypes).length > 0" class="d-flex order__options">
          <section class="flex-1 order__service">
            <template v-if="!isViewDetails" tag="div" class="services">
            <section v-for="(serviceType, index) in Object.values(serviceTypes)" :key="serviceType.title">
              <header class="services__header">
                {{serviceType.title}} <span v-if="index == 0">QTY</span>
              </header>
              <ul class="services__list">
                <li v-for="service in serviceType.services" :key="service.id" class="d-flex jc-sb pl-2">
                  <base-radio :inline="true" :name="service.id" v-model="orderData.service">
                    {{ service.name }}
                  </base-radio>
                  <div class="service__qty-container">
                    <input type="text" class="service__qty" :value="order.service == service.name ? totalTeethCount : ''"/>
                  </div>
                </li>
              </ul>
            </section>
            </template>
            <section v-if="canAddMoreService" class="mt-2 pl-2">
              <base-button @click="addOrder" block size="sm" outline type="secondary">
                Add more service
              </base-button>
            </section>
          </section>
          <section class="flex-1 order__teeths">
            <div
              :style="{
                'background-image':
                  'url(' + require('../../assets/Human_dental_arches.png') + ')'
              }"
              class="teeth-mark"
            >
              <div class="teeth__left">
                <div class="teeth__upper-arch">
                  <label v-for="tooth in teeths.upperLeft" :key="tooth.id" class="checkbox__container"
                    >{{ tooth.value }}
                    <input v-model="orderData.teeths[tooth.id]" name="teeths" type="checkbox" :disabled="isViewDetails" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="teeth__lower-arch">
                  <label v-for="tooth in teeths.lowerLeft" :key="tooth.id" class="checkbox__container"
                    >{{ tooth.value }}
                    <input v-model="orderData.teeths[tooth.id]" name="teeths" type="checkbox" :disabled="isViewDetails" />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="teeth__right">
                <div class="teeth__upper-arch">
                  <label v-for="tooth in teeths.upperRight" :key="tooth.id" class="checkbox__container container-rev"
                    >{{ tooth.value }}
                    <input v-model="orderData.teeths[tooth.id]" name="teeths" type="checkbox" :disabled="isViewDetails" />
                    <span class="checkmark checkmark--right"></span>
                  </label>
                </div>
                <div class="teeth__lower-arch">
                  <label v-for="tooth in teeths.lowerRight" :key="tooth.id" class="checkbox__container container-rev"
                    >{{ tooth.value }}
                    <input v-model="orderData.teeths[tooth.id]" name="teeths" type="checkbox" :disabled="isViewDetails" />
                    <span class="checkmark checkmark--right"></span>
                  </label>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section v-else class="d-flex order__options order__options--no-service justify-content-center align-items-center">
          <p class="d-flex justify-content-center">
            Please <router-link to="/services" tag="a">Add Services</router-link> to create Order
          </p>
        </section>
        <section v-if="!isViewDetails" class="order__teeth-design mt-3">
          <header>Note</header>
          <section class="order__node">
            <p>for an urgent case an extra 50% of the value will be applied</p>
          </section>
        </section>
      </div>
      <section v-if="orders.length > 0" class="order-list">
        <h2>Orders</h2>
        <ul>
          <li v-for="orderItem in orders" :key="orderItem.service.id">
            <article>
              <h3>{{ orderItem.service.name }}</h3>
              <section>
                <p>Pointic Design : {{ orderItem.pointicDesign.title || 'No Selected !' }}</p>
                <p>
                  <span>Teeths :</span> 
                  <ul>
                    <li v-for="teeth in orderItem.teeths" :key="teeth.id">Teeth : {{ teeth.value }}</li>
                  </ul>
                </p>
              </section>
            </article>
          </li>
        </ul>
      </section>
      <section class="order-notes">
        <header>Notes</header>
        <textarea v-model="order.note" placeholder="Write down notes here ..."></textarea>
      </section>
    </form>
    
    <div v-if="!isViewDetails" class="d-flex submit-order">
      <button @click="submitOrderCreate">Create Order</button>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import 'vue-select/src/scss/vue-select.scss'
export default {
  props: {
    orderDetails: {
      type: Object,
      required: false
    },
    isViewDetails: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data () {
    return {
      order: {
        emiratesId: '',
        patientName: '',
        age: '',
        sendDate: '',
        returnDate: '',
        gender: '',
        note: '',
        lab: '',
      },
      orderData: {
        pointicDesign: '',
        service: '',
        teeths: {}
      },
      orders: []
    }
  },
  computed: {
    totalTeethCount () {
      const teethCount = Object.keys(this.orderData.teeths).reduce((count, teeth) => {
        if (this.orderData.teeths[teeth]) {
          count++
        }
        return count
      }, 0)
      return teethCount
    },
    canAddMoreService () {
      if (this.totalTeethCount > 0 && this.orderData.service && this.orderData.pointicDesign) return true
      return false
    },
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
    },
    ...mapState({
      labs: state => state.labs.labs,
      allServices: state => state.services.services,
      serviceTypes: state => {
        const serviceTypes = {}
        state.services.services.forEach(service => {
          if (serviceTypes[service.ServiceType.id]) {
            serviceTypes[service.ServiceType.id].services.push(service)
          } else {
            serviceTypes[service.ServiceType.id] = {
              title: service.ServiceType.name,
              services: [
                service
              ]
            }
          }
        })
        return serviceTypes
      }
    })
  },
  components: {
    Select: () => import('vue-select')
  },
  methods: {
    initOrderData () {
      this.$store.dispatch('services/getAllServicesRecords')
      this.$store.dispatch('labs/getAllLabs')
    },

    initOrderDetails () {
      this.order.emiratesId = this.orderDetails.patientEmiratesId
      this.order.patientName = this.orderDetails.Patient.name
      this.order.lab = this.orderDetails.labId
      this.order.age = 20
      this.order.sendDate = this.orderDetails.sentDate
      this.order.returnDate = this.orderDetails.returnDate
      this.order.gender = this.orderDetails.Patient.gender
      this.order.note = this.orderDetails.notes

      this.orderDetails.tooths.forEach(tooth => {
        this.orderData.teeths[tooth.toothId] = true
      })

      // this.orderDetails.reduce((orders, tooth) => {
        
      // }, [])
    },

    submitOrderCreate () {
      if (this.canAddMoreService) {
        this.addOrder()
      }

      if (this.orders.length == 0) {
        this.$notify('Please add order to create !')
        return
      }

      const formData = {
        emiratesId: this.order.emiratesId,
        lab: this.order.lab,
        patientName: this.order.patientName,
        age: this.order.age,
        sendDate: this.order.sendDate,
        returnDate: this.order.returnDate,
        gender: this.order.gender,
        note: this.order.note,
        orders: this.orders
      }
      this.storeOrder(formData)
        .then(() => {
          console.log('is it comming here')
          this.$emit('close')
        })
    },

    addOrder () {
      const selectedService = _.cloneDeep(this.allServices.find(service => service.id === this.orderData.service))
      const selectedPointicDesign = _.cloneDeep(this.pointicDesigns.find(design => design.id === this.orderData.pointicDesign))
      
      const selectedTeeths = Object.keys(this.orderData.teeths).reduce((selectedTeeths, teeth) => {
        if (this.orderData.teeths[teeth]) {
          const toothTemp = _.cloneDeep(this.tooths.find(tooth => tooth.id == teeth))
          selectedTeeths.push(toothTemp)
        }
        return selectedTeeths
      }, [])

      const orderIdx = this.orders.findIndex(orderItem => orderItem?.service?.id == selectedService.id)

      if (orderIdx >= 0) {
        this.orders[orderIdx] = {
          service: selectedService,
          pointicDesign: selectedPointicDesign,
          teeths: selectedTeeths
        }
      } else {
        this.orders.push({
          service: selectedService,
          pointicDesign: selectedPointicDesign,
          teeths: selectedTeeths
        })
      }

      this.orderData.pointicDesign = ''
      this.orderData.service = ''
      Object.keys(this.orderData.teeths).forEach(idx => {
        this.orderData.teeths[idx] = false
      })
    },
    ...mapActions('orders', [
      'storeOrder'
    ])
  },
  mounted () {
    this.initOrderData()
    if (this.isViewDetails) {
      this.initOrderDetails()
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

.order-container {
  .order {
    display: grid;
    grid-template-columns: 40% 60%;
    @include media (null, 768px) {
      grid-template-columns: 1fr;
    }
    &__client {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 20px;
      & > header {
        margin-bottom: 20px;
        text-align: center;
        font-size: 1.25em;
        font-weight: 600;
        color: saddlebrown;
      }
    }
    &__options {
      margin-left: 10px;
      border: 2px solid saddlebrown;
      @include media (null, 1280px) {
        margin-left: 5px;
        flex-direction: column-reverse;
      }
      &--no-service {
        & > p {
          font-size: 1.5em;
          a {
            margin-left: 4px;
            margin-right: 4px;
          }
        }
      }
    }
    &__service {
      .services {
        &__header {
          background-color: saddlebrown;
          padding: 3px 10px;
          font-size: 1.025em;
          font-weight: 600;
          color: white;
          & > span {
            float: right;
          }
        }
        &__list {
          padding: 0;
          padding-top: 5px;
          padding-bottom: 10px;
          margin: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 2px;
          & > li {
            align-items: flex-end;
          }
          .service__radio {
            padding-left: 10px;
            label {
              margin-bottom: 0;
            }
            p {
              margin-bottom: 0;
            }
            & > div {
              padding-left: 25px;
            }
          }
          .service__qty-container {
            display: flex;
            flex-direction: column;
          }
          .service__qty {
            width: 50px;
            border: 0px;
            border-bottom: 1px solid saddlebrown;
          }
        }
      }
    }
    &__teeth-design {
      border: 2px solid saddlebrown;
      header {
        text-align: center;
        color: white;
        font-size: 1.025em;
        font-weight: 600;
        padding: 3px 10px;
        background-color: saddlebrown;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        li {
          padding: 3px;
          padding-bottom: 10px;
          figure {
            position: relative;
            padding-top: 15px;
            padding-bottom: 0px;
            margin-bottom: 0px;
            text-align: center;
            height: 100%;
            img {
              height: 40px;
              width: 40px;
            }
            figcaption {
              p {
                padding-top: 5px;
                text-align: center;
                font-size: 0.875em;
                line-height: 1.025em;
                padding-bottom: 0px;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
    &__node {
      padding:20px;
      p {
        padding-left: 25px;
        padding-right: 25px;
        margin-bottom: 0;
        font-size: 1.125em;
        line-height: 1.125em;
        letter-spacing: 0.1px;
        color: saddlebrown;
        font-weight: 700;
        text-transform: uppercase;
        text-align: center;
      }
    }
  }

  .order-notes {
    position: relative;
    margin-top: 20px;
    border: 4px solid saddlebrown;
    border-left-width: 24px;
    height: 120px;
    header {
      position: absolute;
      left: -70px;
      bottom: 44px;
      width: 120px;
      background-color: saddlebrown;
      color: white;
      font-weight: 600;
      text-align: center;
      transform: rotate(-90deg);
    }
    textarea {
      height: 100%;
      width: 100%;
      padding: 5px;
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

.form-input {
  display: flex;
  align-items: center;
  label {
    margin-bottom: 0;
    font-weight: 600;
  }
  input[type='radio'] {
    border-radius: 0px;
  }
  .checkbox-input {
    cursor: pointer;
  }
}

.form-input:not(.form-input--radio) {
  display: flex;
  align-items: flex-end;
  label {
    margin-bottom: 0;
    font-weight: 600;
  }
  input[type='text'] {
    border: 0px;
    border-bottom: 1px solid black;
    padding-left: 10px;
  }
  select {
    border: 0px;
    border-bottom: 1px solid black;
    padding-left: 10px;
  }
}

.form-group-items {
  display: flex;
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

.order-list {
  margin-top: 20px;
  & > ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5px;
    & > li {
      padding: 0;
      margin: 0;
      article {
        padding: 8px 15px;
        border: 3px solid saddlebrown;
        & h3 {
          border-bottom: 3px solid saddlebrown;
        }
        & p {
          margin-bottom: 1px;
          .price-tag {
            font-weight: 600;
          }
          display: flex;
          justify-content: flex-start;
          align-content: center;
          align-items: center;
          & > span {
          }
          & > ul {
            list-style: none;
            padding: 0;
            margin: 0;
            margin-left: 5px;
            display: flex;
            gap: 2px;
            flex-wrap: wrap;
            li {
              display: flex;
              align-items: center;
              align-content: center;
              flex-wrap: wrap;
              border-radius: 6px;
              padding: 2px 5px;
              border: 1px solid saddlebrown;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-size: 0.875em;
              font-weight: normal;
              user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              -webkit-user-select: none;
            } 
          }
        }
      }
    }
  }
}

.submit-order {
  margin-top: 20px;
  justify-content: flex-end;
  button {
    padding: 5px 10px;
    border-radius: 4px;
    outline: none;
    box-shadow: none;
    background-color: white;
    border: 2px solid saddlebrown;
    font-size: 1.125em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    color: saddlebrown;
    transition: 0.3s;
    &:hover {
      background: saddlebrown;
      color: white;
      transform: scale(1.05);
    }
    &:active {
      transform: scale(0.98);
    }
  }
}

.d-flex {
  display: flex;
}

.jc-sb {
  justify-content: space-between;
}

.jc-fe {
  justify-content: flex-end;
}

.jc-sa {
  justify-content: space-around;
}

.jc-se {
  justify-content: space-evenly;
}

.flex-1 {
  flex: 1;
}

.flex-2 {
  flex: 2;
}

.flex-3 {
  flex: 3;
}

.gap-1 {
  gap: 1em;
}
</style>


<style lang="scss">
.custom-radio {
  .custom-control-label {
    &::after{
      // background: blue;
      // border-radius: 50%;
      // border: 5px solid white;
    }
  }
}
</style>