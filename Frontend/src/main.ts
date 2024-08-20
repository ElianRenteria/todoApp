import { createApp } from 'vue'
import App from './App.vue'
import primeVue from 'primevue/config'
import router from './router'
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import Aura from "@primevue/themes/aura"
import { definePreset } from '@primevue/themes';


const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        }
    }
})

const app = createApp(App)
app.use(router)
app.use(primeVue, { theme: {preset: MyPreset, options: { prefix: 'p', darkModeSelector: 'system', cssLayer: false }} })

app.mount('#app')
