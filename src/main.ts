import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faPen, faTrash)

const app = createApp(App)

app.use(router)

app.mount('#app')
