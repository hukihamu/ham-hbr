import {CACHE_KEY, NOTION_KEY, properties, WrapperScriptType} from '@/utils'
import {NotionClient, spreadsheetCache} from 'ham-vue3-gas/gas'

export const getUserData: WrapperScriptType['getUserData'] = async () => {
    const email = Session.getActiveUser().getEmail()
    const notion = new NotionClient(properties['notion-secret'])
    //  cache利用
    const cache = spreadsheetCache(properties['cache-id'])
    let result = cache.get(CACHE_KEY.USERS)
    if (!result) {
        // notion apiからUsersを取得
        result = await notion.databases.query(NOTION_KEY.USERS)
        cache.set(CACHE_KEY.USERS, result)
    }
    const index = result.findIndex((user: any) => user.properties.email.title[0].text.content === email)
    if (index !== -1) {
        const userData = result[index]
        let hasMore = false
        for (const key of Object.keys(userData.properties)) {
            if (userData.properties[key].type === 'relation' && userData.properties[key].has_more) {
                hasMore = true
                // TODO こいつもhasMoreあり
                const prop = await notion.pages.getProperty(userData.id, userData.properties[key].id)
                userData.properties[key].relation = prop.results.map((it: any) => it.relation)
                userData.properties[key].has_more = false
            }
        }
        if (hasMore) {
            result[index] = userData
            cache.set(CACHE_KEY.USERS, result)
        }
        return userData
    } else {
        const data = await notion.pages.create({
            parent: {database_id: NOTION_KEY.USERS},
            properties: {email: {title: [{text: {content: email}}]}}
        })
        result.push(data)
        cache.set(CACHE_KEY.USERS, result)
        return data
    }
}