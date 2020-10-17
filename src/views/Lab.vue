<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <labs-table title="Labs Record"></labs-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LabsTable from './Lab/LabsTable'
export default {
  components: {
    LabsTable
  },
  data() {
    return {
    }
  }
}
</script>
<style></style>
