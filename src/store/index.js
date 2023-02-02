import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'

import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
  },

  state() {
    return {

      companyId: 111,
    }
  },
  mutations: {
    update(state, payload) {
      state.companyId = payload
    },
  },

  strict: process.env.DEV,
})
