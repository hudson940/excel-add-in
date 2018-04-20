// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import db from '../config/firebase'
Vue.config.productionTip = false
Vue.component('components/Layout')
Vue.component('components/Dashboard')
import Vuetify from 'vuetify'
Vue.use(Vuetify)
/* eslint-disable no-new */
const Office = window.Office

Office.initialize = () => {
  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
  })
}
