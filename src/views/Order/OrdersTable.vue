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
        <div class="col text-right" v-if="['Super Administrator', 'Administrator', 'Doctor'].includes(role || null)">
          <base-button @click="$emit('create:order')" type="primary" size="sm">Create Order</base-button>
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
          <th>ID</th>
          <th>Emirates ID</th>
          <th>Order Type</th>
          <th>Details</th>
          <th>Send Date</th>
          <th v-if="['Super Administrator', 'Administrator', 'Management'].includes(role || null)" >Invoice</th>
          <th>Urgent</th>
          <th v-if="['Super Administrator', 'Administrator', 'Management'].includes(role || null)" ></th>
        </template>

        <template slot-scope="{row}">
          <td class="id">
            {{row.id}}
          </td>
          <td class="emirates-id">
            {{row.patientEmiratesId}}
          </td>
          <td>
            <span v-if="row.parentId" class="badge badge-info">Return Order</span>
          </td>
          <td class="details">
            <a @click.prevent="$emit('viewOrder', row.id)" href="#">View Details</a>
          </td>
          <td class="send-date">
            {{getDate(row.sentDate)}}
          </td>
          <td class="invoice" v-if="['Super Administrator', 'Administrator', 'Management'].includes(role || null)">
            <base-button @click="$emit('click:viewInvoice', row.id)" outline type="primary" size="sm">View Invoice</base-button>
          </td>
          <td class="urgent">
            {{row.urgent}}
          </td>
          <td class="text-right" v-if="['Super Administrator', 'Administrator', 'Management'].includes(role || null)">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a v-if="row.parentId" @click.prevent="$emit('viewOrder', row.parentId)" class="dropdown-item" href="#">View Orignal Order</a>
                <a @click.prevent="$emit('uploadInvoice', row.id)" class="dropdown-item" href="#">Add Invoice</a>
                <a @click.prevent="$emit('returnOrder', row.id)" class="dropdown-item" href="#">Return Order</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :value="pageNo" @input="updatePage" :total="meta.total || 0"></base-pagination>
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
      meta: {
        type: Object
      },
      pageNo: {
        type: [String, Number]
      },
      tableData: {
        required: true,
        type: Array
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
    methods: {
      updatePage (pageNo) {
        if (pageNo != this.pageNo) {
          this.$router.push({query: { ...this.$route.query, pageNo }})
        }
      },

      getDate (date) {
        const dateObj = new Date(date)

        return `${dateObj.getDay()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`
      }
    }
  }
</script>
<style>
</style>
