<template>
  <b-modal
      id="read-file"
      v-model="showModal"
      centered
      class="modal-body-parent"
      size="lg"
      title="Read Content"
      @hide="closeModal"
  >

    <template>
      <div class="modal-body-content" v-if="viewFileDetails.isPdfFile">
        <vue-pdf-embed class="pdf-view-content" :source="fileURL"/>
      </div>
      <div
          v-else-if="viewFileDetails.isImage"
          class="d-flex align-items-center justify-content-center h-100">
        <img class="w-100 h-50" :src="fileURL" alt="Image Document"/>
      </div>
      <div v-else-if="viewFileDetails.isWebSupportedFile">
        <codemirror
            style="width: 100%; height: 100%"
            :code="fileContent"
            :options="codemirrorOptions"
        ></codemirror>
      </div>
      <pre v-else class="h-100">{{ fileContent }}</pre>
    </template>
    <template #modal-footer>
      <div>
        <b-button @click="closeModal" size="sm">Close</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import {
  BFormInput, BModal, BFormGroup, BForm, BButton, BFormFile, BFormText, BImg
} from 'bootstrap-vue'
import { downloadFile, readFileContent, sendMessage } from '@/views/pages/authentication/services/login'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import { codemirror }  from 'vue-codemirror'



export default {
  name: 'read-file-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BFormText,
    BButton,
    BFormFile,
    BImg,
    VuePdfEmbed,
    codemirror,



  },
  props: {
    readFileModal: {
      type: Boolean,
      required: true,
    },
    viewFileDetails: {
      type: Object,
      required: true,
    }


  },

  data() {
    return {
      showModal: false,
      fileContent: null,
      fileId: 0,
      id: 0,
      fileURL: '',
      codemirrorOptions: {
        readOnly: true,
      },

    }

  },
  beforeMount() {
    this.showModal = this.readFileModal

  },

  mounted() {

    this.readFile(this.viewFileDetails.fileId)
    this.fileUrl(this.viewFileDetails.fileId)
  },

  methods: {
    readFile(fileId) {

      readFileContent(fileId)
          .then(response => {
            this.fileContent = response.data.data
          })
          .catch(e => {
            console.log(e)
          })
    },
    fileUrl(id) {
      downloadFile({ id })
          .then(response => {
            if (response.data) {
              this.fileURL = response.data.data
            }

          })
          .catch(e => {
            console.log(e)
          })

    },

    closeModal() {
      this.$emit('close-modal')
    },
  },

}
</script>
<style lang="scss">
::v-deep #read-file___BV_modal_body_ {
  height: 650px;
}

.modal-body-content {
  height: 100%;
}

.pdf-view-content {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}
::v-deep .CodeMirror {
  height: 650px;
}
</style>