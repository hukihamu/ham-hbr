import {cache, CACHE_KEY, isDev, WrapperScriptType} from '@/utils'
import {Character, Passive, Skill, Style} from '@ham-vue3-gas/shared'

export const updateCache: WrapperScriptType['updateCache'] = async () => {
  if (!isDev()) {
    return false
  }
  const {
    styles,
    characters,
    passives,
    skills,
  } = convertStyles(JSON.parse(UrlFetchApp.fetch('https://dissidiadb-cbde0.appspot.com.storage.googleapis.com/hbr/styles.json').getContentText()))

  cache.set(CACHE_KEY.STYLES, styles)
  cache.set(CACHE_KEY.CHARACTERS, characters)
  cache.set(CACHE_KEY.PASSIVES, passives)
  cache.set(CACHE_KEY.SKILLS, skills)

  return true
}
type ConvertStyles = {
  styles: Style[],
  characters: Character[],
  passives: Passive[],
  skills: Skill[]
}

function convertStyles(raw: RawStyle[]): ConvertStyles {
  return raw.reduce<ConvertStyles>((result, current) => {
    if (result.characters.every(it => it.chara_label !== current.chara_label)) {
      result.characters.push({
        id: result.characters.length,
        chara_label: current.chara_label,
        chara: current.chara,
        team: current.team,
      })
    }
    result.styles.push({
      id: current.id,
      base_param: current.base_param,
      bg: current.bg,
      desc: current.desc,
      team: current.team,
      character_id: result.characters.length - 1,
      elements: current.elements,
      generalize: current.generalize,
      growth_abi: current.growth_abi,
      in_date: current.in_date,
      label: current.label,
      lmv: current.lmv,
      lvl: current.lvl,
      lvt: current.lvt,
      limit_break: current.limit_break,
      name: current.name,
      type: current.type,
      mv: current.mv,
      role: current.role,
      passive_ids: current.passives.map(it => it.id),
      tier: current.tier,
      skill_ids: current.skills.map(it => it.id),
    })
    current.passives.forEach(passive => {
      if (result.passives.every(it => it.id !== passive.id)) {
        result.passives.push(passive)
      }
    })
    result.skills.push(...current.skills.map(it => {
      const skill: Skill = it
      skill.style_id = current.id
      return skill
    }))
    return result
  }, {styles: [], characters: [], passives: [], skills: []})
}