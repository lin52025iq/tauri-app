import { createApp } from 'vue'
import App from './App.vue'

import 'virtual:uno.css'
import '@/styles/index.scss'

import PrimeVue, { PrimeVueConfiguration } from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'system'
        }
    }
} as PrimeVueConfiguration)

app.mount('#app')
