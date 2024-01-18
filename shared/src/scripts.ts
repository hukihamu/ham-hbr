import {BaseScriptType} from 'ham-vue3-gas/share'
import {Character, Passive, Skill, Style} from './styles'
import {Accessory} from './accessory'
import {Chapter, ChapterImages, Event} from './event'

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
    getChapters: () => {chapters: Chapter[], chapterImages: ChapterImages}
    setChapters: (args: {chapters: Chapter[], chapterImages: ChapterImages}) => boolean
}
