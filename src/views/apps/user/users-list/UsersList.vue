<template>

  <div>
    <!-- Table Container Card -->
    <b-card
        no-body
        class="mb-0"
    >
      <div class="m-2">

        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
              cols="12"
              md="6"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
                v-model="requestData.pageSize"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="perPageOptions"
                :clearable="false"
                class="per-page-selector d-inline-block mx-50"
                @input="changePerPage"
            />
            <!--            <label>Entries</label>-->
          </b-col>

          <!-- Search -->
          <b-col
              cols="12"
              md="6"
          >

            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                  v-model="requestData.searchValue"
                  class="d-inline-block mr-1"
                  placeholder="Search..."
                  @input="getSearch"
              />
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
          ref="refUserListTable"
          class="position-relative"
          :items="tableData"
          responsive
          :fields="tableColumns"
          primary-key="id"
          show-empty
          no-local-sorting
          empty-text="No matching records found"
          :sort-by.prop="getSortBy"
          :sort-desc="requestData.sortAs === 'DESC'"
          @sort-changed="sortChanged"
      >

        <!-- Column: User -->
        <template #cell(FIRSTNAME)="data">
          {{ data.item.firstName }}
        </template>
        <template #cell(LASTNAME)="data">
          {{ data.item.lastName }}
        </template>
        <template #cell(EMAIL)="data">
          {{ data.item.email }}
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span
                class="text-muted"
            >Showing {{ totalRecords === 0 ? 0 : pageStart }} to
              {{ pageEnd }}
              of {{ totalRecords }} Users
            </span>
          </b-col>

          <!-- Pagination -->
          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
                v-model="requestData.pageNo"
                :total-rows="totalRecords"
                :per-page="requestData.pageSize"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
                @input="nextPage"
            >
              <template #prev-text>
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
              </template>
            </b-pagination>

          </b-col>

        </b-row>
      </div>
    </b-card>

  </div>

</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BTable, BPagination, BButton, BModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { getAllUsers } from '@/views/pages/authentication/services/login'
import { getUserEnums } from '@/views/apps/user/userems'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    BButton,
    BModal,

    vSelect,
  },
  data() {
    return {
      requestData: {
        pageNo: 1,
        pageSize: 5,
        sortAs: 'ASC',
        searchValue: '',
        sortBy: getUserEnums.FIRSTNAME,
        companyId: this.$route.params.companyId,

      },
      tableData: [],
      totalRecords: 0,
      perPageOptions: [5, 10, 15,20],

      tableColumns: [
        {
          key: 'FIRSTNAME',
          label: 'firstName',
          sortable: true
        },
        {
          key: 'LASTNAME',
          label: 'lastName',
          sortable: true
        },
        {
          key: 'EMAIL',
          label: 'Email',
          sortable: true
        },
      ],

    }
  },
  computed: {
    pageStart() {
      return this.requestData.pageSize * (this.requestData.pageNo - 1) + 1
    },
    pageEnd() {
      return this.totalRecords
      > this.requestData.pageSize * this.requestData.pageNo
          ? this.requestData.pageSize * this.requestData.pageNo // 3>3?3:3
          : this.totalRecords
    },
    getSortBy() {
      if (this.requestData.sortBy === 'FIRSTNAME') {
        return 'FIRSTNAME'
      }
      if (this.requestData.sortBy === 'LASTNAME') {
        return 'LASTNAME'
      }
      return this.requestData.sortBy
    },
  },
  mounted() {
    this.getAllData()
  },
  methods: {

    getAllData() {
      getAllUsers({
        ...this.requestData,
        pageNo: this.requestData.pageNo - 1
      }, this.requestData.companyId)
          .then(response => {
            if (response?.data?.data?.content) {
              if (this.requestData.companyId) {
                this.tableData = response.data.data.content
                this.totalRecords = response.data.data.totalElements
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
    },

    sortChanged(val) {
      this.requestData.sortBy = val === ''
          ? getUserEnums.FIRSTNAME
          : getUserEnums.LASTNAME
      this.requestData.sortAs = `${val.sortDesc ? 'DESC' : 'ASC'}`
      this.getAllData()
    },
    changePerPage(val) {
      this.requestData.pageSize = val
      this.requestData.pageNo = 1
      this.getAllData()
    },

    getSearch(val) {
      this.requestData.searchValue = val
      this.getAllData()
    },
    nextPage() {
      this.getAllData()
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
