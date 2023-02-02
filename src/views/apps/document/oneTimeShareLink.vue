<template>
 <h1>One Time Url</h1>
</template>
<script>
import {
  BFormInput, BModal, BFormGroup, BForm, BButton, BFormFile
} from 'bootstrap-vue'

import {  oneTimeUrlShare } from '@/views/pages/authentication/services/login'


export default {

  components: {
    BFormInput,
    BModal,
    BFormGroup,
    BForm,
    BButton,
    BFormFile,

  },


  mounted()    {
    this.getOneUrl(this.$route?.query?.fileToken)
  },
  methods: {
    getOneUrl(fileToken) {
      const requestedData = {
        fileToken: fileToken
      };
      oneTimeUrlShare(requestedData)
          .then(response => {
            if (response?.data) {
              window.open(response.data.data)
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