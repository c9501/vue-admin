import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  // 组合模块的配置项
  modules: {
    user
  },
  getters
})

export default store
