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
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>Entries</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >

            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="searchQuery"
                class="d-inline-block mr-1"
                placeholder="Search..."
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
        empty-text="No matching records found"
      >

        <!-- Column: User -->
        <template #cell(user)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :src="data.item.avatar"
                :text="avatarText(data.item.fullName)"
                :variant="`light-${resolveUserRoleVariant(data.item.role)}`"
                :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
              />
            </template>
            <b-link
              :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
              class="font-weight-bold d-block text-nowrap"
            >

              {{ data.item.fullName }}
            </b-link>
            <!--            <small class="text-muted">@{{ data.item.username }}</small>-->
          </b-media>
        </template>
        <!-- <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.status)}`"
            class="text-capitalize"
          >
            text="LastLogin"
          </b-badge>
        </template> -->
        <!-- Column: Role -->
        <!-- <template #cell(role)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="resolveUserRoleIcon(data.item.role)"
              size="18"
              class="mr-50"
              :class="`text-${resolveUserRoleVariant(data.item.role)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.role }}</span>
          </div>
        </template> -->

        <!-- Column: Status -->
        <!-- <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.status)}`"
            class="text-capitalize"
          >
            {{ data.item.status }}
          </b-badge>
        </template> -->

        <!-- Column: Actions -->
        <!-- <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >

            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template> -->
        <!--            <b-dropdown-item :to="{ name: 'apps-users-view', params: { id: data.item.id } }">-->
        <!--              <feather-icon icon="FileTextIcon" />-->
        <!--              <span class="align-middle ml-50">Details</span>-->
        <!--            </b-dropdown-item>-->

        <!-- <b-dropdown-item :to="{ name: 'apps-users-edit', params: { id: data.item.id } }">
          <feather-icon icon="EditIcon" />
          <span class="align-middle ml-50">Edit</span>
        </b-dropdown-item>

        <b-dropdown-item>
          <feather-icon icon="TrashIcon" />
          <span class="align-middle ml-50">Delete</span>
        </b-dropdown-item>
      </b-dropdown>
    </template> -->

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} Entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalUsers"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
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
  BCard, BRow, BCol, BFormInput, BTable, BMedia, BAvatar, BLink, BPagination,
} from 'bootstrap-vue'

import { getAllUsers } from '@/views/pages/authentication/services/login'
// import{getUserEnums  } from '@/views/apps/user/userems'
// import { response } from 'express'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,

    BTable,
    BMedia,
    BAvatar,
    BLink,

    BPagination,

  },
  data() {
    return {
      requestData: {
        pageNo: 1,
        pageSize: 5,
        sortAs: 'ASC',
        // sortBy: firstName,

      },

      tableData: [],

      // perPagesize:5,
      totalrecords: 0,
      // currentPage:1,
      perPageOptions: [5, 10],

      tableColumns: [
        { key: 'firstName', label: 'firstName', sortable: true },
        { key: 'lastName', label: 'lastName', sortable: true },
        { key: 'email', label: 'email', sortable: true },
      ],

    }
  },
  mounted() {
    this.getAllData()
  },
  methods: {
    getAllData() {
      getAllUsers({
        ...this.requestData,
      })
        .then(response => {
          console.log(' before data printed')
          if (response.data.content !== '') {
            this.tableData = response.data.content
            this.totalrecords = response.data.totalElements
            console.log('table data', this.tableData)
          }
        }).catch(e => {
          console.log(e)
        })
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

<!-- <b-sidebar
  id="add-new-user-sidebar"
  :visible="isAddNewUserSidebarActive"
  bg-variant="white"
  sidebar-class="sidebar-lg"
  shadow
  backdrop
  no-header
  right
  @hidden="resetForm"
  @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
> -->
<!-- <template #default="{ hide }"> -->
<!-- Header -->
<!-- <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
  <h5 class="mb-0">
    Invite User
  </h5>

  <feather-icon
    class="ml-1 cursor-pointer"
    icon="XIcon"
    size="16"
    @click="hide"
  />

</div> -->

<!-- BODY -->
<!-- <validation-observer
  #default="{ handleSubmit }"
  ref="refFormObserver"
> -->
<!-- Form -->
<!-- <b-form
  class="p-2"
  @submit.prevent="handleSubmit(onSubmit)"
  @reset.prevent="resetForm"
> -->

<!-- Full Name -->
<!-- <validation-provider
  #default="validationContext"
  name="Full Name"
  rules="required"
>
  <b-form-group
    label="Full Name"
    label-for="full-name"
  >
    <b-form-input
      id="full-name"
      v-model="userData.fullName"
      autofocus
      :state="getValidationState(validationContext)"
      trim
      placeholder="John Doe"
    />

    <b-form-invalid-feedback>
      {{ validationContext.errors[0] }}
    </b-form-invalid-feedback>
  </b-form-group>
</validation-provider> -->

<!-- LastName -->
<!-- <validation-provider
  #default="validationContext"
  name="Lastname"
  rules="required|alpha-num"
>
  <b-form-group
    label="Lastname"
    label-for="Lastname"
  >
    <b-form-input
      id="lastname"
      v-model="userData.username"
      :state="getValidationState(validationContext)"
      trim
    />

    <b-form-invalid-feedback>
      {{ validationContext.errors[0] }}
    </b-form-invalid-feedback>
  </b-form-group> -->
<!-- </validation-provider> -->

<!-- Email -->
<!-- <validation-provider
  #default="validationContext"
  name="Email"
  rules="required|email"
>
  <b-form-group
    label="Email"
    label-for="email"
  >
    <b-form-input
      id="email"
      v-model="userData.email"
      :state="getValidationState(validationContext)"
      trim
    />

    <b-form-invalid-feedback>
      {{ validationContext.errors[0] }}
    </b-form-invalid-feedback>
  </b-form-group>
</validation-provider> -->

<!--          &lt;!&ndash; Company &ndash;&gt;-->
<!--          <validation-provider-->
<!--            #default="validationContext"-->
<!--            name="Contact"-->
<!--            rules="required"-->
<!--          >-->
<!--            <b-form-group-->
<!--              label="Contact"-->
<!--              label-for="contact"-->
<!--            >-->
<!--              <b-form-input-->
<!--                id="contact"-->
<!--                v-model="userData.contact"-->
<!--                :state="getValidationState(validationContext)"-->
<!--                trim-->
<!--              />-->

<!--              <b-form-invalid-feedback>-->
<!--                {{ validationContext.errors[0] }}-->
<!--              </b-form-invalid-feedback>-->
<!--            </b-form-group>-->
<!--          </validation-provider>-->

<!--          &lt;!&ndash; Company &ndash;&gt;-->
<!--          <validation-provider-->
<!--            #default="validationContext"-->
<!--            name="Company"-->
<!--            rules="required"-->
<!--          >-->
<!--            <b-form-group-->
<!--              label="Company"-->
<!--              label-for="company"-->
<!--            >-->
<!--              <b-form-input-->
<!--                id="company"-->
<!--                v-model="userData.company"-->
<!--                :state="getValidationState(validationContext)"-->
<!--                trim-->
<!--              />-->

<!--              <b-form-invalid-feedback>-->
<!--                {{ validationContext.errors[0] }}-->
<!--              </b-form-invalid-feedback>-->
<!--            </b-form-group>-->
<!--          </validation-provider>-->

<!--          &lt;!&ndash; Country &ndash;&gt;-->
<!--          <validation-provider-->
<!--            #default="validationContext"-->
<!--            name="Country"-->
<!--            rules="required"-->
<!--          >-->
<!--            <b-form-group-->
<!--              label="Country"-->
<!--              label-for="country"-->
<!--              :state="getValidationState(validationContext)"-->
<!--            >-->
<!--              <v-select-->
<!--                v-model="userData.country"-->
<!--                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"-->
<!--                :options="countries"-->
<!--                :clearable="false"-->
<!--                input-id="country"-->
<!--              />-->
<!--              <b-form-invalid-feedback :state="getValidationState(validationContext)">-->
<!--                {{ validationContext.errors[0] }}-->
<!--              </b-form-invalid-feedback>-->
<!--            </b-form-group>-->
<!--          </validation-provider>-->

<!-- User Role -->
<!-- <validation-provider
  #default="validationContext"
  name="User Role"
  rules="required"
>
  <b-form-group
    label="Role"
    label-for="user-role"
    :state="getValidationState(validationContext)"
  >
    <v-select
      v-model="userData.role"
      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
      :options="roleOptions"
      :reduce="val => val.value"
      :clearable="false"
      input-id="user-role"
    />
    <b-form-invalid-feedback :state="getValidationState(validationContext)">
      {{ validationContext.errors[0] }}
    </b-form-invalid-feedback>
  </b-form-group>
</validation-provider> -->

<!--          &lt;!&ndash; Plan &ndash;&gt;-->
<!--          <validation-provider-->
<!--            #default="validationContext"-->
<!--            name="Plan"-->
<!--            rules="required"-->
<!--          >-->
<!--            <b-form-group-->
<!--              label="Plan"-->
<!--              label-for="plan"-->
<!--              :state="getValidationState(validationContext)"-->
<!--            >-->
<!--              <v-select-->
<!--                v-model="userData.currentPlan"-->
<!--                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"-->
<!--                :options="planOptions"-->
<!--                :reduce="val => val.value"-->
<!--                :clearable="false"-->
<!--                input-id="plan"-->
<!--              />-->
<!--              <b-form-invalid-feedback :state="getValidationState(validationContext)">-->
<!--                {{ validationContext.errors[0] }}-->
<!--              </b-form-invalid-feedback>-->
<!--            </b-form-group>-->
<!--          </validation-provider>-->

<!-- Form Actions -->
<!-- <div class="d-flex mt-2">
  <b-button
    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
    variant="primary"
    class="mr-2"
    type="submit"
  >
   Send Invite
  </b-button>
  <b-button
    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
    type="button"
    variant="outline-secondary"
    @click="hide"
  >
    Cancel
  </b-button>
</div> -->

<!-- </b-form>
</validation-observer>
</template>
</b-sidebar> -->
