import {BaseScriptType} from 'ham-vue3-gas/share'
import {Character, Passive, Skill, Style} from './styles'
import {Accessory} from './accessory'
import {Event} from './event'
import {Chapter, ChapterImages} from './masterData'

export interface Scripts extends BaseScriptType {
    getStyles: () => Style[]
    getCharacters: () => Character[]
    getPassives: () => Passive[]
    getSkills: () => Skill[]
    getOrb: () => Accessory[]
    getSouls: () => Accessory[]
    getEvents: () => Event[]
    updateCache: () => boolean
    isAdmin: () => boolean
    getMasterData: () => {chapters: Chapter[], chapterImages: ChapterImages}
    setMasterData: (args: {chapters: Chapter[], chapterImages: ChapterImages}) => boolean
}
