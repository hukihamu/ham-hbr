import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getPassives: WrapperScriptType['getPassives'] = async () => {
    return cache.get(CACHE_KEY.PASSIVES) ?? []
}