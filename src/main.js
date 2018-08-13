// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import CONSTANT from './constant'

Vue.config.productionTip = false;

Vue.prototype.$convert = {};

Vue.prototype.$convert.divtotext = function divtotext (content) {
  return content.replace(/(<br>)/g, '\n');
}
Vue.prototype.$convert.texttodiv = function texttodiv (content) {
  return content.replace(/(\n|\r\n)/g, '</br>');
}

Vue.prototype.$cookie = {};

Vue.prototype.$cookie.setCookie = function setCookie (name, value) {
  document.cookie = name + '=' + value +'; path=/';
}

Vue.prototype.$cookie.getCookie = function getCookie (name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return '';
}

Vue.prototype.$cookie.deleteCookie = function deleteCookie (name) {
  Vue.prototype.$cookie.setCookie(name, '', -1)
}

Vue.prototype.$EventBus = new Vue();

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch(CONSTANT.TOKEN_CHECK, (isLogin) => {
      if (isLogin) {
        next()
      } else {
        next('/login')
      }
    })
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
