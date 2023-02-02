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
        <label for="name-input">Message</label>
        <b-form-input
            v-model="requestData.message"
            placeholder="Message.."
            required
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <div>
        <b-button @click="updateChatDetail" variant="primary" class="mr-1" size="sm">
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
import {  updateMessage } from '@/views/pages/authentication/services/login'

export default {
  name: 'show-edit-chat-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
  },
  props: {
    showEditChatModal: {
      type: Boolean,
      required: true,
    },
    messageId: {
      type: Number,
      required: true,
    },
    messageData:{
      type:String,
      required:true,
    }

  },

  data() {
    return {
      showModal: false,
      requestData:{
        message:this.messageData
      }
    }

  },
  beforeMount() {
    // if (this.fileDetails) {
    //   this.fileName = this.fileDetails.fileName
    // }
    this.showModal = this.showEditChatModal

  },
  methods: {
    updateChatDetail() {
      const requestData = new FormData()
      requestData.set('message', this.messageData)
      requestData.set('id', this.messageId)
      updateMessage(this.requestData,this.messageId)
          .then((response) => {
            if (response) {
              this.$emit('update-message')
              this.$toast.success('Message Updated SuccessFully')
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