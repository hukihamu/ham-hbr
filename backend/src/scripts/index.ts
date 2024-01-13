import {WrapperScriptType} from '@/utils'
import {getStyles} from '@/scripts/getStyles'
import {getCharacters} from '@/scripts/getCharacters'
import {getSkills} from '@/scripts/getSkills'
import {getPassives} from '@/scripts/getPassives'
import {updateCache} from '@/scripts/updateCache'
import {isAdmin} from '@/scripts/isAdmin.ts'




export const scripts: WrapperScriptType = {
    getStyles,
    getCharacters,
    getSkills,
    getPassives,
    updateCache,
    isAdmin
}