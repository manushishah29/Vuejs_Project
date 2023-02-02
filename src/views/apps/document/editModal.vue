<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Edit File"
      @hide="closeModal"

  >
    <b-form>
      <b-form-group>
        <label for="name-input">File Name</label>
        <b-form-input
            v-model="fileName"
            placeholder="filename.."
            required
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <div>
        <b-button @click="updateFileDetail" variant="primary" class="mr-1" size="sm">
          Update
        </b-button>
        <b-button @click="closeModal" size="sm">Close</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import {
  BFormInput, BModal, BFormGroup, BForm, BButton
} from 'bootstrap-vue'
import { updateFile } from '@/views/pages/authentication/services/login'

export default {
  name: 'show-edit-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
  },
  props: {
    showEditModal: {
      type: Boolean,
      required: true,
    },
    fileDetails: {
      type: Object,
      required: true,
    },

  },

  data() {
    return {
      fileName: '',
      showModal: false,
    }
  },
  beforeMount() {
    if (this.fileDetails) {
      this.fileName = this.fileDetails.fileName
    }
    this.showModal = this.showEditModal

  },
  methods: {
    updateFileDetail() {
      const requestData = new FormData()
      requestData.set('fileName', this.fileName)
      requestData.set('id', this.fileDetails.id)
      updateFile(requestData)
          .then((response) => {
            if (response) {
              this.$emit('update-modal')
              this.$toast.success('File Updated SuccessFully')
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