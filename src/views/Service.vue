<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <services-table title="Services Record"></services-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ServicesTable from './Service/ServicesTable'
export default {
  components: {
    ServicesTable
  },
  data() {
    return {
    }
  }
}
</script>
<style></style>
