import {updateUserData} from '@/scripts/updateUserData'
import {WrapperScriptType} from '@/utils'
import {getStyles} from '@/scripts/getStyles'
import {getUserData} from '@/scripts/getUserData'
import {getCharacters} from '@/scripts/getCharacters'
import {getSkills} from '@/scripts/getSkills'
import {updateDatabase} from '@/scripts/updateDatabase'
import {updateCache} from '@/scripts/updateCache.ts'




export const scripts: WrapperScriptType = {
    updateUserData,
    getStyles,
    getUserData,
    getCharacters,
    getSkills,
    updateDatabase,
    updateCache,
}