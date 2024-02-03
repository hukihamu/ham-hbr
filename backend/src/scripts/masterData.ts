import {cache, CACHE_KEY, isDev, WrapperScriptType} from '@/utils'


export const setMasterData: WrapperScriptType['setMasterData'] = async (args) => {
  if (!isDev()) {
    return false
  }
  cache.set(CACHE_KEY.CHAPTERS, args)
  return true
}

export const getMasterData: WrapperScriptType['getMasterData'] = async () => {
  const chapters = cache.get(CACHE_KEY.CHAPTERS)
  return chapters?.chapters ? chapters : {chapters: [], chapterImages: {}}
}