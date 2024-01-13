import {isDev, WrapperScriptType} from '@/utils.ts'


export const isAdmin: WrapperScriptType['isAdmin'] = async () => {
  return isDev()
}