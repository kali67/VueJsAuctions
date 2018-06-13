// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Router from './router/index';
import VueResource from 'vue-resource';
import Vue from 'vue';
import VueToastr from '@deveodk/vue-toastr';
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css';

Vue.use(VueToastr, {
  defaultPosition: 'toast-bottom-full-width',
  defaultType: 'info',
  defaultTimeout: 3000
});

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next) => {
  request.headers.set('X-Authorization', window.sessionStorage.getItem("sessionKey"));
  next()
});


new Vue({
  router: Router,
  el: 'app',
  components: { App }
});
