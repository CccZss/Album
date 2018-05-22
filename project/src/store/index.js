import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import album from './modules/album'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    album
  }
})
