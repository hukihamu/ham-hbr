import {App} from 'vue'
import {router} from '@/router'

export const errorHandlingPlugin = {
    install(app: App<Element>) {
        app.config.errorHandler = (err: unknown) => {
            handler('vue', err)
            return false
        }

        // Vue.js以外のエラー
        window.addEventListener('error', (event) => {
            handler('other', event, event.message !== 'ResizeObserver loop completed with undelivered notifications.')
            event.stopPropagation()
            event.preventDefault()
        })

        // Promise経由で呼び出されるエラー(Promise.reject)
        window.addEventListener('unhandledrejection', (event) => {
            handler('promise', event.reason)
            event.stopPropagation()
            event.preventDefault()
        })
    }
}
function handler(key: 'vue' | 'other' | 'promise', error: unknown, isPush: boolean = true) {
    console.error(`${key} error`, error)
    if (isPush) router.push('/error').then()
}