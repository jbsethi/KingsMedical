<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <orders-table
            @create:order="toggleCreateOrderModal(true)"
            @viewOrder="viewDetails"
            @uploadInvoice="uploadInvoice"
            @returnOrder="returnOrder"
            @click:viewInvoice="viewInvoice"
            title="Orders Record"
            :pageNo="pageNo"
            :meta="orderMeta"
            :tableData="orders"
          ></orders-table>
        </div>
      </div>
    </div>

    <CreateOrderStepForm :showCreateModal="createOrderModal" @click:close="toggleCreateOrderModal(false)"/>

    <Modal :show="returnOrderModal" @close="toggleReturnOrderModal(false)">
      <template>
        <ReturnOrderForm v-if="returnOrderModal" :orderID="returnOrderID" @click:close="toggleReturnOrderModal(false)"/>
      </template>
    </Modal>

    <Modal modalClasses="modal--max-width" :show="viewOrderModal" @close="toggleCreateOrderModal(false, true)">
      <template>
        <CreateOrderForm v-if="viewOrderModal" :orderDetails="order" />
      </template>
    </Modal>

    <Modal :show="uploadInvoiceModal" @close="toggleUploadInvoiceModal(false)">
      <template>
        <div class="upload-invoice">
          <form
            enctype="multipart/form-data"
            novalidate
            v-if="isInitial || isSaving"
          >
            <h3>Upload Invoice</h3>
            <div class="dropbox">
              <input
                type="file"
                multiple
                :name="uploadFieldName"
                :disabled="isSaving"
                @change="
                  filesChange($event.target.name, $event.target.files);
                  fileCount = $event.target.files.length;
                "
                class="input-file"
              />
              <p v-if="isInitial">
                Drag your file(s) here to begin<br />
                or click to browse
              </p>
              <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
            </div>
          </form>
        </div>
      </template>
    </Modal>

    <Modal modalClasses="modal--max-width" :show="showInvoice" @close="toggleShowInvoice(false)">
      <template>
        <div>
          <img class="image-preview" :src="`${PUBLIC_URL}/${invoiceAttachment}`" alt="" />
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import OrdersTable from './Order/OrdersTable';
import { PUBLIC_URL } from '@/.env'

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  components: {
    OrdersTable,
    Modal: () => import('./../components/Modal'),
    CreateOrderForm: () => import('./Order/CreateOrderForm'),
    ReturnOrderForm: () => import('./Order/ReturnOrderForm'),
    CreateOrderStepForm: () => import('./Order/CreateOrderStepForm')
  },
  data() {
    return {
      PUBLIC_URL: PUBLIC_URL,
      pageNo: 1,
      createOrderModal: false,
      viewOrderModal: false,
      uploadInvoiceModal: false,
      returnOrderModal: false,

      isViewDetails: false,
      returnOrderID: null,

      order: {},

      showInvoice: false,
      invoiceAttachment: '',

      invoice: {
        orderId: null
      },

      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'attachment'
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
    ...mapState({
      orders: (state) => state.orders.orders,
      orderMeta: (state) => state.orders.meta
    })
  },
  methods: {
    returnOrder (orderID) {
      this.returnOrderID = orderID
      this.toggleReturnOrderModal(true)
    },

    viewInvoice (payload) {
      this.getOrderInvoice(payload)
        .then((resp) => {
          if (resp.data.length > 0) {
            this.invoiceAttachment = resp.data[0].attachment
            this.toggleShowInvoice(true)
          } else {
            alert('No Invoice For the order')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },

    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      this.createInvoice(formData)
        .then(() => {
          this.currentStatus = STATUS_SUCCESS;
          this.reset();
          this.$notify('Invoice Uploaded successfully !');
          this.toggleUploadInvoiceModal(false);
        })
        .catch((err) => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
          this.$notify('Error occured please try again !')
          this.toggleUploadInvoiceModal(false)
        });
    },

    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // append Order id to FormData
      formData.append('orderId', this.invoice.orderId);

      // save it
      this.save(formData);
    },

    toggleCreateOrderModal(status, isViewDetails = false) {
      this.isViewDetails = isViewDetails;
      if (isViewDetails) {
        this.viewOrderModal = status
      } else {
        this.createOrderModal = status;
      }
    },

    toggleUploadInvoiceModal(status) {
      this.uploadInvoiceModal = status;
    },

    toggleShowInvoice(status) {
      this.showInvoice = status;
    },

    toggleReturnOrderModal (status) {
      this.returnOrderModal = status;
    },

    uploadInvoice(orderId) {
      this.invoice.orderId = orderId;
      this.toggleUploadInvoiceModal(true);
    },

    storeInvoice() {
      this.createInvoice(this.invoice).then(() => {
        console.log('upload successfull !');
      });
    },

    viewDetails(orderId) {
        window.open(`/orders/details/${orderId}`, 'chart', 'width=1225, height=770')
    },

    ...mapActions('orders', ['getAllOrders', 'getOrderDetails']),
    ...mapActions('invoices', ['createInvoice', 'getOrderInvoice'])
  },
  watch: {
    '$route.query': {
      immediate: true,
      deep: true,
      handler(query) {
        const q = query.q || null
        if (
          query.pageNo &&
          Number.isInteger(query.pageNo) &&
          query.pageNo > 0
        ) {
          this.getAllOrders({ pageNo: query.pageNo, search: q });
          this.pageNo = query.pageNo;
        } else {
          this.getAllOrders({ search: q });
        }

        this.reset();
      }
    }
  }
};
</script>

<style lang="scss">
.modal--max-width {
  max-width: 1200px;
}

.image-preview {
  max-width: 100%;
  height: auto;
}
</style>

<style lang="scss" scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
