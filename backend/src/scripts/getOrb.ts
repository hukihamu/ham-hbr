import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getOrb: WrapperScriptType['getOrb'] = async() => {
  return cache.get(CACHE_KEY.ORB) ?? []
}