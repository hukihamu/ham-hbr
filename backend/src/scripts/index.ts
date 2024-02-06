import {WrapperScriptType} from '@/utils'
import {updateCache} from '@/scripts/updateCache'
import {getAdminData, isAdmin, setAdminData} from '@/scripts/isAdmin'
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
    getAdminData,
    setAdminData,
}
