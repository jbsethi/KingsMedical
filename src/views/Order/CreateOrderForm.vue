<template>
  <div class="order-container">
    <form ref="orderForm">
      <div class="order">
        <section class="order__client">
          <header>
            Kings Medical Center
          </header>
          <div class="form-input">
            <label>Emirates ID:</label>
            <input class="flex-1" type="text" v-model="order.emiratesId" />
          </div>
          <div class="form-input">
            <label>Patient's Name:</label>
            <input class="flex-1" type="text" v-model="order.patientName" />
          </div>
          <div class="form-input">
            <label>Clinic:</label>
            <select class="flex-1" v-model="order.lab">
              <option v-for="lab in labs" :key="lab.id" :value="lab.id">{{ lab.name }}</option>
            </select>
          </div>
          <div class="form-input">
            <label>Send Date:</label>
            <input class="flex-1 ml-2" type="date" v-model="order.sendDate" />
          </div>
          <div class="form-input">
            <label>Return Date:</label>
            <input class="flex-1 ml-2" type="date" v-model="order.returnDate" />
          </div>
          <div class="form-group-items gap-1">
            <div class="form-input flex-1">
              <label>Age:</label>
              <input class="flex-1" type="text" v-model="order.age" />
            </div>
            <div class="form-input form-input--radio flex-1">
              <label>Gender:</label>
              <div class="d-flex flex-1 jc-se">
                <div>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    v-model="order.gender" 
                  />&nbsp;
                  <label class="checkbox-input" for="male">Male</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    v-model="order.gender"
                  />&nbsp;
                  <label class="checkbox-input" for="female">Female</label>
                </div>
              </div>
            </div>
          </div>
          <section class="order__teeth-design">
            <header>Pointic Design</header>
            <section>
              <ul>
                <li v-for="pointicDesignItem in pointicDesigns" :key="pointicDesignItem.id">
                  <figure>
                    <img :src="require(`../../assets/teeths/design1.png`)" />
                    <figcaption>
                      <p>{{ pointicDesignItem.title }}</p>
                      <input @change="updatePointicDesign($event, pointicDesignItem)" type="radio" name="design" />
                    </figcaption>
                  </figure>
                </li>
                <li></li>
              </ul>
            </section>
          </section>
          <section class="order__teeth-design">
            <header>Note</header>
            <section class="order__node">
              <p>for an urgent case an extra 50% of the value will be applied</p>
            </section>
          </section>
        </section>
        <section v-if="Object.values(serviceTypes).length > 0" class="d-flex order__options">
          <section class="flex-1 order__service">
            <section v-for="(serviceType, index) in Object.values(serviceTypes)" :key="serviceType.title" class="services">
              <header class="services__header">
                {{serviceType.title}} <span v-if="index == 0">QTY</span>
              </header>
              <ul class="services__list">
                <li v-for="service in serviceType.services" :key="service.id" class="d-flex jc-sb">
                  <div class="service__radio">
                    <input @change="updateService(service)" type="radio" name="service" :value="service.id" />&nbsp;
                    <label class="checkbox-input" for="service">{{ service.name }}</label>
                  </div>
                  <div class="service__qty-container">
                    <input type="text" class="service__qty" :value="order.service == service.id ? totalTeethCount : ''"/>
                  </div>
                </li>
              </ul>
            </section>
            <section v-if="order.service && totalTeethCount > 0" class="mt-2 pl-2">
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
                    <input @change="updateTooth($event, tooth)" type="checkbox"  />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="teeth__lower-arch">
                  <label v-for="tooth in teeths.lowerLeft" :key="tooth.id" class="checkbox__container"
                    >{{ tooth.value }}
                    <input @change="updateTooth($event, tooth)" type="checkbox"  />
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>
              <div class="teeth__right">
                <div class="teeth__upper-arch">
                  <label v-for="tooth in teeths.upperRight" :key="tooth.id" class="checkbox__container container-rev"
                    >{{ tooth.value }}
                    <input @change="updateTooth($event, tooth)" type="checkbox"  />
                    <span class="checkmark checkmark--right"></span>
                  </label>
                </div>
                <div class="teeth__lower-arch">
                  <label v-for="tooth in teeths.upperRight" :key="tooth.id" class="checkbox__container container-rev"
                    >{{ tooth.value }}
                    <input @change="updateTooth($event, tooth)" type="checkbox"  />
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
      </div>
      <section v-if="orders.length > 0" class="order-list">
        <h2>Orders</h2>
        <ul>
          <li v-for="orderItem in orders" :key="orderItem.service.id">
            <article>
              <h3>{{ orderItem.service.name }}</h3>
              <section>
                <p>Pointic Design : {{ orderItem.pointicDesign.title || 'No Selected !' }}</p>
                <p>Price : <span class="price-tag">{{ orderItem.price }}$</span></p>
                <p>
                  <span>Teeths :</span> 
                  <ul>
                    <li v-for="teeth in orderItem.teeths" :key="teeth.id">Teeth no : {{ teeth.value }}</li>
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
    
    <div class="d-flex submit-order">
      <button @click="submitOrderCreate">Create Order</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      pointicDesigns: [
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
      ],
      teeths: {
        upperLeft: [
          { id: 1, value: '1' },
          { id: 2, value: '2' },
          { id: 3, value: '3' },
          { id: 4, value: '4' },
          { id: 5, value: '5' },
          { id: 6, value: '6' },
          { id: 7, value: '7' },
          { id: 8, value: '8' },
        ],
        upperRight: [
          { id: 9, value: '9' },
          { id: 10, value: '10' },
          { id: 11, value: '11' },
          { id: 12, value: '12' },
          { id: 13, value: '13' },
          { id: 14, value: '14' },
          { id: 15, value: '15' },
          { id: 16, value: '16' },
        ],
        lowerLeft: [
          { id: 17, value: '17' },
          { id: 18, value: '18' },
          { id: 19, value: '19' },
          { id: 20, value: '20' },
          { id: 21, value: '21' },
          { id: 22, value: '22' },
          { id: 23, value: '23' },
          { id: 24, value: '24' },
        ],
        lowerRight: [
          { id: 25, value: '25' },
          { id: 26, value: '26' },
          { id: 27, value: '27' },
          { id: 28, value: '28' },
          { id: 29, value: '29' },
          { id: 30, value: '30' },
          { id: 31, value: '31' },
          { id: 32, value: '32' },
        ]
      },
      orders: [],
      order: {
        emiratesId: '',
        patientName: '',
        age: '',
        sendDate: '',
        returnDate: '',
        gender: '',
        note: '',
        pointicDesign: null,
        service: '',
        lab: '',
        teeths: []
      }
    }
  },
  computed: {
    totalTeethCount () {
      return this.order.teeths.length
    },
    ...mapState({
      labs: state => state.labs.labs,
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
  methods: {
    initOrderData () {
      this.$store.dispatch('services/getAllServices')
      this.$store.dispatch('labs/getAllLabs')
    },

    submitOrderCreate () {
      this.addOrder()
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
          this.$emit('close')
        })
    },

    updateTooth (event, insertTooth) {
      if (event.target.checked) {
        const isToothAdded = this.order.teeths.find(tooth => tooth.id === insertTooth.id)
        if (!isToothAdded) {
          this.order.teeths.push(insertTooth)
        }
      } else {
        this.order.teeths = this.order.teeths.filter(tooth => tooth.id !== insertTooth.id)
      }
    },

    updatePointicDesign (event, pointicDesign) {
      this.order.pointicDesign = pointicDesign
    },

    updateService (service) {
      this.order.service = service
    },

    addOrder () {
      const orderIdx = this.orders.findIndex(order => order.service === this.order.service)
      const order = {
        service: this.order.service,
        price: 500,
        pointicDesign: this.order.pointicDesign,
        teeths: this.order.teeths
      }

      if (orderIdx >= 0) {
        this.orders[orderIdx] = order
      } else {
        this.orders.push(order)
      }
      // this.$refs.orderForm.reset()
    },
    ...mapActions('orders', [
      'storeOrder'
    ])
  },
  mounted () {
    this.initOrderData()
  }
}
</script>

<style lang="scss" scoped>
.order-container {
  .order {
    display: grid;
    grid-template-columns: 40% 60%;
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
        display: flex;
        li {
          flex: 1;
          border-right: 1px solid saddlebrown;
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
                padding-top: 5  px;
                text-align: center;
                font-size: 0.875em;
                line-height: 1.025em;
                padding-bottom: 10px;
              }
              input[type="radio"] {
                position: absolute;
                bottom: 0px;
              }
            }
          }
        }
        li:last-of-type {
          flex: 2;
          border-right: 1px solid saddlebrown;
          padding: 3px;
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
