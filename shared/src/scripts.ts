import {BaseScriptType} from 'ham-vue3-gas/share'

export interface Scripts extends BaseScriptType {
    getStyles: () => {
        id: string
        skills: string[]
        elements: string[]
        passives: string[]
        paramTrend?: string
        type?: string
        tier?: string
        label: string
        generalize: boolean
        inDate: string
        sortKey: number
        role?: string
        character: string
        growth?: string
        name: string
        background: string
    }[]
    getCharacters: () => {
        [id: string]: {
            label: string
            team: string
            name: string
            id: string
        }
    }
    getSkills:() => any[]
    updateDatabase: () => boolean
    getUserData: () => any
    updateUserData: (args: {pageId: string, properties: any}) => boolean
    updateCache: () => boolean
}
