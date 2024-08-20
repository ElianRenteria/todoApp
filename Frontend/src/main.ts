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
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
})

const app = createApp(App)
app.use(router)
app.use(primeVue, { theme: {preset: MyPreset, options: { prefix: 'p', darkModeSelector: 'system', cssLayer: false }} })

app.mount('#app')
