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
          Reset Password
        </b-card-title>
        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent="login"
          >

            <!-- Password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Password</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- Reset Password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Re-Enter Password</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="Re-EnterPassword"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
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
              Login
            </b-button>
          </b-form>
        </validation-observer>

      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BImg, BForm, BButton, BAlert, VBTooltip,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import useJwt from '@/auth/jwt/useJwt'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
// eslint-disable-next-line import/extensions
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    // BSV
    // eslint-disable-next-line vue/no-unused-components
    BRow,
    // eslint-disable-next-line vue/no-unused-components
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    // eslint-disable-next-line vue/no-unused-components
    BImg,
    BForm,
    BButton,
    // eslint-disable-next-line vue/no-unused-components
    BAlert,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      password: '',
      reenterpassword: '',
      status: '',
      // eslint-disable-next-line global-require
      sideImg: require('@/assets/images/logo/vuexy-logo.png'),
      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    // imgUrl() {
    //   if (store.state.appConfig.layout.skin === 'dark') {
    //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties,global-require
    //     this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
    //     return this.sideImg
    //   }
    //   return this.sideImg
    // },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate()
        .then(success => {
          if (success) {
            useJwt.login({
              password: this.password,
              reenterpassword: this.password,
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
          }
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
