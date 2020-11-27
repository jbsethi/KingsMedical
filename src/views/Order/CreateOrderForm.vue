<template>
  <div class="order-container">
    <div class="order">
      <section class="order__client">
        <header>
          Kings Medical Center
        </header>
        <div class="form-input">
          <label>Doctor's Name:</label>
          <input class="flex-1" type="text" />
        </div>
        <div class="form-input">
          <label>Patient's Name:</label>
          <input class="flex-1" type="text" />
        </div>
        <div class="form-input">
          <label>Clinic:</label>
          <input class="flex-1" type="text" />
        </div>
        <div class="form-input">
          <label>Send Date:</label>
          <input class="flex-1" type="text" />
        </div>
        <div class="form-input">
          <label>Return Date:</label>
          <input class="flex-1" type="text" />
        </div>
        <div class="form-group-items gap-1">
          <div class="form-input flex-1">
            <label>Age:</label>
            <input class="flex-1" type="text" />
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
                />&nbsp;
                <label class="checkbox-input" for="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
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
              <li>
                <figure>
                  <img :src="require('../../assets/teeths/design1.png')" />
                  <figcaption>
                    <p>Moddified Ridge</p>
                    <input type="radio" name="design" />
                  </figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img :src="require('../../assets/teeths/design1.png')" />
                  <figcaption>
                    <p>Full Ridge</p>
                    <input type="radio" name="design" />
                  </figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img :src="require('../../assets/teeths/design1.png')" />
                  <figcaption>
                    <p>No Ridge</p>
                    <input type="radio" name="design" />
                  </figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img :src="require('../../assets/teeths/design1.png')" />
                  <figcaption>
                    <p>No Contact</p>
                    <input type="radio" name="design" />
                  </figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img :src="require('../../assets/teeths/design1.png')" />
                  <figcaption>
                    <p>Point Contact</p>
                    <input type="radio" name="design" />
                  </figcaption>
                </figure>
              </li>
              <li>
                <figure>
                  <img :src="require('../../assets/teeths/design1.png')" />
                  <figcaption>
                    <p>Ovate</p>
                    <input type="radio" name="design" />
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
      <section class="d-flex order__options">
        <section class="flex-1 order__service">
          <section class="services">
            <header class="services__header">
              Work Cases <span>QTY</span>
            </header>
            <ul class="services__list">
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input type="radio" name="service" value="zircon" />&nbsp;
                  <label class="checkbox-input" for="service">Zircon</label>
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input type="radio" name="service" value="pfm" />&nbsp;
                  <label class="checkbox-input" for="service">PFM</label>
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input type="radio" name="service" value="emx" />&nbsp;
                  <label class="checkbox-input" for="service">EMX</label>
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input type="radio" name="service" value="veneer" />&nbsp;
                  <label class="checkbox-input" for="service">Veneer</label>
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input
                    type="radio"
                    name="service"
                    value="non-prep-veneer"
                  />&nbsp;
                  <label class="checkbox-input" for="service"
                    >Non Prep Veneer</label
                  >
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
            </ul>
          </section>
          <section class="services">
            <header class="services__header">Work Types</header>
            <ul class="services__list">
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input
                    type="radio"
                    name="service"
                    value="crown-bridge"
                  />&nbsp;
                  <label class="checkbox-input" for="service"
                    >Crown / Bridge</label
                  >
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input
                    type="radio"
                    name="service"
                    value="inlay-onlay"
                  />&nbsp;
                  <label class="checkbox-input" for="service"
                    >Inlay / Onlay</label
                  >
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input type="radio" name="service" value="telescopic" />&nbsp;
                  <label class="checkbox-input" for="service">Telescopic</label>
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input
                    type="radio"
                    name="service"
                    value="maryland-bridge"
                  />&nbsp;
                  <label class="checkbox-input" for="service"
                    >Maryland Bridge</label
                  >
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input
                    type="radio"
                    name="service"
                    value="non-prep-veneer"
                  />&nbsp;
                  <label class="checkbox-input" for="service"
                    >Non Prep Veneer</label
                  >
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
            </ul>
          </section>
          <section class="services">
            <header class="services__header">Others</header>
            <ul class="services__list">
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input
                    type="radio"
                    name="service"
                    value="night-guard"
                  />&nbsp;
                  <label class="checkbox-input" for="service"
                    >Night Guard</label
                  >
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input
                    type="radio"
                    name="service"
                    value="diagnostic-wax-up"
                  />&nbsp;
                  <label class="checkbox-input" for="service"
                    >Diagnostic Wax Up</label
                  >
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input type="radio" name="service" value="Ortho" />&nbsp;
                  <label class="checkbox-input" for="service">Ortho</label>
                  <div>
                    <p>( Halway retainers )</p>
                    <p>( Study Models )</p>
                    <p>( Functional Appliances )</p>
                  </div>
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                  <input type="text" class="service__qty" />
                  <input type="text" class="service__qty" />
                </div>
              </li>
              <li class="d-flex jc-sb">
                <div class="service__radio">
                  <input type="radio" name="service" value="denture" />&nbsp;
                  <label class="checkbox-input" for="service">Denture</label>
                  <div>
                    <p>( Flexible )</p>
                    <p>( Acrylic )</p>
                    <p>( Chromecobalt )</p>
                  </div>
                </div>
                <div class="service__qty-container">
                  <input type="text" class="service__qty" />
                  <input type="text" class="service__qty" />
                  <input type="text" class="service__qty" />
                </div>
              </li>
            </ul>
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
                <label class="checkbox__container"
                  >11
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >12
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >13
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >14
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >15
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >16
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >17
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >18
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
              </div>
              <div class="teeth__lower-arch">
                <label class="checkbox__container"
                  >48
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >47
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >46
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >45
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >44
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >43
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >42
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
                <label class="checkbox__container"
                  >41
                  <input type="checkbox"  />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="teeth__right">
              <div class="teeth__upper-arch">
                <label class="checkbox__container container-rev"
                  >21
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >22
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >23
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >24
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >25
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >26
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >27
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >28
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
              </div>
              <div class="teeth__lower-arch">
                <label class="checkbox__container container-rev"
                  >38
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >37
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >36
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >35
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >34
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >33
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >32
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
                <label class="checkbox__container container-rev"
                  >31
                  <input type="checkbox"  />
                  <span class="checkmark checkmark--right"></span>
                </label>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
    <section class="order-notes">
      <header>Notes</header>
      <textarea placeholder="Write down notes here ..."></textarea>
    </section>
  </div>
</template>

<script>
export default {}
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

.d-flex {
  display: flex;
}

.jc-sb {
  justify-content: space-between;
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
