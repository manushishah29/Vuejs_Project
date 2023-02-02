<template>
  <b-modal
      v-model="showModal"
      size="lg"
      title="Upload File"
      @hide="closeModal"

  >
    <b-form-radio-group
        id="radio-group-2"
        v-model="selected"
        name="radio-sub-component"
    >
      <b-form-radio value="first">Root Folder</b-form-radio>
      <b-form-radio value="second">Other Folder</b-form-radio>

    </b-form-radio-group>
    <br>
    <b-form v-if="selected==='first'">
      <label>Choose File</label>
      <b-form-file
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          v-model="file"
      ></b-form-file>
    </b-form>

    <b-form v-else>
      <b-form-group
          label="Select Folder"
      >
        <v-select
            v-model="selectedFolder"
            :options="folderOptions"
            :filterable="false"
            :clearable="false"
            class="w-100"
            @open="onOpen"
            @close="onClose"
            @search="onSearch"
        >
          <template #list-footer>
            <li ref="load" class="loader text-center">
              <b-spinner v-if="isOptionLoading" variant="primary"/>
            </li>
          </template>
        </v-select>
        <br>
        <label>Choose File</label>
        <b-form-file
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            v-model="file"
        ></b-form-file>
      </b-form-group>
    </b-form>


    <template #modal-footer>
      <div>
        <b-button pill @click="insertFileData" variant="primary" class="mr-1" size="sm">
          Send
        </b-button>
        <b-button pill @click="closeModal" size="sm">Close</b-button>
      </div>
    </template>
  </b-modal>


</template>`
<script>
import {
  BFormInput,
  BModal,
  BFormGroup,
  BForm,
  BButton,
  BFormFile,
  BFormRadioGroup,
  BFormRadio,
  BDropdown,
  BDropdownItem,
  BSpinner
} from 'bootstrap-vue'
import { getFolderById, insertFile, getAllFolder } from '@/views/pages/authentication/services/login'
import InfiniteLoading from 'vue-infinite-loading'
import vSelect from 'vue-select'

export default {
  name: 'show-file-chat-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
    BFormFile,
    BFormRadioGroup,
    BFormRadio,
    BDropdown,
    BSpinner,
    BDropdownItem,
    InfiniteLoading,
    vSelect

  },
  props: {
    showFileChatModal: {
      type: Boolean,
      required: true,
    },
    currentFolderId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      showModal: false,
      selected: 'first',
      file: null,
      folder: null,
      observer: null,
      lastPage: false,
      firstPage: false,
      totalRecords: 0,
      folderId: 0,

      userId: parseInt(localStorage.getItem('userId')),

      folderOptions: [],
      selectedFolder: null,
      requestData: {
        pageNo: 0,
        pageSize: 10,
        searchValue: '',
      },
      optionsScrollObserver: null,
      isLastPage: false,
      isOptionLoading: false,
      searchOption: '',

    }
  },

  mounted() {
    this.optionsScrollObserver = new IntersectionObserver(
        this.loadFolderOptions
    )
  },
  beforeMount() {
    this.showModal = this.showFileChatModal
    this.getOtherFolderOptions()

  },

  methods: {
    insertFileData() {
      const requestData = new FormData()
      requestData.set('files', this.file)
      if (this.selected === 'first') {
        requestData.set('parentFolderId', this.currentFolderId)
      } else {
        requestData.set('parentFolderId', this.folderId)
      }
      insertFile(requestData)
          .then(response => {
            if (response) {
              this.$emit('insert-file-modal')
              this.$toast.success('File Send SuccessFully')
              this.$emit('close-modal')
            }

          })
          .catch(e => {
            console.log(e)
          })

    },
    getOtherFolderOptions(isSearching = false) {
      this.isOptionLoading = true
      getAllFolder(this.requestData)
          .then((response) => {
            if (response?.data) {
              this.requestData.pageNo += 1
              this.isLastPage = response.data.data.last
              if (isSearching) {
                this.folderOptions = []
              }
              response.data.data.content.forEach((folder) => {
                if (
                    folder.docType === 'systemfolder' ||
                    folder.docType === 'folder'
                ) {
                  this.folderOptions.push({
                    value: folder.id,
                    label: folder.name,
                  })
                }

              })

              this.folderId = this.folderOptions[0].value

            }
          })
          .catch((e) => {
            console.log(e)
          })
          .finally(() => {
            this.isOptionLoading = false
          })
    },
    async onOpen() {
      if (!this.isLastPage) {
        await this.$nextTick()
        this.optionsScrollObserver.observe(this.$refs.load)
      }
    },
    onClose() {
      this.optionsScrollObserver.disconnect()
    },
    onSearch(query) {
      this.searchOption = query
    },
    async loadFolderOptions([{
      isIntersecting,
      target
    }]) {
      if (isIntersecting && !this.isLastPage) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.getOtherFolderOptions()
        await this.$nextTick()
        ul.scrollTop = scrollTop
      }
    },

    closeModal() {
      this.$emit('close-modal')
    },
  },
  watch: {
    searchOption: function (newValue, oldValue) {
      if (newValue && newValue !== oldValue) {
        this.requestData.searchValue = newValue
        this.requestData.pageNo = 0
        this.getOtherFolderOptions(true)
      }
      if (!newValue) {
        this.requestData.searchValue = ''
        this.requestData.pageNo = 0
        this.getOtherFolderOptions(true)
      }
    },
  },
}
</script>
<style lang="scss" scoped>

</style>

<style lang="scss">
@import "~@core/scss/base/pages/app-chat.scss";
@import "~@core/scss/base/pages/app-chat-list.scss";
@import '@core/scss/vue/libs/vue-select.scss';

</style>