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
          <u><center>Sign In</center></u>
        </b-card-title>
        <!-- <b-card-text class="mb-2">
          Please sign-in to your account and start the adventure
        </b-card-text> -->

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <small
            v-if="e"
            class="text-danger"
          >{{ e }}</small>
          <b-form

            class="auth-login-form mt-2"

            @submit.prevent="login"
          >

            <!-- email -->
            <b-form-group
              label-for="email"
              label="Email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="username"
                  name="login-email"
                  :state="errors.length > 0 ? false:null"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Password</label>
                <b-link :to="{name:'auth-forgot-password'}">
                  <small>Forgot Password?</small>
                </b-link>
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

            <!-- submit button -->
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
              @ckick="loginUser"
            >
              Sign in
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
  BCard, BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BCardTitle, BImg, BForm, BButton, BAlert, VBTooltip,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

import { login } from './services/login'

// import { setCookiesWithAttributes } from './services/cookies'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    // BSV
    // eslint-disable-next-line vue/no-unused-components
    BRow,
    BCard,
    // eslint-disable-next-line vue/no-unused-components
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,

    BCardTitle,
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
      username: '',
      password: '',
      e: '',
      // status: '',
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

  },
  mounted() {
    const user = localStorage.getItem('user-info')
    // this.$cookies.get('token')
    if (user) {
      this.$router.push('/dashboard')
    }
  },

  methods: {
    async loginUser() {
      const result = await this.$refs.loginForm.validate()
      if (result) {
        this.login()
      }
    },
    login() {
      const requestData = {
        username: this.username,
        password: this.password,
        companyRole: this.companyRole,
        systemRole: this.systemRole,
        companyId: this.companyId,
        userId: this.userId,
        // error:this.error,
      }
      login(requestData)
        .then(response => {
          if (response.data) {
            this.requestToken = response.data.requestToken
            this.companyRole = response.data.companyRole
            this.systemRole = response.data.systemRole
            this.companyId = response.data.companyId
            this.userId = response.data.userId


            if (response.status === 200) {
              localStorage.setItem('token', response.data.data.token)
              // this.$cookies.set('token', response.data.data.token, '1h')
              localStorage.setItem('companyRole', response.data.data.companyRole)
              localStorage.setItem('systemRole', response.data.data.systemRole)
              localStorage.setItem('userId', response.data.data.userId)
              localStorage.setItem('companyId', response.data.data.companyId)


              this.$router.push('/dashboard')
              this.$toast.success('Login Success')
            }
            // if(response.status === 401)
            // {
            //   this.$router.push('/dashboard')
            // }
            // else{
            //   this.$router.push({name:'signin'})

            // }
          }
        })
        .catch(e => {
          this.e = 'please Enter Valid Data'
          console.log(e)
          //  alert("Enter Valid Data..")
        })
    },
  },
}
</script>

<style lang="scss">

@import '@core/scss/vue/pages/page-auth.scss';
</style>
