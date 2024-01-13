import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getStyles: WrapperScriptType['getStyles'] = async() => {
    return cache.get(CACHE_KEY.STYLES)
}
