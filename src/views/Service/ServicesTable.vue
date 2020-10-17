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
          <base-button type="primary" size="sm">See all</base-button>
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
          <th>Title</th>
          <th>Type</th>
          <th>Price</th>
          <th>Replace Duration</th>
          <th>Status</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img v-if="row.img" alt="Image placeholder" :src="row.img">
                <span v-if="!row.img">{{ row.title[0] }}</span>
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          <td class="type">
            {{row.type}}
          </td>
          <td class="price">
            {{row.price}}
          </td>
          <td class="replace-duration">
            {{row.replaceDuration}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.status ? 'primary': 'danger'">
              <i :class="`bg-${row.status ? 'primary': 'danger'}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
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
            img: 'img/theme/bootstrap.jpg',
            title: 'Zircon',
            type: 'Work Case',
            price: '200$',
            replaceDuration: '1 month',
            status: false,
          },
          {
            title: 'Zircon',
            type: 'Work Case',
            price: '200$',
            replaceDuration: '1 month',
            status: false,
          },
          {
            title: 'Zircon',
            type: 'Work Case',
            price: '200$',
            replaceDuration: '1 month',
            status: false,
          }
        ]
      }
    }
  }
</script>
<style>
</style>
