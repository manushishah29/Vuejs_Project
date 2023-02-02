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
          Two Factor Authentication
        </b-card-title>
        <b-card-text class="mb-2">
          A Message with a verification code has been sent to your Device. Enter Code to continue.
        </b-card-text>

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="login"
          >

            <!-- email -->
            <b-form-group
              label-for="otpCode"
              label="Code"
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
  BLink, BCardTitle, BCardText, BForm, BFormGroup, BFormInput, BButton,
  BImg,
} from 'bootstrap-vue'
import { required, password } from '@validations'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import useJwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

export default {
  components: {
    BLink,
    BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,
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
    login() {
      useJwt.login({
        email: 'admin@demo.com',
        password: 'admin',
      })
        .then(response => {
          const { userData } = response.data
          useJwt.setToken(response.data.accessToken)
          useJwt.setRefreshToken(response.data.refreshToken)
          localStorage.setItem('userData', JSON.stringify(userData))
          this.$ability.update(userData.ability)

          // ? This is just for demo purpose as well.
          // ? Because we are showing eCommerce app's cart items count in navbar
          this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

          // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
          this.$router.replace(getHomeRouteForLoggedInUser(userData.role))
            .then(() => {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Welcome ${userData.fullName || userData.username}`,
                  icon: 'CoffeeIcon',
                  variant: 'success',
                  text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                },
              })
            })
        })
        .catch(error => {
          this.$refs.loginForm.setErrors(error.response.data.error)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
