import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import es6Promise from 'es6-promise'

es6Promise.polyfill();
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
