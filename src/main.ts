import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue';
import { createApp } from 'vue'
import AppVue from './App.vue'
import './assets/styles/base.css'
import router from './presentation/routes'

const app = createApp(AppVue)
app.use(router)
app.use(Antd)
app.mount('#app')
