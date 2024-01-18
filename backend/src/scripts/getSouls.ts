import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getSouls: WrapperScriptType['getSouls'] = async() => {
  return cache.get(CACHE_KEY.SOULS) ?? []
}