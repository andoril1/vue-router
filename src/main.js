import { createApp } from 'vue'
import './style.css'
import './assets/css/miningcore.css'
import './assets/css/miningcore-colors.css'
import './assets/css/chartist.css'
//import './assets/css/chartist.css.map'
import './assets/css/chartist.min.css'
import './assets/css/font-awesome-all.css'
import './assets/css/themify-icons.css'
//import './assets/css/AdminLTE.min.css'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

createApp(App)
.use(router)
.mount('#app')
