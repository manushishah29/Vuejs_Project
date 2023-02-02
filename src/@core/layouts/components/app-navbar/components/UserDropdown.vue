<template>
  <b-nav-item-dropdown
      right
      toggle-class="d-flex align-items-center dropdown-user-link"
      class="dropdown-user"
  >

    <template #button-content>


      <!--      <b-nav-item-dropdown-->

      <!--          text="Company"-->
      <!--          class="mr-50"-->
      <!--      >-->
      <b-dropdown text="Company" class="mr-1" variant="primary" size="sm">
        <b-dropdown-item
            v-for="(company,index) in requestData.listCompany"
            :key="index"

            href="#"
            :to="{ name: 'apps-todo' }"
            link-class="d-flex align-items-center"
            :value="company.companyId"
            @click="()=> displayUsers(company.companyId)"


        >
          <span>{{ company.companyName }}</span>
          <span>--</span>
          <span>{{ company.companyId }}</span>
        </b-dropdown-item>
      </b-dropdown>


      <!--      </b-nav-item-dropdown>-->
      <b-avatar
          size="30"
          variant="light-primary"
          badge
          class="badge-minimal"
          badge-variant="success"
      >
        <feather-icon

            icon="LogOutIcon"
            size="16"
            class="mr-50"
        />
      </b-avatar>

    </template>

    <b-dropdown-item
        :to="{ name: 'apps-todo' }"
        link-class="d-flex align-items-center"
        @click="logout"
    >
      <feather-icon
          size="16"
          icon="LogOutIcon"
          class="mr-50"
      />
      <span>Logout</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>

</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BAvatar, BDropdown,
} from 'bootstrap-vue'
import { getAllCompany } from '@/views/pages/authentication/services/login'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    // BDropdownDivider,
    BAvatar,
    BDropdown,

  },

  data() {
    return {
      requestData: {
        listCompany: [],

      },

    }
  },

  mounted() {
    this.getCompany()
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({ name: 'auth-login' })
    },
    getCompany() {
      getAllCompany({ ...this.requestData })
          .then(response => {
            this.$store.commit('update', response.data.data.content[0].companyId)
            if (response?.data?.data?.content) {
              this.requestData.listCompany = response.data.data.content
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    displayUsers(companyId) {
      this.$store.commit('update', companyId)
      this.$router.push(`/users/${companyId}`)
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .dropdown-menu {
  width: 200px !important;
}
</style>
