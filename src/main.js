import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AudioVisual from 'vue-audio-visual'

import './assets/styles/index.css';

Vue.use(AudioVisual)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
