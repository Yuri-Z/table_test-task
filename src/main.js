import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import cButton from "@/components/cButton";
import cTable from "@/components/cTable.vue";
import cModal from "@/components/cModal";

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.component('c-button', cButton)
Vue.component('c-table', cTable)
Vue.component('c-modal', cModal)

new Vue({
  render: h => h(App),
}).$mount('#app')
