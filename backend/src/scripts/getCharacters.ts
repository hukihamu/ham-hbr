import {CACHE_KEY, NOTION_KEY, properties, WrapperScriptType} from '@/utils'
import {NotionClient, spreadsheetCache} from 'ham-vue3-gas/gas'

export const getCharacters: WrapperScriptType['getCharacters'] = async () => {
    const cache = spreadsheetCache(properties['cache-id'])
    let result = cache.get(CACHE_KEY.CHARACTERS)
    if (!result) {
        const notion = new NotionClient(properties['notion-secret'])
        result = (await notion.databases.query(NOTION_KEY.CHARACTERS, {
            sorts: [
                {
                    property: 'sortKey',
                    direction: 'ascending'
                }
            ]
        })).reduce((parent: any, it: any) => {
            parent[it.id] = {
                name: it.properties.name.title[0].text.content,
                team: it.properties.team.select.name,
                label: it.properties.label.rich_text[0].text.content,
                id: it.id,
            }
            return parent
        }, {})
        cache.set(CACHE_KEY.CHARACTERS, result)
    }
    return result
}