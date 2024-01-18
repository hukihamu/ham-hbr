import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getChapters: WrapperScriptType['getChapters'] = async () => {
  const chapters = cache.get(CACHE_KEY.CHAPTERS)
  return chapters?.chapters ? chapters : {chapters: [], chapterImages: {}}
}