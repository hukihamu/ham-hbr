import {cache, CACHE_KEY, isDev, WrapperScriptType} from '@/utils'


export const isAdmin: WrapperScriptType['isAdmin'] = async () => {
  return isDev()
}

export const getAdminData: WrapperScriptType['getAdminData'] = async () => {
  if (isDev()) {
    return cache.get(CACHE_KEY.DEV_DATA)
  }
}

export const setAdminData: WrapperScriptType['setAdminData'] = async (data: any) => {
  if (isDev()) {
    cache.set(CACHE_KEY.DEV_DATA, data)
    return true
  }
  return false
}