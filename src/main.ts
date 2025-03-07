import App from './App.vue'

import 'virtual:uno.css'
import '@/styles/index.scss'

const app = createApp(App)

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
