import { createApp } from 'vue'
import {createVuetify} from 'vuetify'
import Default from '@/layouts/default.vue'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import {router} from '@/router'
import {errorHandlingPlugin} from '@/errorHandlingPlugin'

createApp(Default)
    .use(router)
    .use(createPinia().use(createPersistedState()))
    .use(createVuetify())
    .use(errorHandlingPlugin)
    .mount('#app')