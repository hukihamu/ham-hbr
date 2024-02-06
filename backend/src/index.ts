import {createGasApp} from 'ham-vue3-gas/gas'
import {scripts} from '@/scripts'

createGasApp().useScripts(scripts, (global, wrapperScript) => {
    global.getCharacters = wrapperScript('getCharacters')
    global.getStyles = wrapperScript('getStyles')
    global.getSkills = wrapperScript('getSkills')
    global.getPassives = wrapperScript('getPassives')
    global.updateCache = wrapperScript('updateCache')
    global.isAdmin = wrapperScript('isAdmin')
    global.getOrb = wrapperScript('getOrb')
    global.getEvents = wrapperScript('getEvents')
    global.getSouls = wrapperScript('getSouls')
    global.getMasterData = wrapperScript('getMasterData')
    global.setMasterData = wrapperScript('setMasterData')
    global.getAdminData = wrapperScript('getAdminData')
    global.setAdminData = wrapperScript('setAdminData')
})

