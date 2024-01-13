import {BaseScriptType} from 'ham-vue3-gas/share'
import {Character, Passive, Skill, Style} from './styles'

export interface Scripts extends BaseScriptType {
    getStyles: () => Style[]
    getCharacters: () => Character[]
    getPassives: () => Passive[]
    getSkills: () => Skill[]
    updateCache: () => boolean
    isAdmin: () => boolean
}
