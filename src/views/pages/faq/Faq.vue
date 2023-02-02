<!--<template>-->
<!--  <div>-->
<!--    &lt;!&ndash; faq search section &ndash;&gt;-->
<!--    <section id="faq-search-filter">-->
<!--      <b-card-->
<!--        no-body-->
<!--        class="faq-search"-->
<!--        :style="{backgroundImage:`url(${require('@/assets/images/banner/banner.png')})`}"-->
<!--      >-->
<!--        <b-card-body class="text-center">-->
<!--          <h2 class="text-primary">-->
<!--            Let's answer some questions-->
<!--          </h2>-->
<!--          <b-card-text class="mb-2">-->
<!--            or choose a category to quickly find the help you need-->
<!--          </b-card-text>-->

<!--          &lt;!&ndash; form &ndash;&gt;-->
<!--          <b-form class="faq-search-input">-->
<!--            <b-input-group class="input-group-merge">-->
<!--              <b-input-group-prepend is-text>-->
<!--                <feather-icon icon="SearchIcon" />-->
<!--              </b-input-group-prepend>-->
<!--              <b-form-input-->
<!--                id="searchbar"-->
<!--                v-model="faqSearchQuery"-->
<!--                placeholder="Search faq..."-->
<!--              />-->
<!--            </b-input-group>-->
<!--          </b-form>-->
<!--          &lt;!&ndash; form &ndash;&gt;-->
<!--        </b-card-body>-->
<!--      </b-card>-->
<!--    </section>-->
<!--    &lt;!&ndash;/ faq search section &ndash;&gt;-->

<!--    &lt;!&ndash; frequently asked questions tabs pills &ndash;&gt;-->
<!--    <section id="faq-tabs">-->
<!--      <b-tabs-->
<!--        vertical-->
<!--        content-class="col-12 col-md-8 col-lg-9"-->
<!--        pills-->
<!--        nav-wrapper-class="faq-navigation col-md-4 col-lg-3 col-12"-->
<!--        nav-class="nav-left"-->
<!--      >-->

<!--        &lt;!&ndash; payment tab &ndash;&gt;-->
<!--        <b-tab-->
<!--          v-for="(categoryObj, categoryName, index) in faqData"-->
<!--          :key="categoryName"-->
<!--          :active="!index"-->
<!--        >-->

<!--          &lt;!&ndash; title &ndash;&gt;-->
<!--          <template #title>-->
<!--            <feather-icon-->
<!--              :icon="categoryObj.icon"-->
<!--              size="18"-->
<!--              class="mr-1"-->
<!--            />-->
<!--            <span class="font-weight-bold">{{ categoryObj.title }}</span>-->
<!--          </template>-->

<!--          <faq-question-answer :options="categoryObj" />-->
<!--        </b-tab>-->
<!--        &lt;!&ndash;/ payment tab &ndash;&gt;-->

<!--        &lt;!&ndash; sitting lady image &ndash;&gt;-->
<!--        <template #tabs-end>-->
<!--          <b-img-->
<!--            fluid-->
<!--            :src="require('@/assets/images/illustration/faq-illustrations.svg')"-->
<!--            class="d-none d-md-block mt-auto"-->
<!--          />-->
<!--        </template>-->
<!--        &lt;!&ndash;/ sitting lady image &ndash;&gt;-->
<!--      </b-tabs>-->
<!--    </section>-->
<!--    &lt;!&ndash;/ frequently asked questions tabs pills &ndash;&gt;-->

<!--    &lt;!&ndash; contact us &ndash;&gt;-->
<!--    <section class="faq-contact">-->
<!--      <b-row class="mt-5 pt-75 text-center">-->
<!--        <b-col cols="12">-->
<!--          <h2>You still have a question?</h2>-->
<!--          <b-card-text class="mb-3">-->
<!--            If you cannot find a question in our FAQ, you can always contact us. We will answer to you shortly!-->
<!--          </b-card-text>-->
<!--        </b-col>-->
<!--        <b-col sm="6">-->
<!--          <b-card-->
<!--            class="shadow-none py-1 faq-contact-card"-->
<!--          >-->
<!--            <b-avatar-->
<!--              size="42"-->
<!--              rounded-->
<!--              variant="light-primary"-->
<!--              class="mb-2"-->
<!--            >-->
<!--              <feather-icon-->
<!--                icon="PhoneCallIcon"-->
<!--                size="18"-->
<!--              />-->
<!--            </b-avatar>-->
<!--            <h4>+ (810) 2548 2568</h4>-->
<!--            <span class="text-body">We are always happy to help!</span>-->
<!--          </b-card>-->
<!--        </b-col>-->
<!--        <b-col sm="6">-->
<!--          <b-card-->
<!--            class="shadow-none py-1 faq-contact-card"-->
<!--          >-->
<!--            <b-avatar-->
<!--              size="42"-->
<!--              rounded-->
<!--              variant="light-primary"-->
<!--              class="mb-2"-->
<!--            >-->
<!--              <feather-icon-->
<!--                icon="MailIcon"-->
<!--                size="18"-->
<!--              />-->
<!--            </b-avatar>-->
<!--            <h4>hello@help.com</h4>-->
<!--            <span class="text-body">Best way to get answer faster!</span>-->
<!--          </b-card>-->
<!--        </b-col>-->
<!--      </b-row>-->
<!--    </section>-->
<!--    &lt;!&ndash;/ contact us &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {-->
<!--  BCard, BCardBody, BForm, BInputGroup, BFormInput, BCardText, BInputGroupPrepend, BTabs, BTab, BImg, BRow, BCol, BAvatar,-->
<!--} from 'bootstrap-vue'-->
<!--import FaqQuestionAnswer from './FaqQuestionAnswer.vue'-->

<!--export default {-->
<!--  components: {-->
<!--    BForm,-->
<!--    BCard,-->
<!--    BRow,-->
<!--    BCol,-->
<!--    BAvatar,-->
<!--    BCardBody,-->
<!--    BInputGroup,-->
<!--    BFormInput,-->
<!--    BCardText,-->
<!--    BInputGroupPrepend,-->
<!--    BTabs,-->
<!--    BTab,-->
<!--    BImg,-->
<!--    FaqQuestionAnswer,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      faqSearchQuery: '',-->
<!--      faqData: {},-->
<!--    }-->
<!--  },-->
<!--  watch: {-->
<!--    faqSearchQuery: {-->
<!--      immediate: true,-->
<!--      handler() {-->
<!--        this.fetchData()-->
<!--      },-->
<!--    },-->
<!--  },-->
<!--  methods: {-->
<!--    fetchData() {-->
<!--      this.$http.get('/faq/data', { params: { q: this.faqSearchQuery } }).then(res => { this.faqData = res.data })-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style lang="scss">-->
<!--@import '@core/scss/vue/pages/page-faq.scss';-->
<!--</style>-->
