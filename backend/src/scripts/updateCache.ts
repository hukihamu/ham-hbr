import {CACHE_KEY, isDev, WrapperScriptType} from '@/utils'
import {spreadsheetCache} from 'ham-vue3-gas/gas'
import env from '@/env.json'


const hbrURL = {
  styles: 'https://dissidiadb-cbde0.appspot.com.storage.googleapis.com/hbr/styles.json'
}

// TODO 不要な値は除去する
export const updateCache: WrapperScriptType['updateCache'] = async () => {
  if (!isDev()) {
    return false
  }
  const cache = spreadsheetCache(env.cacheId)
  const styles = UrlFetchApp.fetch(hbrURL.styles).getContentText()
  cache.set(CACHE_KEY.STYLES, styles)

  cache.set(CACHE_KEY.CHARACTERS, characters)

  cache.set(CACHE_KEY.PASSIVES, passives)

  cache.set(CACHE_KEY.SKILLS, skills)

  return true
}

function convertStyles(raw: any) {

}

function convertCharacters(raw: any) {

}

function convertPassives(raw: any) {

}

function convertSkills(raw: any) {

}