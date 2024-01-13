import {createGasApp} from 'ham-vue3-gas/gas'
import {scripts} from '@/scripts'

createGasApp({
    useGasAPI: {
        // ここにAppsScriptAPIを入れる
        urlFetchApp: UrlFetchApp,
        spreadsheetApp: SpreadsheetApp,
    }
}).useScripts(scripts, (global, wrapperScript) => {
    global.getCharacters = wrapperScript('getCharacters')
    global.getStyles = wrapperScript('getStyles')
    global.getSkills = wrapperScript('getSkills')
    global.getUserData = wrapperScript('getUserData')
    global.updateDatabase = wrapperScript('updateDatabase')
    global.updateUserData = wrapperScript('updateUserData')
})
