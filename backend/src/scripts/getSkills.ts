import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getSkills: WrapperScriptType['getSkills'] = async() => {
    return cache.get(CACHE_KEY.SKILLS) ?? []
}