import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'ant-design-vue/dist/reset.css'
import AppVue from './App.vue'
import './assets/styles/base.css'
import router from './presentation/routes'

const pinia = createPinia()
const app = createApp(AppVue)
app.use(router)
app.use(pinia)
app.use(Antd)
app.mount('#app')
