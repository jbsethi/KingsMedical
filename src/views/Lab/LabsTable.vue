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
          <base-button @click="$emit('create:lab')" type="primary" size="sm">Create Lab</base-button>
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
          <th>Name</th>
          <th>Location</th>
          <th>Description</th>
          <th>Status</th>
          <th></th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              <a href="#" class="avatar rounded-circle mr-3">
                <img v-if="row.img" alt="Image placeholder" :src="row.img">
                <span v-if="!row.img">{{ row.name[0] }}</span>
              </a>
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.name}}</span>
              </div>
            </div>
          </th>
          <td class="location">
            {{row.location}}
          </td>
          <td class="description">
            {{row.description}}
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.active ? 'primary': 'danger'">
              <i :class="`bg-${row.active ? 'primary': 'danger'}`"></i>
              <span class="status">{{row.active}}</span>
            </badge>
          </td>
          <td class="text-right">
            <base-dropdown class="dropdown"
                           position="right">
              <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-ellipsis-v"></i>
              </a>

              <template>
                <a @click.stop="$emit('edit:lab', row.id)" class="dropdown-item" href="#">
                  Edit
                </a>
                <a class="dropdown-item" href="#">
                  Remove
                </a>
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
    name: 'labs-table',
    props: {
      type: {
        type: String
      },
      title: String,
      tableData: {
        required: true,
        type: Array
      }
    },
    data() {
      return {
      }
    }
  }
</script>
<style>
</style>
