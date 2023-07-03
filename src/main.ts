import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mainRouter from './router/main'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(mainRouter)
app.use(pinia)
app.mount('#app')
