import {defineStore} from 'pinia'
import {useScripts} from 'ham-vue3-gas/vue'
import {Scripts} from '@ham-vue3-gas/shared/scripts'

export const scripts = useScripts<Scripts>()
export const useStore = defineStore('store', {
    state() {
        return {
            styles: [] as ReturnType<Scripts['getStyles']>,
            characters: {} as any,
            user: {} as any,
        }
    },
})