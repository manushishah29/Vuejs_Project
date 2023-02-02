<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Share File"
      @hide="closeModal"

  >
    <b-form-input
        v-model="link" disabled
    ></b-form-input>
    <copy-to-clipboard :text="link" @copy="copyUrl">

<!--      <feather-icon icon="CopyIcon"-->
<!--                    class="mr-1 cursor-pointer"-->
<!--                    size="20"-->
<!--      />-->
    </copy-to-clipboard>
    <template #modal-footer>
      <div>
        <b-button @click="downloadFileData(fileId)" variant="primary" class="mr-1" size="sm">
          Download
        </b-button>
        <b-button @click="closeModal" size="sm">Close</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import {
  BFormInput, BModal, BFormGroup, BForm, BButton, BFormFile
} from 'bootstrap-vue'
import CopyToClipboard from 'vue-copy-to-clipboard'
import { downloadFile } from '@/views/pages/authentication/services/login'




export default {
  name: 'get-share-link-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
    BFormFile,
    CopyToClipboard,
  },
  props: {
    getShareLinkModal: {
      type: Boolean,
      required: true,
    },
    linkDetails: {
      type: Object,
      required: true,
    },
    fileId: {
      type:Number,
      required:true,
    }

  },

  data() {
    return {
      showModal: false,
      fileName: '',
      link: '',

    }
  },
  beforeMount() {
    if (this.linkDetails) {
      this.link = this.linkDetails.shareableLink
    }
    this.showModal = this.getShareLinkModal

  },

  methods: {
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
    copyUrl(link) {
      try {
        navigator.clipboard.writeText(link)
        this.$emit('close-modal')
        this.$toast.success('Link Copied')
      } catch (e) {
        this.$toast.error('not copied')
      }
    },
    closeModal() {
      this.$emit('close-modal')
    },
  },
}
</script>