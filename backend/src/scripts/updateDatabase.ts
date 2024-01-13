import {WrapperScriptType} from '@/utils'
// import {NotionClient, spreadsheetCache} from 'ham-vue3-gas/gas'

export const updateDatabase: WrapperScriptType['updateDatabase'] = async() => {
    // const startTime = Date.now()
    // const notion = new NotionClient(properties['notion-secret'])
    // const styles = await notion.databases.query(NOTION_KEY.STYLES)
    // const passives = await notion.databases.query(NOTION_KEY.PASSIVES)
    // const characters = await notion.databases.query(NOTION_KEY.CHARACTERS)
    // const result = JSON.parse(UrlFetchApp.fetch('https://dissidiadb-cbde0.appspot.com.storage.googleapis.com/hbr/styles.json').getContentText())
    // for (const style of result) {
    //     if (!styles.find((it: any) => it.properties.label.rich_text[0].plain_text === style.label)) {
    //         // passive
    //         const pList = []
    //         for (const lb of style.limit_break.bonus_per_level) {
    //             for (const bonus of lb.bonus) {
    //                 if (bonus.category === 'Passive') {
    //                     const p = passives.find((it: any) => it.properties.label.rich_text[0].plain_text === bonus.label)
    //                     if (p) {
    //                         pList.push(p.id)
    //                     } else {
    //                         pList.push(await notion.pages.create({
    //                             parent: {database_id: NOTION_KEY.PASSIVES},
    //                             properties: {
    //                                 name: {
    //                                     title: [{text: {content: bonus.name}}]
    //                                 },
    //                                 label: {
    //                                     rich_text: [{text: {content: bonus.label}}]
    //                                 },
    //                                 desc: {
    //                                     rich_text: [{text: {content: bonus.desc}}]
    //                                 },
    //                                 condition: {
    //                                     rich_text: [{text: {content: bonus.condition}}]
    //                                 },
    //                                 effect: {
    //                                     rich_text: [{text: {content: bonus.effect}}]
    //                                 },
    //                                 timing: {
    //                                     rich_text: [{text: {content: bonus.timing}}]
    //                                 },
    //                                 limitBreak: {
    //                                     number: lb.step
    //                                 },
    //                             }
    //                         }).then(it => it.id))
    //                     }
    //                 }
    //             }
    //         }
    //
    //         // skill
    //         const sList = []
    //         for (const skill of style.skills.filter((it: any) => !['追撃', '通常攻撃'].includes(it.name))) {
    //             sList.push(await notion.pages.create({
    //                 parent: {database_id: NOTION_KEY.SKILLS},
    //                 properties: {
    //                     name: {
    //                         title: [{text: {content: skill.name}}]
    //                     },
    //                     label: {
    //                         rich_text: [{text: {content: skill.label}}]
    //                     },
    //                     isRestricted: {
    //                         checkbox: skill.is_restricted === 1
    //                     },
    //                     sp: {
    //                         number: skill.sp_cost
    //                     },
    //                     targetType: {
    //                         select: {name: skill.target_type}
    //                     },
    //                 }
    //             }).then(it => it.id))
    //         }
    //         // style
    //         await notion.pages.create({
    //             parent: {database_id: NOTION_KEY.STYLES},
    //             properties: {
    //                 name: {
    //                     title: [{text: {content: style.name}}]
    //                 },
    //                 label: {
    //                     rich_text: [{text: {content: style.label}}]
    //                 },
    //                 background: {
    //                     rich_text: [{text: {content: style.bg}}]
    //                 },
    //                 role: {
    //                     select: {name: style.role}
    //                 },
    //                 type: {
    //                     select: {name: style.type}
    //                 },
    //                 paramTrend: {
    //                     select: {
    //                         name: [
    //                             {key: 'str', value: style.base_param.str},
    //                             {key: 'wis', value: style.base_param.wis},
    //                             {key: 'dex', value: style.base_param.dex},
    //                             {key: 'spr', value: style.base_param.spr},
    //                             {key: 'luk', value: style.base_param.luk},
    //                             {key: 'con', value: style.base_param.con},
    //                         ]
    //                             .sort((a, b) => a.value < b.value ? 1 : -1)
    //                             .slice(0,2)
    //                             .map(it => it.key)
    //                             .join('_')
    //                     }
    //                 },
    //                 tier: {
    //                     select: {name: style.tier}
    //                 },
    //                 elements: {
    //                     multi_select: style.elements.map((it: string) => ({name: it}))
    //                 },
    //                 inDate: {
    //                     date: {start: style.in_date.match(/^\d{4}-\d{2}-\d{2}/)[0]}
    //                 },
    //                 character: {
    //                     relation: [
    //                         {id: characters.find((it: any) => it.properties.label.rich_text[0].plain_text === style.chara_label).id}
    //                     ]
    //                 },
    //                 passives: {
    //                     relation: pList.map(it => ({id: it}))
    //                 },
    //                 skills: {
    //                     relation: sList.map(it => ({id: it}))
    //                 },
    //                 generalize: {
    //                     checkbox: style.generalize
    //                 },
    //                 growth: style.growth_abi ?  { select: {name: style.growth_abi.l} }: undefined
    //             }
    //         })
    //     }
    //     if ((Date.now() - startTime) >= 240000) {
    //         return false
    //     }
    // }
    // spreadsheetCache(properties['cache-id']).clear(1)
    return true
}