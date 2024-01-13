import {CACHE_KEY, NOTION_KEY, properties, WrapperScriptType} from '@/utils'

import {NotionClient, spreadsheetCache} from 'ham-vue3-gas/gas'

export const getStyles: WrapperScriptType['getStyles'] = async() => {
    const cache = spreadsheetCache(properties['cache-id'], 86400)
    let result = cache.get(CACHE_KEY.STYLES)
    if (!result) {
        const notion = new NotionClient(properties['notion-secret'])
        result = (await notion.databases.query(NOTION_KEY.STYLES, {
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
        })).map((style: any) => ({
            id: style.id,
            skills: style.properties.skills.relation.map((it: any) => it.id),
            elements: style.properties.elements.multi_select.map((it: any) => it.name),
            passives: style.properties.passives.relation.map((it: any) => it.id),
            paramTrend: style.properties.paramTrend.select?.name,
            type: style.properties.type.select?.name,
            tier: style.properties.tier.select?.name,
            label: style.properties.label.rich_text[0].text.content,
            background: style.properties.background.rich_text[0].text.content,
            generalize: style.properties.generalize.checkbox,
            inDate: style.properties.inDate.date.start,
            sortKey: style.properties.sortKey.formula.number,
            role: style.properties.role.select?.name,
            character: style.properties.character.relation[0].id,
            growth: style.properties.growth.select?.name,
            name: style.properties.name.title[0].text.content,
        }))
        cache.set(CACHE_KEY.STYLES, result)
    }
    return result
}