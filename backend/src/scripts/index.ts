import {WrapperScriptType} from '@/utils'
import {getStyles} from '@/scripts/getStyles'
import {getCharacters} from '@/scripts/getCharacters'
import {getSkills} from '@/scripts/getSkills'
import {getPassives} from '@/scripts/getPassives'
import {updateCache} from '@/scripts/updateCache'
import {isAdmin} from '@/scripts/isAdmin'
import {getOrb} from '@/scripts/getOrb'
import {getSouls} from '@/scripts/getSouls'
import {getEvents} from '@/scripts/getEvents'
import {getChapters} from '@/scripts/getChapters'
import {setChapters} from '@/scripts/setChapters'


export const scripts: WrapperScriptType = {
    getStyles,
    getCharacters,
    getSkills,
    getPassives,
    updateCache,
    isAdmin,
    getOrb,
    getSouls,
    getEvents,
    getChapters,
    setChapters,
}