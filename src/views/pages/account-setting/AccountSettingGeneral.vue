<template>
  <b-card>

    <!-- media -->
<!--    <b-media no-body>-->
<!--      <b-media-aside>-->
<!--        <b-link>-->
<!--          <b-img-->
<!--            ref="previewEl"-->
<!--            rounded-->
<!--            text="FL"-->
<!--            height="80"-->
<!--          />-->
<!--        </b-link>-->
<!--        &lt;!&ndash;/ avatar &ndash;&gt;-->
<!--      </b-media-aside>-->

<!--      <b-media-body class="mt-75 ml-75">-->
<!--        &lt;!&ndash; upload button &ndash;&gt;-->
<!--        <b-button-->
<!--          v-ripple.400="'rgba(255, 255, 255, 0.15)'"-->
<!--          variant="primary"-->
<!--          size="sm"-->
<!--          class="mb-75 mr-75"-->
<!--          @click="$refs.refInputEl.$el.click()"-->
<!--        >-->
<!--          Upload-->
<!--        </b-button>-->
<!--        <b-form-file-->
<!--          ref="refInputEl"-->
<!--          v-model="profileFile"-->
<!--          accept=".jpg, .png, .gif"-->
<!--          :hidden="true"-->
<!--          plain-->
<!--          @input="inputImageRenderer"-->
<!--        />-->
<!--        &lt;!&ndash;/ upload button &ndash;&gt;-->

<!--        &lt;!&ndash; reset &ndash;&gt;-->
<!--        <b-button-->
<!--          v-ripple.400="'rgba(186, 191, 199, 0.15)'"-->
<!--          variant="outline-secondary"-->
<!--          size="sm"-->
<!--          class="mb-75 mr-75"-->
<!--        >-->
<!--          Reset-->
<!--        </b-button>-->
<!--        &lt;!&ndash;        &lt;!&ndash;/ reset &ndash;&gt;&ndash;&gt;-->
<!--        &lt;!&ndash;        <b-card-text>Allowed JPG, GIF or PNG. Max size of 800kB</b-card-text>&ndash;&gt;-->
<!--      </b-media-body>-->
<!--    </b-media>-->
    <!--/ media -->

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="First Name"
            label-for="account-firstname"
          >
            <b-form-input
              v-model="optionsLocal.firstname"
              placeholder="John"
              name="firstname"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Last Name"
            label-for="last-name"
          >
            <b-form-input
              v-model="optionsLocal.lastname"
              name="lastname"
              placeholder="Doe"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Username"
            label-for="username"
          >
            <b-form-input
              v-model="optionsLocal.username"
              name="username" disabled="Finpal@11"
              placeholder="Finpal@11"
            />

          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="Company Name"
            label-for="account-company"
          >
            <b-form-input
              v-model="optionsLocal.company"
              name="company" disabled="FinPal"
              placeholder="FinPal"
            />
          </b-form-group>
        </b-col>

        <!--        &lt;!&ndash; alert &ndash;&gt;-->
        <!--        <b-col-->
        <!--          cols="12"-->
        <!--          class="mt-75"-->
        <!--        >-->
        <!--          <b-alert-->
        <!--            show-->
        <!--            variant="warning"-->
        <!--            class="mb-50"-->
        <!--          >-->
        <!--            <h4 class="alert-heading">-->
        <!--              Your email is not confirmed. Please check your inbox.-->
        <!--            </h4>-->
        <!--            <div class="alert-body">-->
        <!--              <b-link class="alert-link">-->
        <!--                Resend confirmation-->
        <!--              </b-link>-->
        <!--            </div>-->
        <!--          </b-alert>-->
        <!--        </b-col>-->
        <!--        &lt;!&ndash;/ alert &ndash;&gt;-->

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
          >
            Save changes
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            type="reset"
            class="mt-2"
            @click.prevent="resetForm"
          >
            Reset
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

export default {
  components: {
    BButton,
    BForm,
    // BFormFile,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    // BCardText,
    // BMediaBody,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,
    }
  },
  methods: {
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>
