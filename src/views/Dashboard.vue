<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total OrderS"
                                type="gradient-red"
                                :sub-title="`${totalOrdersCount}`"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template> -->
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total Invoices"
                                type="gradient-orange"
                                :sub-title="`${totalInvoicesCount}`"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template> -->
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Users"
                                type="gradient-green"
                                :sub-title="`${totalUsersCount}`"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template> -->
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Services"
                                type="gradient-info"
                                :sub-title="`${totalServicesCount}`"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0"
                    >

                        <!-- <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template> -->
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!--Charts-->
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-8 mb-5 mb-xl-0">
                    <card type="default" header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                <h5 class="h3 text-white mb-0">Current Week</h5>
                            </div>
                        </div>
                        <line-chart
                                :height="350"
                                ref="bigChart"
                                :chart-data="bigLineChart.chartData"
                                :extra-options="bigLineChart.extraOptions"
                        >
                        </line-chart>

                    </card>
                </div>

                <div class="col-xl-4">
                    <card header-classes="bg-transparent">
                        <div slot="header" class="row align-items-center">
                            <div class="col">
                                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                                <h5 class="h3 mb-0">Total orders</h5>
                            </div>
                        </div>

                        <bar-chart
                                :height="350"
                                ref="barChart"
                                :chart-data="redBarChart.chartData"
                        >
                        </bar-chart>
                    </card>
                </div>
            </div>
            <!-- End charts-->
        </div>

    </div>
</template>
<script>
  import { mapActions } from 'vuex'
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  export default {
    components: {
      LineChart,
      BarChart,
    },
    data() {
      return {
        totalOrdersCount: 0,
        totalInvoicesCount: 0,
        totalUsersCount: 0,
        totalServicesCount: 0,
        bigLineChart: {
          labels: [],
          allData: [],

          activeIndex: 0,
          chartData: {
            datasets: [],
            labels: [],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: [],
            datasets: [{
              label: 'Order',
              data: []
            }]
          }
        }
      };
    },
    methods: {
      initDataDashboard () {
        this.getOrderStatWeek()
          .then(resp => {
            console.log(resp)
            this.bigLineChart.allData = Object.keys(resp.data.content).map(label => {
              return resp.data.content[label]
            })

            let chartData = {
              datasets: [
                {
                  label: 'Performance',
                  data: this.bigLineChart.allData
                }
              ],
              labels: Object.keys(resp.data.content),
            }

            this.bigLineChart.chartData = chartData
          })
          .catch(err => {
            if (err.status == 404) {
              console.log(err.status)

            } else {
              this.$notify(err.message)
            }
          })

        this.getOrderStatMonthly()
          .then(resp => {
            console.log(resp)
            const labels = Object.keys(resp.data.content)

            this.redBarChart = {
              chartData: {
                labels: labels,
                datasets: [{
                  label: 'Order',
                  data: Object.values(resp.data.content)
                }]
              }
        }
          })
          .catch(err => {
            if (err.status == 404) {
              console.log(err.status)

            } else {
              this.$notify(err.message)
            }
          })

        this.totalOrders()
          .then(resp => {
            console.log(resp)
            this.totalOrdersCount = resp.data.meta.total
          })
          .catch(err => {
            console.log(err)
          })

        this.totalInvoices()
          .then(resp => {
            console.log(resp)
            this.totalInvoicesCount = resp.data.meta.total
          })
          .catch(err => {
            console.log(err)
          })

        this.totalUsers()
          .then(resp => {
            console.log(resp)
            this.totalUsersCount = resp.data.meta.total
          })
          .catch(err => {
            console.log(err)
          })

        this.totalServices()
          .then(resp => {
            console.log(resp)
            this.totalServicesCount = resp.data.meta.total
          })
          .catch(err => {
            console.log(err)
          })
      },

      initBigChart() {
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData
            }
          ],
          labels: [1, 2, 3, 4, 5, 6, 7],
        };
        this.bigLineChart.chartData = chartData
        this.bigLineChart.activeIndex = 0
      },

      ...mapActions('orders', [
        'getOrderStatWeek',
        'getOrderStatMonthly',
        'totalOrders'
      ]),
      ...mapActions('invoices', [
        'totalInvoices'
      ]),
      ...mapActions('user', [
        'totalUsers'
      ]),
      ...mapActions('services', [
        'totalServices'
      ])
    },
    mounted() {
      this.initBigChart(0);

      this.initDataDashboard()
    }
  };
</script>
<style></style>
