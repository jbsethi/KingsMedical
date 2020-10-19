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
        <div class="col text-right">
          <base-button type="primary" size="sm">Create Order</base-button>
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
          <th>Details</th>
          <th>Billed</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <td class="id">
            {{row.id}}
          </td>
          <td class="emirates-id">
            {{row.emiratesID}}
          </td>
          <td class="details">
            <a href="#">View Details</a>
          </td>
          <td class="billed">
            {{row.billed}}
          </td>
          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </template>
            </base-dropdown>
          </td>

        </template>

      </base-table>
    </div>

    <div class="card-footer d-flex justify-content-end"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <base-pagination :total="30"></base-pagination>
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
      title: String
    },
    data() {
      return {
        tableData: [
          {
            id: '456215',
            emiratesID: '5646a5s4d86a1s',
            billed: '500$'
          },
          {
            id: '456215',
            emiratesID: '5646a5s4d86a1s',
            billed: '500$'
          },
          {
            id: '456215',
            emiratesID: '5646a5s4d86a1s',
            billed: '500$'
          },
          {
            id: '456215',
            emiratesID: '5646a5s4d86a1s',
            billed: '500$'
          },
          {
            id: '456215',
            emiratesID: '5646a5s4d86a1s',
            billed: '500$'
          },
          {
            id: '456215',
            emiratesID: '5646a5s4d86a1s',
            billed: '500$'
          },
          {
            id: '456215',
            emiratesID: '5646a5s4d86a1s',
            billed: '500$'
          }
        ]
      }
    }
  }
</script>
<style>
</style>
