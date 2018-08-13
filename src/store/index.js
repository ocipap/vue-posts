import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import es6Promise from 'es6-promise'

es6Promise.polyfill();
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});

export default store;
