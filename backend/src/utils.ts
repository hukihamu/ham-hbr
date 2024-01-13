import {AsyncScriptType} from 'ham-vue3-gas/gas'
import {Scripts} from '@ham-vue3-gas/shared'

export const properties = PropertiesService.getScriptProperties().getProperties()

export const CACHE_KEY = {
    STYLES: 1,
    CHARACTERS: 2,
    SKILLS: 3,
    PASSIVES: 4,
    USERS: 5,
}
export const NOTION_KEY = {
    STYLES: '01787c6e41494170bb82a84084bf61ed',
    SKILLS: 'f41c90d66fd444f9add27a47283c1572',
    PASSIVES: '9ebfbef57dc2403c8899a0a59e3c2b09',
    CHARACTERS: '3d1f7760fa7c4609b84d5b0e9648422b',
    USERS: '4132529933bf42bb99c18b1f866e176b',
}
export type WrapperScriptType = AsyncScriptType<Scripts>

export function isDev(): boolean {
    return !!ScriptApp.getService().getUrl().match(/dev$/)
}

