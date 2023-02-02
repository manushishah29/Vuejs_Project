<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Forgot Password v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <!-- logo -->
          <b-img
              fluid
              :src="sideImg"
          />

        </b-link>

        <b-card-title class="mb-1">
          Forgot Password? 🔒
        </b-card-title>
        <b-card-text class="mb-2">
          Enter your email and we'll send you instructions to reset your password
        </b-card-text>

        <!-- form -->
        <validation-observer ref="simpleRules">
          <b-form
              class="auth-forgot-password-form mt-2"
              @submit.prevent="validationForm"
          >
            <!-- email -->
            <b-form-group
                label="Email"
                label-for="forgot-password-email"
            >
              <validation-provider
                  #default="{ errors }"
                  name="Email"
                  rules="required|email"
              >
                <b-form-input
                    id="forgot-password-email"
                    v-model="userEmail"
                    :state="errors.length > 0 ? false:null"
                    name="forgot-password-email"
                    placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- submit button -->
            <b-button
                variant="primary"
                block
                type="submit"
            >
              Send reset link
            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <b-link :to="{name:'auth-login-v1'}">
            <feather-icon icon="ChevronLeftIcon" /> Back to login
          </b-link>
        </b-card-text>

      </b-card>
      <!-- /Forgot Password v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BCard, BLink, BCardText, BCardTitle, BFormGroup, BFormInput, BForm, BButton,
  BImg,
} from 'bootstrap-vue'
import { required, email } from '@validations'

export default {
  components: {
    BImg,
    BCard,
    BLink,
    BCardText,
    BCardTitle,
    BFormGroup,
    BFormInput,
    BButton,
    BForm,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: '',
      // validation
      required,
      email,
      // eslint-disable-next-line global-require
      sideImg: require('@/assets/images/logo/logo.png'),
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          this.$router.push({ name: 'auth-reset-password-v1' })
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
<!--        <b-img-->
<!--            fluid-->
<!--            :src="sideImg"-->
<!--        />-->

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
<!--            alt="Forgot password V2"-->
<!--          />-->
<!--        </div>-->
<!--      </b-col>-->
<!--      &lt;!&ndash; /Left Text&ndash;&gt;-->

<!--      &lt;!&ndash; Forgot password&ndash;&gt;-->
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
<!--            Forgot Password? 🔒-->
<!--          </b-card-title>-->
<!--          <b-card-text class="mb-2">-->
<!--            Enter your email and we'll send you instructions to reset your password-->
<!--          </b-card-text>-->

<!--          &lt;!&ndash; form &ndash;&gt;-->
<!--          <validation-observer ref="simpleRules">-->
<!--            <b-form-->
<!--              class="auth-forgot-password-form mt-2"-->
<!--              @submit.prevent="validationForm"-->
<!--            >-->
<!--              <b-form-group-->
<!--                label="Email"-->
<!--                label-for="forgot-password-email"-->
<!--              >-->
<!--                <validation-provider-->
<!--                  #default="{ errors }"-->
<!--                  name="Email"-->
<!--                  rules="required|email"-->
<!--                >-->
<!--                  <b-form-input-->
<!--                    id="forgot-password-email"-->
<!--                    v-model="userEmail"-->
<!--                    :state="errors.length > 0 ? false:null"-->
<!--                    name="forgot-password-email"-->
<!--                    placeholder="john@example.com"-->
<!--                  />-->
<!--                  <small class="text-danger">{{ errors[0] }}</small>-->
<!--                </validation-provider>-->
<!--              </b-form-group>-->

<!--              <b-button-->
<!--                type="submit"-->
<!--                variant="primary"-->
<!--                block-->
<!--              >-->
<!--                Send reset link-->
<!--              </b-button>-->
<!--            </b-form>-->
<!--          </validation-observer>-->

<!--          <p class="text-center mt-2">-->
<!--            <b-link :to="{name:'auth-login'}">-->
<!--              <feather-icon icon="ChevronLeftIcon" /> Back to login-->
<!--            </b-link>-->
<!--          </p>-->
<!--        </b-col>-->
<!--      </b-col>-->
<!--      &lt;!&ndash; /Forgot password&ndash;&gt;-->
<!--    </b-row>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--/* eslint-disable global-require */-->
<!--import { ValidationProvider, ValidationObserver } from 'vee-validate'-->
<!--import VuexyLogo from '@core/layouts/components/Logo.vue'-->
<!--import {-->
<!--  BRow, BCol, BLink, BCardTitle, BCardText, BImg, BForm, BFormGroup, BFormInput, BButton,-->
<!--} from 'bootstrap-vue'-->
<!--import { required, email } from '@validations'-->
<!--import store from '@/store/index'-->
<!--import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'-->

<!--export default {-->
<!--  components: {-->
<!--    BRow,-->
<!--    BCol,-->
<!--    BLink,-->
<!--    BImg,-->
<!--    BForm,-->
<!--    BButton,-->
<!--    BFormGroup,-->
<!--    BFormInput,-->
<!--    BCardTitle,-->
<!--    BCardText,-->
<!--    ValidationProvider,-->
<!--    ValidationObserver,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      userEmail: '',-->
<!--      sideImg: require('@/assets/images/logo/logo.png'),-->
<!--      // validation-->
<!--      required,-->
<!--      email,-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    imgUrl() {-->
<!--      if (store.state.appConfig.layout.skin === 'dark') {-->
<!--        // eslint-disable-next-line vue/no-side-effects-in-computed-properties-->
<!--        this.sideImg = require('@/assets/images/logo/logo.png')-->
<!--        return this.sideImg-->
<!--      }-->
<!--      return this.sideImg-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    validationForm() {-->
<!--      this.$refs.simpleRules.validate().then(success => {-->
<!--        if (success) {-->
<!--          this.$toast({-->
<!--            component: ToastificationContent,-->
<!--            props: {-->
<!--              title: 'This is for UI purpose only.',-->
<!--              icon: 'EditIcon',-->
<!--              variant: 'success',-->
<!--            },-->
<!--          })-->
<!--        }-->
<!--      })-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style lang="scss">-->
<!--@import '@core/scss/vue/pages/page-auth.scss';-->
<!--</style>-->
