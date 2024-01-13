import {CACHE_KEY, NOTION_KEY, properties, WrapperScriptType} from '@/utils'
import {NotionClient, spreadsheetCache} from 'ham-vue3-gas/gas'

export const getSkills: WrapperScriptType['getSkills'] = async() => {
    const cache = spreadsheetCache(properties['cache-id'], 86400)
    let result = cache.get(CACHE_KEY.SKILLS)
    if (!result) {
        const notion = new NotionClient(properties['notion-secret'])
        result = await notion.databases.query(NOTION_KEY.SKILLS, {
            sorts: [
                {
                    property: 'sortKey',
                    direction: 'ascending'
                },
                {
                    property: 'label',
                    direction: 'ascending'
                }
            ]
        })
        cache.set(CACHE_KEY.SKILLS, result)
    }
    return result
}