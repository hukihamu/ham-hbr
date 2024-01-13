import {createGasRouter} from 'ham-vue3-gas/vue'
import Index from '@/pages/Index.vue'
import Error from '@/pages/Error.vue'
import Styles from '@/pages/Styles.vue'
import User from '@/pages/User.vue'


export const router = createGasRouter([
    {
        path: '/',
        component: Index
    },
    {
        path: '/error',
        component: Error
    },
    {
        path: '/styles',
        component: Styles
    },
    {
        path: '/user',
        component: User
    }
])