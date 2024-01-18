import {cache, CACHE_KEY, isDev, WrapperScriptType} from '@/utils'

export const setChapters: WrapperScriptType['setChapters'] = async (args) => {
  if (!isDev()) {
    return false
  }
  cache.set(CACHE_KEY.CHAPTERS, args)
  return true
}