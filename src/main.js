import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as echarts from 'echarts'
import router from "./router/index.js";
const app=createApp(App)
app.config.globalProperties.$echarts = echarts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(router)
app.use(ElementPlus)
app.mount('#app')
