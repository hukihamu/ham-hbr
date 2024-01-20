import {cache, CACHE_KEY, isDev, WrapperScriptType} from '@/utils'
import {Accessory, Character, Passive, Skill, Style, Event} from '@ham-vue3-gas/shared'
import {RawAccessory} from '@/types/rawAccessory'

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

  const {orb, soul} = convertAccessories(JSON.parse(UrlFetchApp.fetch('https://dissidiadb-cbde0.appspot.com.storage.googleapis.com/hbr/accessories.json').getContentText()))
  const events = convertEvents(JSON.parse(UrlFetchApp.fetch('https://dissidiadb-cbde0.appspot.com.storage.googleapis.com/hbr/events.json').getContentText()))
  cache.set(CACHE_KEY.STYLES, styles)
  cache.set(CACHE_KEY.CHARACTERS, characters)
  cache.set(CACHE_KEY.PASSIVES, passives)
  cache.set(CACHE_KEY.SKILLS, skills)
  cache.set(CACHE_KEY.ORB, orb)
  cache.set(CACHE_KEY.SOULS, soul)
  cache.set(CACHE_KEY.EVENTS, events)

  return true
}
type ConvertStyles = {
  styles: Style[],
  characters: Character[],
  passives: Passive[],
  skills: Skill[]
}
type ConvertAccessories = {
  orb: Accessory[],
  soul: Accessory[],
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

function convertAccessories(raw: RawAccessory[]): ConvertAccessories {
  return raw.reduce<ConvertAccessories>((result, current) => {
    if (current.location === '記憶の修復（記憶の庭）') {
      // soul
      result.soul.push({
        id: current.id,
        name: current.name,
        in_date: current.in_date,
        location: current.location,
        text: current.text,
        label: current.label,
        image: current.image,
        skill: current.skill,
      })
    } else if (current.location?.match(/オーブボス.?/) && current.skill.length) {
      // orb
      result.orb.push({
        id: current.id,
        name: current.name,
        in_date: current.in_date,
        location: current.location,
        text: current.text,
        label: current.label,
        image: current.image,
        skill: current.skill,
      })
    }
    return result
  }, {orb: [], soul: []})
}

function convertEvents(raw: any[]): Event[] {
  return raw.filter(it => !it.label.match(/^SideEvent\.PR/)).map(it => ({
    id: it.id,
    name: it.name,
    in_date: it.in_date,
    image: it.image,
    desc: it.desc,
    condition: it.condition,
    label: it.label,
    logo: it.logo,
    notice_id: it.notice_id,
    out_date: it.out_date,
  }))
}