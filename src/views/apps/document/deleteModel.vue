<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Confirm?"
      @hide="closeModal"
  >
    <div>Are You Sure You Want to Delete?</div>
    <template #modal-footer>
      <div>
        <b-button @click="deleteFileDetails" variant="primary" class="mr-1" size="sm">
          Yes
        </b-button>
        <b-button @click="closeModal" size="sm">No</b-button>
      </div>
    </template>

  </b-modal>
</template>
<script>
import {
  BFormInput, BModal, BButton
} from 'bootstrap-vue'
import { deleteFile, updateFile } from '@/views/pages/authentication/services/login'

export default {
  name: 'show-delete-modal',
  components: {
    BFormInput,
    BModal,
    BButton,
  },

  props: {
    showDeleteModal: {
      type: Boolean,
      required: true,
    },
    fileDetails: {
      type: Object,
      required: true,
    }

  },
  data() {
    return {
      showModal: false,
    }
  },

  beforeMount() {
    if (this.fileDetails) {
      this.id = this.fileDetails.id
    }
    this.showModal = this.showDeleteModal
  },
  methods:
      {
        deleteFileDetails() {
          const requestData = new FormData()
          requestData.set('id', this.fileDetails.id)

          deleteFile(requestData)
              .then((response) => {
                if (response) {
                  this.$emit('delete-modal')
                  this.$toast.success('File Deleted SuccessFully')
                  this.$emit('close-modal')
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
