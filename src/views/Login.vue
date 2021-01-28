<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-1">
          <div class="text-muted text-center mt-2 mb-3">
            <h1>Kings Medical Center</h1>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-4">
          <div class="text-center text-muted mb-4">
            <small>Sign in</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Username"
              addon-left-icon="ni ni-email-83"
              v-model="user.username"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="user.password"
            >
            </base-input>

            <!-- <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox> -->
            <div class="text-center">
              <base-button  @click="submitLogin"
                            type="primary"
                            class="my-4">
                <UiPulseLoading v-if="isLoading" size="20"></UiPulseLoading>
                <span v-else>Sign in</span>
              </base-button>
            </div>
          </form>
        </div>
      </div>
      <!-- <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UiPulseLoading from '../components/UiPulseLoading'
export default {
  name: 'login',
  components: {
    UiPulseLoading
  },
  data() {
    return {
      isLoading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitLogin () {
      if (!this.isLoading) {
        this.isLoading = true
        const { user } = this

        this.login(user)
          .then(() => {
            this.$router.push({ name: 'dashboard' })
            this.$notify('Logged in succesfully !')  
          })
          .catch((errors) => {
            this.$notify(errors)
          })
          .finally(() => this.isLoading = false)
      }
    },
    ...mapActions('user', [
      'login'
    ])
  }
}
</script>
<style></style>
