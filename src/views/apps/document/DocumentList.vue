<template>

  <div>
    <bread-crumb
        :current-folder-id="currentFolderId"
        :breadcrumb-details="breadcrumbDetails"
        :is-root-dir="isRootDir"
        @fetch-documents="getAllList"
        @remove-breadcrumb-after-id="removeBreadcrumbsAfterFolderId"
    />
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
              <feather-icon icon="UploadIcon"
                            class="mr-1 cursor-pointer"
                            size="30"
                            @click="toggleShowFileModal"

              />
              <feather-icon icon="FolderIcon"
                            class="ml-10 cursor-pointer"
                            size="30"
                            @click="toggleShowFolderModal"
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
      >
        <template #cell(name)="data">
          <div
              class="cursor-pointer"
              @click="getAllFolder(data.item)"
          >
            {{ data.item.name }}

          </div>
          <!--          @click="toggleReadFileModal"-->
<!--          <div-->
<!--              class="cursor-pointer"-->
<!--              v-if="data.item.docType.includes('file')"-->
<!--              @click="openFileContentModal(data.item)"-->
<!--          >-->
<!--            {{ data.item.name }}-->
<!--          </div>-->
        </template>
        <template #cell(userName)="data">
          {{ data.item.userName }}
        </template>
        <template #cell(ACTION)="data">
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
            </template>
            <b-dropdown-item v-if="data.item.userId===requestData.userId">
              <feather-icon icon="EditIcon"
                            class="mr-1 cursor-pointer"
                            v-if="data.item.docType.includes('file')"
                            @click="openEditModal(data.item.id,data.item.docType)"
                            size="18"
              />
              <span class="align-middle ml-50"
                    v-if="data.item.docType.includes('file')"
                    @click="openEditModal(data.item.id,data.item.docType)"
              >Edit</span>
              <feather-icon icon="EditIcon"
                            class="mr-1 cursor-pointer"
                            v-if="data.item.docType.includes('folder')"
                            @click="openEditFolderModal(data.item.id,data.item.docType)"
                            size="18"
              />
              <span class="align-middle ml-50"
                    v-if="data.item.docType.includes('folder')"
                    @click="openEditFolderModal(data.item.id,data.item.docType)"
              >Edit</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="data.item.userId===requestData.userId">
              <feather-icon icon="TrashIcon"
                            v-if="data.item.docType.includes('file')"
                            @click="openDeleteModal(data.item.id,data.item.docType)"
                            class="mr-1 cursor-pointer"
                            size="18"
              />
              <feather-icon icon="TrashIcon"
                            v-if="data.item.docType.includes('folder')"
                            @click="openDeleteFolderModal(data.item.id,data.item.docType)"
                            class="mr-1 cursor-pointer"
                            size="18"
              />
              <span class="align-middle ml-50"
                    v-if="data.item.docType.includes('file')"
                    @click="openDeleteModal(data.item.id,data.item.docType)"
              >Delete</span>
              <span class="align-middle ml-50"
                    v-if="data.item.docType.includes('folder')"
                    @click="openDeleteFolderModal(data.item.id,data.item.docType)"
              >Delete</span>
            </b-dropdown-item>

            <b-dropdown-item v-if="data.item.docType.includes('file')">
              <feather-icon icon="DownloadIcon"
                            class="mr-1 cursor-pointer"
                            @click="downloadFileData(data.item.id)"
                            size="20"
              />
              <span class="align-middle ml-50" v-if="data.item.docType.includes('file')"
                    @click="downloadFileData(data.item.id)"
              >Download</span>
            </b-dropdown-item>
            <b-dropdown-item v-if="data.item.docType.includes('file')">
              <feather-icon icon="SendIcon"
                            class="mr-1 cursor-pointer"
                            @click=getLink(data.item.id)
                            size="20"
              />
              <span class="align-middle ml-50"
                    v-if="data.item.docType.includes('file')"
                    @click=getLink(data.item.id)
              >Share</span>
            </b-dropdown-item>

          </b-dropdown>
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


    <show-edit-modal
        v-if="showEditModal"
        :show-edit-modal="showEditModal"
        :file-details="fileDetails"
        @update-modal="getAllList"
        @close-modal="toggleShowEditModal"

    />
    <show-edit-folder-modal
        v-if="showEditFolderModal"
        :show-edit-folder-modal="showEditFolderModal"
        :folder-details="folderDetails"
        :current-folder-id="currentFolderId"
        @close-modal="toggleShowEditFolderModal"
        @update-modal="getAllList"

    />

    <show-delete-modal
        v-if="showDeleteModal"
        :show-delete-modal="showDeleteModal"
        :file-details="fileDetails"
        @delete-modal="getAllList"
        @close-modal="toggleShowDeleteModal"

    />
    <show-delete-folder-modal
        v-if="showDeleteFolderModal"
        :show-delete-folder-modal="showDeleteFolderModal"
        :folder-details="folderDetails"
        @delete-modal="getAllList"
        @close-modal="toggleShowDeleteFolderModal"
    />
    <show-folder-modal
        v-if="showFolderModal"
        :show-folder-modal="showFolderModal"
        :current-folder-id="currentFolderId"
        @insert-folder-modal="getAllList"
        @close-modal="toggleShowFolderModal"
    />
    <show-file-modal
        v-if="showFileModal"
        :show-file-modal="showFileModal"
        :current-folder-id="currentFolderId"
        @insert-file-modal="getAllList"
        @close-modal="toggleShowFileModal"

    />
    <get-share-link-modal
        v-if="getShareLinkModal"
        :get-share-link-modal="getShareLinkModal"
        :link-details="linkDetails"
        :file-id="fileId"
        @close-modal="toggleGetShareLinkModal"
    />
    <read-file-modal
        v-if="readFileModal"
        :read-file-modal="readFileModal"
        :view-file-details="viewFileDetails"
        @close-modal="toggleReadFileModal"
    />

  </div>

</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTable,
  BPagination,
  BButton,
  BModal,
  BBreadcrumb,
  BBreadcrumbItem,
  BDropdown,
  BDropdownItem,

} from 'bootstrap-vue'
import vSelect from 'vue-select'

import {
  getAllDocument,
  getFileById,
  updateFile,
  getFolderById,
  downloadFile, getShareLink,
} from '@/views/pages/authentication/services/login'
import showEditModal from '@/views/apps/document/editModal.vue'
import showEditFolderModal from '@/views/apps/document/editFolderModal.vue'
import showDeleteModal from '@/views/apps/document/deleteModel.vue'
import showFolderModal from '@/views/apps/document/folderModal.vue'
import showFileModal from '@/views/apps/document/fileModal.vue'
import showDeleteFolderModal from '@/views/apps/document/deleteFolderModal.vue'
import getShareLinkModal from '@/views/apps/document/getShareLink.vue'
import ReadFileModal from '@/views/apps/document/readFileModal.vue'
import readFileModal from '@/views/apps/document/readFileModal.vue'
import { extractFileFormat } from '@/helper/vue-helper'
import BreadCrumb from '@/views/apps/document/Breadcrumbs.vue'

export default {
  components: {
    ReadFileModal,

    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    BButton,
    BModal,
    BBreadcrumb,
    BBreadcrumbItem,
    BDropdown,
    BDropdownItem,
    BreadCrumb,
    showEditModal,
    showEditFolderModal,
    showDeleteModal,
    showFolderModal,
    showFileModal,
    showDeleteFolderModal,
    getShareLinkModal,
    readFileModal,
    vSelect,
  },
  data() {

    return {
      $refs: {
        showEditModal,
        showDeleteModal,
        showFolderModal,
        showFileModal,
        showEditFolderModal,
        showDeleteFolderModal,
        getShareLinkModal,
        readFileModal,
        BreadCrumb,
      },
      requestData: {
        pageNo: 1,
        pageSize: 10,
        sortAs: 'ASC',
        searchValue: '',
        id: 0,
        userId: parseInt(localStorage.getItem('userId')),

      },
      docType: '',
      displayImageFormat: ['jpg', 'png', 'ico'],
      displayPdfFormat: ['pdf'],
      displayTextFormat: ['txt', 'csv', 'html', 'json', 'xml'],
      breadcrumbDetails: [],
      isRootDir:true,
      showEditModal: false,
      showEditFolderModal: false,
      showDeleteModal: false,
      showDeleteFolderModal: false,
      showFolderModal: false,
      showFileModal: false,
      getShareLinkModal: false,
      readFileModal: false,
      fileDetails: null,
      folderDetails: null,
      folderName: '',
      folderId: 0,
      viewFileDetails: {
        isImage: false,
        fileId: null,
        isPdfFile: false,
        isText: false,
        fileExtension: '',
        isWebSupportedFile: false,
      },
      linkDetails: null,
      tableData: [],
      totalRecords: 0,
      currentFolderId: 0,
      fileName: '',
      fileId: 0,
      shareableLink: '',
      perPageOptions: [10, 20, 50],

      tableColumns: [
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'userName',
          label: 'UserName'
        },
        {
          key: 'ACTION',
          label: 'action'

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

  },

  mounted() {
    this.getAllList()
  },
  methods: {

    getAllList(parentFolderId = 0, clearBreadcrumb = false) {
      this.isRootDir = parentFolderId === 0 ? true : false;
      getAllDocument({
        ...this.requestData,
        pageNo: this.requestData.pageNo - 1,
        id: parentFolderId,
      })
          .then(response => {
            if (response?.data) {

              this.tableData = response.data.data.data.content
              this.totalRecords = response.data.data.data.totalElements
              this.currentFolderId = response.data.data.currentFolderId
              this.folderName = response.data.data.folderName
              if (clearBreadcrumb) {
                this.breadcrumbDetails = [];
                this.isRootDir = true;
              }
            }
          })
          .catch(e => {
            console.log(e)

          })

    },
    getAllFolder(data) {
      if (data.docType.includes('folder')) {
        this.isRootDir = false;
        getAllDocument({
          ...this.requestData,
          id: data.id,
          pageNo: this.requestData.pageNo - 1
        })
            .then(response => {
              if (response?.data) {
                if (!this.checkExistingFolderBreadcrumbs(data.id)) {
                  this.updateBreadcrumbActiveStatus(false);
                  this.breadcrumbDetails.push({
                    id: data.id,
                    folderName: data.name,
                    isActive: true,
                  });
                }
                this.tableData = response.data.data.data.content
                this.totalRecords = response.data.data.data.totalElements
                this.currentFolderId = response.data.data.currentFolderId

              }
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        this.openFileContentModal(data)
      }
    },
    checkExistingFolderBreadcrumbs(folderId) {
      return this.breadcrumbDetails.find((folder) => folder.id === folderId);
    },
    updateBreadcrumbActiveStatus(status) {
      this.breadcrumbDetails.map((folder) => (folder.isActive = status));
    },
    removeBreadcrumbsAfterFolderId(folderId) {
      let index = this.breadcrumbDetails.findIndex(
          (data) => data.id === folderId

      );

      this.updateBreadcrumbActiveStatus(false);
      const breadcrumbList = this.breadcrumbDetails.slice(0, index + 1);
      if (breadcrumbList && breadcrumbList.length) {
        breadcrumbList[breadcrumbList.length - 1].isActive = true;
        this.breadcrumbDetails = [...breadcrumbList];
      }
    },
    toggleShowEditModal() {
      // this.fileDetails=null;
      this.showEditModal = false
      this.showFolderModal = false

    },
    toggleShowDeleteModal() {
      this.showDeleteModal = !this.showDeleteModal
    },
    toggleShowFolderModal() {
      this.showFolderModal = !this.showFolderModal
    },
    toggleShowFileModal() {
      this.showFileModal = !this.showFileModal
    },
    toggleShowEditFolderModal() {
      this.showEditFolderModal = !this.showEditFolderModal
    },
    toggleShowDeleteFolderModal() {
      this.showDeleteFolderModal = !this.showDeleteFolderModal
    },
    toggleGetShareLinkModal() {
      this.getShareLinkModal = !this.getShareLinkModal
    },
    toggleReadFileModal() {

      this.readFileModal = false
      this.viewFileDetails.isImage = false
      this.viewFileDetails.isPdfFile = false
      this.viewFileDetails.isText = false
      this.viewFileDetails.isWebSupportedFile = false
    },
    openEditModal(id, docType) {
      if (docType === 'file') {

        getFileById({ id })
            .then(response => {

              if (response?.data) {
                this.fileDetails = response.data.data
                this.showEditModal = true
              }
            })
            .catch(e => {
              console.log(e)
            })
      }

    },
    openEditFolderModal(id, docType) {
      if (docType.includes('folder')) {
        getFolderById({ id })
            .then(response => {

              if (response?.data) {
                this.folderDetails = response.data.data
                this.showEditFolderModal = true

              }
            })
            .catch(e => {
              console.log(e)
            })
      }

    },

    openDeleteModal(id, docType) {
      if (docType.includes('file')) {

        getFileById({ id })
            .then(response => {
              if (response.data) {
                this.fileDetails = response.data.data
                this.showDeleteModal = true

              }
            })
            .catch(e => {
              console.log(e)
            })
      }

    },

    openDeleteFolderModal(id, docType) {
      if (docType.includes('folder')) {

        getFolderById({ id })
            .then(response => {
              if (response.data) {
                this.folderDetails = response.data.data
                this.showDeleteFolderModal = true
              }

            })
            .catch(e => {
              console.log(e)
            })
      }

    },
    downloadFileData(id) {
      downloadFile({ id })
          .then(response => {
            if (response?.data) {
              window.open(response.data.data)
            }

          })
          .catch(e => {
            console.log(e)
          })

    },
    getLink(id) {
      getShareLink({ id })
          .then((response) => {
            if (response?.data) {

              this.linkDetails = response.data.data
              this.fileName = response.data.data.fileName
              this.fileId = id
              this.shareableLink = response.data.data.shareableLink
              this.getShareLinkModal = true

            }
          })
          .catch(e => {
            console.log(e)
          })

    },

    openFileContentModal(fileDetails) {
      this.viewFileDetails.fileId = fileDetails.id
      // this.viewFileDetails.fileName = fileDetails.name
      const fileExtension = extractFileFormat(fileDetails.name)

      if (this.displayImageFormat.includes(fileExtension)) {
        this.viewFileDetails.isImage = true
        this.viewFileDetails.fileExtension = fileExtension
        this.readFileModal = true
      } else if (this.displayPdfFormat.includes(fileExtension)) {
        this.viewFileDetails.isPdfFile = true
        this.viewFileDetails.fileExtension = fileExtension
        this.readFileModal = true
      } else if (this.displayTextFormat.includes(fileExtension)) {
        this.viewFileDetails.isText = true
        this.viewFileDetails.fileExtensions = fileExtension
        this.readFileModal = true
      } else if (this.displayTextFormat.includes(fileExtension)) {
        this.viewFileDetails.isWebSupportedFile = true
        this.viewFileDetails.fileExtensions = fileExtension
        this.readFileModal = true
      } else {
        this.$toast.error('Format is not supported')
      }

    },
    changePerPage(val) {
      this.requestData.pageSize = val
      this.requestData.pageNo = 1
      this.getAllList()
    },
    getSearch(val) {
      this.requestData.searchValue = val
      this.getAllList()
    },
    nextPage() {
      this.getAllList()
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
