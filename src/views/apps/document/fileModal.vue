<template>
  <b-modal
      v-model="showModal"
      centered
      size="sm"
      title="Upload File"
      @hide="closeModal"

  >
<!--    <b-form>-->
<!--      <b-form-group>-->
<!--        <label for="name-input">Upload File</label>-->
<!--        <b-form-input-->
<!--            placeholder="Brows file here...."-->
<!--            -->
<!--            required-->
<!--        ></b-form-input>-->
<!--      </b-form-group>-->
<!--    </b-form>-->
    <b-form-file
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        v-model="file"
    ></b-form-file>
    <template #modal-footer>
      <div>
        <b-button @click="insertFileData" variant="primary" class="mr-1" size="sm">
          Upload
        </b-button>
        <b-button @click="closeModal" size="sm">Close</b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import {
  BFormInput, BModal, BFormGroup, BForm, BButton,BFormFile
} from 'bootstrap-vue'
import { insertFile } from '@/views/pages/authentication/services/login'


export default {
  name: 'show-file-modal',
  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
    BFormFile,
  },
  props: {
    showFileModal: {
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
      file:null,
    }
  },
  beforeMount() {
    this.showModal = this.showFileModal

  },
  methods: {
    insertFileData()
    {
      const requestData=new FormData()
      requestData.set('files',this.file)
      requestData.set('parentFolderId',this.currentFolderId)
      insertFile(requestData)
          .then(response=>{
            if(response)
            {
              this.$emit('insert-file-modal')
              this.$toast.success('File Inserted SuccessFully')
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