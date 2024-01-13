import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getCharacters: WrapperScriptType['getCharacters'] = async () => {
    return cache.get(CACHE_KEY.CHARACTERS)
}