// import {NotionClient, spreadsheetCache} from 'ham-vue3-gas/gas'
import {WrapperScriptType} from '@/utils'


export const updateUserData: WrapperScriptType['updateUserData'] =  async() => {
    // const notion = new NotionClient(properties['notion-secret'])
    // // cache削除
    // spreadsheetCache(properties['cache-id']).clear(CACHE_KEY.USERS)
    // // notion update
    // await notion.pages.updateProperty(args.pageId, {properties: args.properties})
    return true
}
