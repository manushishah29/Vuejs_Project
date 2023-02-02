<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Edit Folder"
      @hide="closeModal"

  >
    <b-form>
      <b-form-group>
        <label for="name-input">Folder Name</label>
        <b-form-input
            v-model="folderName"
            placeholder="folderName.."
            required
        ></b-form-input>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <div>
        <b-button @click="updateFolderDetails" variant="primary" class="mr-1" size="sm">
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
import { updateFolder } from '@/views/pages/authentication/services/login'


export default {
  name: 'show-edit-folder-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
  },
  props: {
    showEditFolderModal: {
      type: Boolean,
      required: true,
    },
    folderDetails: {
      type: Object,
      required: true,
    },


  },

  data() {
    return {

      folderName:'',
      showModal: false,
    }
  },
  beforeMount() {

    if (this.folderDetails) {
      this.folderName = this.folderDetails.folderName
    }
    this.showModal = this.showEditFolderModal

  },
  methods: {
    updateFolderDetails() {
      const requestData = {
        folderName:this.folderName,
        id:this.folderDetails.id,
        parentFolderId: this.folderDetails.parentFolderId,

      }
      updateFolder(requestData)
          .then((response) => {
            if (response) {
              this.$emit('close-modal')
              this.$toast.success('Folder Updated SuccessFully')
              this.$emit('update-modal')
              console.log('updated folder name',this.folderName)

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