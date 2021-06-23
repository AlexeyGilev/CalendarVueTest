import Vue from 'vue'
import App from './App.vue'
import Datepicker from 'vuejs-datepicker';
import Element from 'element-ui';
import axios from 'axios'

Vue.use(Element)
Vue.component('datepicker', Datepicker);
Vue.prototype.$axios = axios
new Vue({
  el: '#app',
  render: h => h(App),
})
