// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource' //ajax
import App from './App'
import router from './router'
import './assets/css/bootstrap.min.css'
import './assets/js/bootstrap.min'
import './style/index.css'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
