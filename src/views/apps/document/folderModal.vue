<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Create Folder"
      @hide="closeModal"

  >
    <b-form>
      <b-form-group>
        <label for="name-input">Folder Name</label>
        <b-form-input
            v-model="folder"
            placeholder="folder name.."
            required
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <div>
        <b-button @click="insertFolderData" variant="primary" class="mr-1" size="sm">
          Create
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
import { insertFolder } from '@/views/pages/authentication/services/login'

export default {
  name: 'show-folder-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
  },
  props: {
    showFolderModal: {
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
      folder:"",
      showModal: false,
    }
  },
  beforeMount() {
    this.showModal = this.showFolderModal

  },
  methods: {
    insertFolderData(){
      const requestData={
        folderName:this.folder,
        parentFolderId:this.currentFolderId,
      }
      insertFolder(requestData).then(response=>{
        if(response)
        {
          this.$emit('insert-folder-modal')
          this.$toast.success('Folder Inserted SuccessFully')
          this.$emit('close-modal')
        }

          }).catch(e => {
        console.log(e)
      })
    },
    closeModal() {
      this.$emit('close-modal')
    },

  },
}
</script>