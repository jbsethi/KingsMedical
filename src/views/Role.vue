<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <roles-table
                      :tableData="roles"
                      title="Roles Record"
                    >
                    </roles-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import RolesTable from './Role/RolesTable'
export default {
  components: {
    RolesTable
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      roles: state => state.roles.roles
    })
  },
  methods: {
    ...mapActions('roles', [
      'getAllRoles'
    ])
  },
  mounted () {
    this.getAllRoles()
  }
}
</script>
<style></style>
