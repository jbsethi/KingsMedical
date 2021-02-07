<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{title}}
          </h3>
        </div>
        <div class="col text-right" v-if="['Super Administrator'].includes(role || null)">
          <base-button @click="$emit('create:user')" type="primary" size="sm">Create User</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  :class="type === 'dark' ? 'table-dark': ''"
                  :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th></th>
          <th>Username</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Change Password</th>
          <th>Status</th>
          <th v-if="['Super Administrator'].includes(role || null)"></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle">
                <img v-if="row.img" alt="Image placeholder" :src="row.img">
                <span v-if="!row.img">{{ row.username[0] + row.username[1] }}</span>
              </a>
            </div>
          </th>
          <td class="first-name">
            {{row.username}}
          </td>
          <td class="first-name">
            {{row.name}}
          </td>
          <td class="email">
            {{row.email}}
          </td>
          <td class="role">
            {{row.role}}
          </td>
          <td class="role">
            <a @click.prevent="$emit('click:forgotPassword', row.id)" href="#">Change Password</a>
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.active ? 'primary': 'danger'">
              <i :class="`bg-${row.active ? 'primary': 'danger'}`"></i>
              <span class="status">{{row.active}}</span>
            </badge>
          </td>
          <td class="text-right" v-if="['Super Administrator'].includes(role || null)">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a @click.prevent="$emit('activate:user', { id: row.id, status: false})" v-if="row.active" class="dropdown-item" href="#">Delete</a>
                <a @click.prevent="$emit('activate:user', { id: row.id, status: true})" v-else class="dropdown-item" href="#">Activate</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :pageCount="tableMeta.totalPages"></base-pagination>
    </div>

  </div>
</template>
<script>
export default {
  name: 'services-table',
  props: {
    type: {
      type: String
    },
    title: String,
    tableData: {
      required: true,
      type: Array
    },
    tableMeta: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
    }
  },
  computed: {
      role  () {
        return this.$store.state.user?.currentUser?.role?.name || null
      }
    },
}
</script>
<style>
</style>
