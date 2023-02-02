<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <b-img
            fluid
            :src="sideImg"
          />
        </b-link>

        <b-card-title class="mb-1">
          Adventure starts here 🚀
        </b-card-title>
<!--        <b-card-text class="mb-2">-->
<!--          Make your app management easy and fun!-->
<!--        </b-card-text>-->

        <!-- form -->
        <validation-observer ref="registerForm">
          <b-form
            class="auth-register-form mt-2"
            @submit.prevent="register"
          >

            <!--              Company Name-->
            <b-form-group
              label="Company Name"
              label-for="register-companyname"
            >
              <validation-provider
                #default="{ errors }"
                name="Company Name"
                vid="companyname"
                rules="required"
              >
                <b-form-input
                  id="register-companyname"
                  v-model="companyname"
                  name="register-companyname"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Admin"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- firstname -->
            <b-form-group
              label="First Name"
              label-for="register-firstname"
            >
              <validation-provider
                #default="{ errors }"
                name="Firstname"
                rules="required"
              >
                <b-form-input
                  id="firstname"
                  v-model="firstname"
                  :state="errors.length > 0 ? false:null"
                  name="register-firstname"
                  placeholder="John"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!--            LastName-->
            <b-form-group
              label="Last Name"
              label-for="register-lastname"
            >
              <validation-provider
                #default="{ errors }"
                name="Lastname"
                rules="required"
              >
                <b-form-input
                  id="lastname"
                  v-model="firstname"
                  :state="errors.length > 0 ? false:null"
                  name="register-lastname"
                  placeholder="Doe"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- email -->
            <b-form-group
              label="Email"
              label-for="register-email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="regEmail"
                  :state="errors.length > 0 ? false:null"
                  name="register-email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
              label="Password"
              label-for="password"
            >
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
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!--            Re-Enter Password-->
            <b-form-group
              label="Re-Enter Password"
              label-for="re-enter-password"
            >
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
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox
                id="register-privacy-policy"
                v-model="status"
                name="checkbox-1"
              >
                I agree to
                <b-link>privacy policy & terms</b-link>
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button
              variant="primary"
              block
              type="submit"
              :disabled="invalid"
            >
              Sign Up
            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Already have an account? </span>
          <b-link :to="{name:'auth-login'}">
            <span>Sign In Instead</span>
          </b-link>
        </b-card-text>

      </b-card>
      <!-- /Register v1 -->
    </div>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BImg, BCardTitle, BCardText,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BRow,
    // eslint-disable-next-line vue/no-unused-components
    BImg,
    // eslint-disable-next-line vue/no-unused-components
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      regEmail: '',
      firstname: '',
      password: '',
      status: '',

      // validation rules
      required,
      email,
      // eslint-disable-next-line global-require
      sideImg: require('@/assets/images/logo/logo.png'),
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    register() {
      this.$refs.registerForm.validate().then(success => {
        if (success) {
          useJwt.register({
            companyname: this.companyname,
            username: this.firstname,
            email: this.userEmail,
            password: this.password,
          })
            .then(response => {
              useJwt.setToken(response.data.accessToken)
              useJwt.setRefreshToken(response.data.refreshToken)
              localStorage.setItem('userData', JSON.stringify(response.data.userData))
              this.$ability.update(response.data.userData.ability)
              this.$router.push('/')
            })
            .catch(error => {
              this.$refs.registerForm.setErrors(error.response.data.error)
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
<!--<template>-->
<!--  <div class="auth-wrapper auth-v2">-->
<!--    <b-row class="auth-inner m-0">-->

<!--      &lt;!&ndash; Brand logo&ndash;&gt;-->
<!--      <b-link class="brand-logo">-->
<!--        <vuexy-logo />-->

<!--        <h2 class="brand-text text-primary ml-1">-->
<!--          FinLap-->
<!--        </h2>-->
<!--      </b-link>-->
<!--      &lt;!&ndash; /Brand logo&ndash;&gt;-->

<!--      &lt;!&ndash; Left Text&ndash;&gt;-->
<!--      <b-col-->
<!--        lg="8"-->
<!--        class="d-none d-lg-flex align-items-center p-5"-->
<!--      >-->
<!--        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">-->
<!--          <b-img-->
<!--            fluid-->
<!--            :src="imgUrl"-->
<!--            alt="Register V2"-->
<!--          />-->
<!--        </div>-->
<!--      </b-col>-->
<!--      &lt;!&ndash; /Left Text&ndash;&gt;-->

<!--      &lt;!&ndash; Register&ndash;&gt;-->
<!--      <b-col-->
<!--        lg="4"-->
<!--        class="d-flex align-items-center auth-bg px-2 p-lg-5"-->
<!--      >-->
<!--        <b-col-->
<!--          sm="8"-->
<!--          md="6"-->
<!--          lg="12"-->
<!--          class="px-xl-2 mx-auto"-->
<!--        >-->
<!--          <b-card-title class="mb-1">-->
<!--            Adventure starts here 🚀-->
<!--          </b-card-title>-->
<!--          <b-card-text class="mb-2">-->
<!--            Make your app management easy and fun!-->
<!--          </b-card-text>-->

<!--          &lt;!&ndash; form &ndash;&gt;-->
<!--          <validation-observer-->
<!--            ref="registerForm"-->
<!--            #default="{invalid}"-->
<!--          >-->
<!--            <b-form-->
<!--              class="auth-register-form mt-2"-->
<!--              @submit.prevent="register"-->
<!--            >-->
<!--              &lt;!&ndash;              Company Name&ndash;&gt;-->
<!--              <b-form-group-->
<!--                label="Company Name"-->
<!--                label-for="register-companyname"-->
<!--              >-->
<!--                <validation-provider-->
<!--                  #default="{ errors }"-->
<!--                  name="Company Name"-->
<!--                  vid="companyname"-->
<!--                  rules="required"-->
<!--                >-->
<!--                  <b-form-input-->
<!--                    id="register-companyname"-->
<!--                    v-model="companyname"-->
<!--                    name="register-companyname"-->
<!--                    :state="errors.length > 0 ? false:null"-->
<!--                    placeholder="Admin"-->
<!--                  />-->
<!--                  <small class="text-danger">{{ errors[0] }}</small>-->
<!--                </validation-provider>-->
<!--              </b-form-group>-->

<!--              &lt;!&ndash; username &ndash;&gt;-->
<!--              <b-form-group-->
<!--                label="User Name"-->
<!--                label-for="register-username"-->
<!--              >-->
<!--                <validation-provider-->
<!--                  #default="{ errors }"-->
<!--                  name="User Name"-->
<!--                  vid="username"-->
<!--                  rules="required"-->
<!--                >-->
<!--                  <b-form-input-->
<!--                    id="register-username"-->
<!--                    v-model="username"-->
<!--                    name="register-username"-->
<!--                    :state="errors.length > 0 ? false:null"-->
<!--                    placeholder="Admin"-->
<!--                  />-->
<!--                  <small class="text-danger">{{ errors[0] }}</small>-->
<!--                </validation-provider>-->
<!--              </b-form-group>-->

<!--              &lt;!&ndash; email &ndash;&gt;-->
<!--              <b-form-group-->
<!--                label="Email"-->
<!--                label-for="register-email"-->
<!--              >-->
<!--                <validation-provider-->
<!--                  #default="{ errors }"-->
<!--                  name="Email"-->
<!--                  vid="email"-->
<!--                  rules="required|email"-->
<!--                >-->
<!--                  <b-form-input-->
<!--                    id="register-email"-->
<!--                    v-model="userEmail"-->
<!--                    name="register-email"-->
<!--                    :state="errors.length > 0 ? false:null"-->
<!--                    placeholder="john@example.com"-->
<!--                  />-->
<!--                  <small class="text-danger">{{ errors[0] }}</small>-->
<!--                </validation-provider>-->
<!--              </b-form-group>-->

<!--              &lt;!&ndash; password &ndash;&gt;-->
<!--              <b-form-group-->
<!--                label-for="register-password"-->
<!--                label="Password"-->
<!--              >-->
<!--                <validation-provider-->
<!--                  #default="{ errors }"-->
<!--                  name="Password"-->
<!--                  vid="password"-->
<!--                  rules="required"-->
<!--                >-->
<!--                  <b-input-group-->
<!--                    class="input-group-merge"-->
<!--                    :class="errors.length > 0 ? 'is-invalid':null"-->
<!--                  >-->
<!--                    <b-form-input-->
<!--                      id="register-password"-->
<!--                      v-model="password"-->
<!--                      class="form-control-merge"-->
<!--                      :type="passwordFieldType"-->
<!--                      :state="errors.length > 0 ? false:null"-->
<!--                      name="register-password"-->
<!--                      placeholder="············"-->
<!--                    />-->
<!--                    <b-input-group-append is-text>-->
<!--                      <feather-icon-->
<!--                        :icon="passwordToggleIcon"-->
<!--                        class="cursor-pointer"-->
<!--                        @click="togglePasswordVisibility"-->
<!--                      />-->
<!--                    </b-input-group-append>-->
<!--                  </b-input-group>-->
<!--                  <small class="text-danger">{{ errors[0] }}</small>-->
<!--                </validation-provider>-->
<!--              </b-form-group>-->

<!--              <b-form-group>-->
<!--                <b-form-checkbox-->
<!--                  id="register-privacy-policy"-->
<!--                  v-model="status"-->
<!--                  name="checkbox-1"-->
<!--                >-->
<!--                  I agree to-->
<!--                  <b-link>privacy policy & terms</b-link>-->
<!--                </b-form-checkbox>-->
<!--              </b-form-group>-->

<!--              <b-button-->
<!--                variant="primary"-->
<!--                block-->
<!--                type="submit"-->
<!--                :disabled="invalid"-->
<!--              >-->
<!--                Sign up-->
<!--              </b-button>-->
<!--            </b-form>-->
<!--          </validation-observer>-->

<!--          <p class="text-center mt-2">-->
<!--            <span>Already have an account?</span>-->
<!--            <b-link :to="{name:'auth-login'}">-->
<!--              <span>&nbsp;Sign in instead</span>-->
<!--            </b-link>-->
<!--          </p>-->

<!--&lt;!&ndash;          &lt;!&ndash; divider &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="divider my-2">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="divider-text">&ndash;&gt;-->
<!--&lt;!&ndash;              or&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->

<!--&lt;!&ndash;          <div class="auth-footer-btn d-flex justify-content-center">&ndash;&gt;-->
<!--&lt;!&ndash;            <b-button&ndash;&gt;-->
<!--&lt;!&ndash;              variant="facebook"&ndash;&gt;-->
<!--&lt;!&ndash;              href="javascript:void(0)"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <feather-icon icon="FacebookIcon" />&ndash;&gt;-->
<!--&lt;!&ndash;            </b-button>&ndash;&gt;-->
<!--&lt;!&ndash;            <b-button&ndash;&gt;-->
<!--&lt;!&ndash;              variant="twitter"&ndash;&gt;-->
<!--&lt;!&ndash;              href="javascript:void(0)"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <feather-icon icon="TwitterIcon" />&ndash;&gt;-->
<!--&lt;!&ndash;            </b-button>&ndash;&gt;-->
<!--&lt;!&ndash;            <b-button&ndash;&gt;-->
<!--&lt;!&ndash;              variant="google"&ndash;&gt;-->
<!--&lt;!&ndash;              href="javascript:void(0)"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <feather-icon icon="MailIcon" />&ndash;&gt;-->
<!--&lt;!&ndash;            </b-button>&ndash;&gt;-->
<!--&lt;!&ndash;            <b-button&ndash;&gt;-->
<!--&lt;!&ndash;              variant="github"&ndash;&gt;-->
<!--&lt;!&ndash;              href="javascript:void(0)"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <feather-icon icon="GithubIcon" />&ndash;&gt;-->
<!--&lt;!&ndash;            </b-button>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--        </b-col>-->
<!--      </b-col>-->
<!--    &lt;!&ndash; /Register&ndash;&gt;-->
<!--    </b-row>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--/* eslint-disable global-require */-->
<!--import { ValidationProvider, ValidationObserver } from 'vee-validate'-->
<!--import VuexyLogo from '@core/layouts/components/Logo.vue'-->
<!--import {-->
<!--  BRow, BCol, BLink, BButton, BForm, BFormCheckbox, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend, BImg, BCardTitle, BCardText,-->
<!--} from 'bootstrap-vue'-->
<!--import { required, email } from '@validations'-->
<!--import { togglePasswordVisibility } from '@core/mixins/ui/forms'-->
<!--import store from '@/store/index'-->
<!--import useJwt from '@/auth/jwt/useJwt'-->

<!--export default {-->
<!--  components: {-->
<!--    VuexyLogo,-->
<!--    BRow,-->
<!--    BImg,-->
<!--    BCol,-->
<!--    BLink,-->
<!--    BButton,-->
<!--    BForm,-->
<!--    BCardText,-->
<!--    BCardTitle,-->
<!--    BFormCheckbox,-->
<!--    BFormGroup,-->
<!--    BFormInput,-->
<!--    BInputGroup,-->
<!--    BInputGroupAppend,-->
<!--    // validations-->
<!--    ValidationProvider,-->
<!--    ValidationObserver,-->
<!--  },-->
<!--  mixins: [togglePasswordVisibility],-->
<!--  data() {-->
<!--    return {-->
<!--      status: '',-->
<!--      username: '',-->
<!--      userEmail: '',-->
<!--      password: '',-->
<!--      sideImg: require('@/assets/images/pages/register-v2.svg'),-->
<!--      // validation-->
<!--      required,-->
<!--      email,-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    passwordToggleIcon() {-->
<!--      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'-->
<!--    },-->
<!--    imgUrl() {-->
<!--      if (store.state.appConfig.layout.skin === 'dark') {-->
<!--        // eslint-disable-next-line vue/no-side-effects-in-computed-properties-->
<!--        this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')-->
<!--        return this.sideImg-->
<!--      }-->
<!--      return this.sideImg-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    register() {-->
<!--      this.$refs.registerForm.validate().then(success => {-->
<!--        if (success) {-->
<!--          useJwt.register({-->
<!--            username: this.username,-->
<!--            email: this.userEmail,-->
<!--            password: this.password,-->
<!--          })-->
<!--            .then(response => {-->
<!--              useJwt.setToken(response.data.accessToken)-->
<!--              useJwt.setRefreshToken(response.data.refreshToken)-->
<!--              localStorage.setItem('userData', JSON.stringify(response.data.userData))-->
<!--              this.$ability.update(response.data.userData.ability)-->
<!--              this.$router.push('/')-->
<!--            })-->
<!--            .catch(error => {-->
<!--              this.$refs.registerForm.setErrors(error.response.data.error)-->
<!--            })-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--  },-->
<!--}-->
<!--/* eslint-disable global-require */-->
<!--</script>-->

<!--<style lang="scss">-->
<!--@import '@core/scss/vue/pages/page-auth.scss';-->
<!--</style>-->
