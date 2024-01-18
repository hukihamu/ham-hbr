import {isDev, WrapperScriptType} from '@/utils'


export const isAdmin: WrapperScriptType['isAdmin'] = async () => {
  return isDev()
}