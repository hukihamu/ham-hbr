import {cache, CACHE_KEY, WrapperScriptType} from '@/utils'

export const getCharacters: WrapperScriptType['getCharacters'] = async () => {
  return cache.get(CACHE_KEY.CHARACTERS) ?? []
}
export const getEvents: WrapperScriptType['getEvents'] = async() => {
  return cache.get(CACHE_KEY.EVENTS) ?? []
}
export const getOrb: WrapperScriptType['getOrb'] = async() => {
  return cache.get(CACHE_KEY.ORB) ?? []
}
export const getPassives: WrapperScriptType['getPassives'] = async () => {
  return cache.get(CACHE_KEY.PASSIVES) ?? []
}
export const getSkills: WrapperScriptType['getSkills'] = async() => {
  return cache.get(CACHE_KEY.SKILLS) ?? []
}
export const getSouls: WrapperScriptType['getSouls'] = async() => {
  return cache.get(CACHE_KEY.SOULS) ?? []
}
export const getStyles: WrapperScriptType['getStyles'] = async() => {
  return cache.get(CACHE_KEY.STYLES) ?? []
}
