import './assets/all.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const app = createApp(App)

app.component('VueLoading', Loading)
app.use(router)
app.use(VueSweetalert2)

app.mount('#app')
