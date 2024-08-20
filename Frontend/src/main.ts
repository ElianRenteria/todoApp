import { createApp } from 'vue'
import App from './App.vue'
import primeVue from 'primevue/config'
import router from './router'
import "primeflex/primeflex.css"
import "primeicons/primeicons.css"
import Aura from "@primevue/themes/aura"


const app = createApp(App)
app.use(router)
app.use(primeVue, { theme: {preset: Aura, options: { prefix: 'p', darkModeSelector: 'system', cssLayer: false }} })

app.mount('#app')
