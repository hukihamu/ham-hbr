import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getEvents: WrapperScriptType['getEvents'] = async() => {
  return cache.get(CACHE_KEY.EVENTS) ?? []
}