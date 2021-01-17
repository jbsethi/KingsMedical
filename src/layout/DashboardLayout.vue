<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard'
          }"
        />

        <sidebar-item
          v-if="['Administrator', 'Doctor', 'Management'].includes(role || null)"
          :link="{
            name: 'Orders',
            icon: 'ni ni-folder-17 text-primary',
            path: '/orders'
          }"
        />

        <sidebar-item
          v-if="['Administrator', 'Management'].includes(role || null)"
          :link="{
            name: 'Labs',
            icon: 'ni ni-shop text-primary',
            path: '/labs'
          }"
        />

        <sidebar-item
          v-if="['Administrator', 'Management'].includes(role || null)"
          :link="{
            name: 'Service Types',
            icon: 'ni ni-delivery-fast text-primary',
            path: '/service-types'
          }"
        />

        <sidebar-item
          v-if="['Administrator', 'Management'].includes(role || null)"
          :link="{
            name: 'Services',
            icon: 'ni ni-delivery-fast text-primary',
            path: '/services'
          }"
        />

        <sidebar-item
          v-if="['Administrator'].includes(role || null)"
          :link="{
            name: 'Users',
            icon: 'ni ni-circle-08 text-primary',
            path: '/users'
          }"
        />

        <sidebar-item
          v-if="['Administrator'].includes(role || null)"
          :link="{
            name: 'Roles',
            icon: 'ni ni-badge text-primary',
            path: '/roles'
          }"
        />

        <!-- <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>
        <sidebar-item :link="{name: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps'}"/>
        <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>
        <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>
        <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/> -->

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    computed: {
      role  () {
        return this.$store.state.user?.currentUser?.role?.name || null
      }
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
