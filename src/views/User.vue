<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <users-table @create:user="toggleCreateUserModal(true)" @click:forgotPassword="toggleForgotPassword" @activate:user="activateUser" :tableData="users" :tableMeta="userMeta" title="Users Record"></users-table>
                </div>
            </div>
        </div>
        <Modal :show="createUserModal" @close="toggleCreateUserModal(false)">
          <template slot="header">
            Create User
          </template>
          <template>
            <form role="form">
              <base-input alternative
                          label="Emirates ID"
                          class="mb-3"
                          placeholder="Emirates ID"
                          v-model="user.emiratesId">
              </base-input>
              <div class="form-group mb-3 has-label">
                <label class="form-control-label">Roles</label>
                <Select required
                        :clearable="false"
                        placeholder="Role"
                        class="user-role--select"
                        :options="roles"
                        v-model="user.role"
                        :reduce="(role) => role.id"
                        @input="checkRole"
                        label="title">
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!user.role"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </Select>
              </div>
              <div v-if="isLabSelectActive" class="form-group mb-3 has-label">
                <label class="form-control-label">Labs</label>
                <Select required
                        :clearable="false"
                        placeholder="Role"
                        class="user-role--select"
                        :options="labs"
                        v-model="user.labId"
                        :reduce="(lab) => lab.id"
                        label="name">
                  <template #search="{attributes, events}">
                    <input
                      class="vs__search"
                      :required="!user.labId"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </Select>
              </div>
              <base-input alternative
                          label="Name"
                          class="mb-3"
                          placeholder="Name"
                          v-model="user.name">
              </base-input>
              <base-input required
                          label="Email"
                          type="email"
                          class="mb-3"
                          placeholder="Email"
                          v-model="user.email">
              </base-input>
              <base-input required
                          label="Username"
                          class="mb-3"
                          placeholder="username"
                          v-model="user.username">
              </base-input>
              <base-input required
                          label="Password"
                          type="password"
                          class="mb-3"
                          placeholder="password"
                          v-model="user.password">
              </base-input>
              <div class="d-flex align-items-center mt-3">
                <base-switch class="mb-0 mr-2" v-model="user.active"></base-switch> <span>Active</span>
              </div>
              <div class="text-center">
                  <base-button @click="createUser" type="primary" class="my-4">
                    <template v-if="!createLoading">
                      {{ user.id ? 'Update User' : 'Create User' }}
                    </template>
                    <template v-else>
                      Loading ...
                    </template>
                  </base-button>
              </div>
          </form>
          </template>
        </Modal>

        <Modal :show="forgotModal" @close="toggleForgotPassword(null)">
          <template slot="header">
            Reset Password
          </template>
          <template>
            <form role="form">
              <base-input alternative
                          label="New Password"
                          class="mb-3"
                          placeholder="Password"
                          v-model="resetPassword.newPassword">
              </base-input>
              <base-input alternative
                          label="New Password"
                          class="mb-3"
                          placeholder="Password"
                          v-model="resetPassword.retypePassword">
              </base-input>
              <div class="text-center">
                  <base-button @click="resetUserPass" type="primary" class="my-4">
                    <template v-if="!resetUserPasswordLoading">
                      Reset
                    </template>
                    <template v-else>
                      Loading ...
                    </template>
                  </base-button>
              </div>
          </form>
          </template>
        </Modal>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import UsersTable from './User/UsersTable'

export default {
  components: {
    UsersTable,
    Modal: () => import('../components/Modal'),
    Select: () => import('vue-select')
  },
  data() {
    return {
      createLoading: false,
      createUserModal: false,
      user: {
        id: null
      },

      isLabSelectActive: false,
      labs: [],

      resetUserPasswordLoading: false,
      forgotUserPasswordId: null,
      resetPassword: {
        newPassword: '',
        retypePassword: ''
      },
      forgotModal: false
    }
  },
  computed: {
    ...mapState({
      users: state => state.user.users,
      userMeta: state => state.user.userMeta,
      roles: state => state.roles.roles
    })
  },
  methods: {
    checkRole (roleId) {
      const role = this.roles.find(role => role.id == roleId) || null
      if (role && role.title == 'Lab') {
        this.isLabSelectActive = true
      } else {
        this.isLabSelectActive = false
      }
    },

    toggleForgotPassword (userId) {
      this.forgotModal = !this.forgotModal
      if (this.forgotModal) {
        this.forgotUserPasswordId = userId
      } else {
        this.forgotUserPasswordId = null
      }
    },

    toggleCreateUserModal (status) {
      this.createUserModal = status === undefined ? !this.createUserModal : status
      if (this.createUserModal && this.roles.length === 0) this.getAllRoles()
    },

    resetForm () {
      this.user = {
        id: null
      }
    },

    createUser () {
      if (!this.createLoading) {
        this.createLoading = true

        this.user.labId = this.user.labId || null
        
        this.storeUser({user: this.user, userId: this.user.id})
          .then(() => {
            this.toggleCreateUserModal(false)
            this.resetForm()
          })
          .catch(error => {
            this.$notify(error)
          })
          .finally(this.createLoading = false)
      }
    },

    resetUserPass () {
      if (!this.resetUserPasswordLoading) {
        this.resetUserPasswordLoading = true
        
        const data = {
          userId: this.forgotUserPasswordId,
          data: {
            password: this.resetPassword.newPassword,
            confirmPassword: this.resetPassword.retypePassword
          }
        }

        this.resetUserPassword(data)
          .then(() => {
            this.toggleForgotPassword()
          })
          .catch(error => {
            console.log(error)
            this.$notify(error)
          })
          .finally(this.resetUserPasswordLoading = false)
      }
    },

    ...mapActions('user', [
      'getAllUsers',
      'storeUser',
      'activateUser',
      'resetUserPassword'
    ]),
    ...mapActions('roles', [
      'getAllRoles'
    ]),
    ...mapActions('labs', [
      'getAllActiveLab'
    ])
  },
  mounted () {
    this.getAllUsers()

    this.getAllActiveLab()
      .then(resp => {
        this.labs = resp?.data?.content || []
      })
  }
}
</script>

<style>

.user-role--select .vs__search::placeholder,
.user-role--select .vs__dropdown-toggle,
.user-role--select .vs__dropdown-menu {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #8898aa;
  text-transform: capitalize;
}

.user-role--select .vs__dropdown-toggle {
  height: calc(1.5em + 1.25rem + 2px);
  border: 1px solid #cad1d7;
}

.user-role--select .vs__dropdown-menu {
  border: 1px solid #cad1d7;
}

.user-role--select .vs__clear,
.user-role--select .vs__open-indicator {
  fill: #8898aa;
}
</style>
