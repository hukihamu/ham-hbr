import {WrapperScriptType} from '@/utils'
import {updateCache} from '@/scripts/updateCache'
import {isAdmin} from '@/scripts/isAdmin'
import {getOrb, getSouls, getEvents, getSkills, getPassives, getCharacters, getStyles} from '@/scripts/getCache'
import {setMasterData, getMasterData} from '@/scripts/masterData'


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
    getMasterData,
    setMasterData,
}
