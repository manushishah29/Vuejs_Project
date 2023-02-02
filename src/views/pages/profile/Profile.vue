<!--<template>-->
<!--  <div-->
<!--    v-if="Object.keys(profileData).length"-->
<!--    id="user-profile"-->
<!--  >-->
<!--    <profile-header :header-data="profileData.header" />-->
<!--    &lt;!&ndash; profile info  &ndash;&gt;-->
<!--    <section id="profile-info">-->
<!--      <b-row>-->
<!--        &lt;!&ndash; about suggested page and twitter feed &ndash;&gt;-->
<!--        <b-col-->
<!--          lg="3"-->
<!--          cols="12"-->
<!--          order="2"-->
<!--          order-lg="1"-->
<!--        >-->
<!--          <profile-about :about-data="profileData.userAbout" />-->
<!--          <profile-suggested-pages :pages-data="profileData.suggestedPages" />-->
<!--          <profile-twitter-feed :twitter-feed="profileData.twitterFeeds" />-->
<!--        </b-col>-->
<!--        &lt;!&ndash;/ about suggested page and twitter feed &ndash;&gt;-->

<!--        &lt;!&ndash; post &ndash;&gt;-->
<!--        <b-col-->
<!--          lg="6"-->
<!--          cols="12"-->
<!--          order="1"-->
<!--          order-lg="2"-->
<!--        >-->
<!--          <profile-post :posts="profileData.post" />-->
<!--        </b-col>-->
<!--        &lt;!&ndash; post &ndash;&gt;-->

<!--        &lt;!&ndash; latest photos suggestion and polls &ndash;&gt;-->
<!--        <b-col-->
<!--          lg="3"-->
<!--          cols="12"-->
<!--          order="3"-->
<!--        >-->
<!--          <profile-latest-photos :latest-images="profileData.latestPhotos" />-->
<!--          <profile-suggestion :suggestions="profileData.suggestions" />-->
<!--          <profile-polls :polls-data="profileData.polls" />-->
<!--        </b-col>-->
<!--        &lt;!&ndash;/ latest photos suggestion and polls &ndash;&gt;-->

<!--        &lt;!&ndash; load more  &ndash;&gt;-->
<!--        <b-col-->
<!--          cols="12"-->
<!--          order="4"-->
<!--        >-->
<!--          <profile-bottom />-->
<!--        </b-col>-->
<!--        &lt;!&ndash;/ load more  &ndash;&gt;-->
<!--      </b-row>-->
<!--    </section>-->
<!--    &lt;!&ndash;/ profile info  &ndash;&gt;-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { BRow, BCol } from 'bootstrap-vue'-->

<!--import ProfileHeader from './ProfileHeader.vue'-->
<!--import ProfileAbout from './ProfileAbout.vue'-->
<!--import ProfileSuggestedPages from './ProfileSuggestedPages.vue'-->
<!--import ProfileTwitterFeed from './ProfileTwitterFeed.vue'-->
<!--import ProfilePost from './ProfilePost.vue'-->
<!--import ProfileLatestPhotos from './ProfileLatestPhotos.vue'-->
<!--import ProfileSuggestion from './ProfileSuggestion.vue'-->
<!--import ProfilePolls from './ProfilePolls.vue'-->
<!--import profileBottom from './profileBottom.vue'-->

<!--/* eslint-disable global-require */-->
<!--export default {-->
<!--  components: {-->
<!--    BRow,-->
<!--    BCol,-->

<!--    ProfileHeader,-->
<!--    ProfileAbout,-->
<!--    ProfileSuggestedPages,-->
<!--    ProfileTwitterFeed,-->
<!--    ProfilePost,-->
<!--    ProfileLatestPhotos,-->
<!--    ProfileSuggestion,-->
<!--    ProfilePolls,-->
<!--    profileBottom,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      profileData: { },-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.$http.get('/profile/data').then(res => { this.profileData = res.data })-->
<!--  },-->
<!--}-->
<!--/* eslint-disable global-require */-->
<!--</script>-->

<!--<style lang="scss" >-->
<!--@import '@core/scss/vue/pages/page-profile.scss';-->
<!--</style>-->
