<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <b-img
            fluid
            :src="sideImg"
          />
        </b-link>

        <b-card-title class="mb-1">
          Enter Verification Code
        </b-card-title>

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
          >

            <!-- email -->
            <b-form-group
              label-for="otpCode"
            >
              <validation-provider
                #default="{ errors }"
                name="OTP"
                rules="required"
              >
                <b-form-input
                  id="email"
                  v-model="otpCode"
                  name="otpCode"
                  :state="errors.length > 0 ? false:null"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
            >
              Verify OTP
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BLink, BCardTitle, BForm, BFormGroup, BFormInput, BButton,
  BImg,
} from 'bootstrap-vue'
import { required, password } from '@validations'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BLink,
    // BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BImg,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      otpCode: '',
      sideImg: require('@/assets/images/logo/logo.png'),
      // validation
      required,
      password,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/logo/logo.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'This is for UI purpose only.',
              icon: 'EditIcon',
              variant: 'success',
            },
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
