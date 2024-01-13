export interface StyleType {
  team: 'Angel Beats' | '31A' | '31B' | '31C' | '31D' | '31E' | '31F' | '31X' | '30G'
  tier: 'A' | 'S' | 'SS'
  role: 'Attacker' | 'Breaker' | 'Debuffer' | 'Buffer' | 'Blaster' | 'Healer' | 'Defender'
  type: 'Strike' | 'Stub' | 'Slash'
  element: 'Fire' | 'Light' | 'Thunder' | 'Dark' | 'Ice'
}

export interface Style {
  id: number
  character_id: number
  /**
   * image = replace('.webp', '_Thumbnail.webp')
   * strip = replace('.webp', '_Party.webp')
   */
  bg: string
  mv: string | null
  lmv: string | null
  lvl: string | null
  lvt: string | null
  name: string
  team: StyleType['team']
  desc: string
  in_date: string
  label: string
  tier: StyleType['tier']
  role: StyleType['role']
  type: StyleType['type']
  elements: StyleType['element'][]
  base_param: BaseParam
  skill_ids: number[]
  growth_abi: GrowthAbi | null
  limit_break: LimitBreak
  passive_ids: number[]
  generalize: boolean
}
export interface Character {
  id: number
  team: StyleType['team']
  chara: string
  /**
   * chara_icon += 'SmallIcon.webp'
   */
  chara_label: string
}

export interface Passive {
  category: string
  id: number
  label: string
  name: string
  desc: string
  info: string
  timing: string
  condition: string
  activ_rate: number
  effect: string
  auto_type: string
  skill?: Skill
  parts?: Part[]
  in_date: string
}

interface LimitBreak {
  stat_up_per_level: number
  bonus_per_level: BonusPerLevel[]
}

interface BonusPerLevel {
  step: number
  piece_num: number
  level_cap: number
  bonus: (AbilityBonus | PassiveBonus)[]
}

interface PassiveBonus {
  category: 'Passive'
  id: number
  label: string
  name: string
  desc: string
  info: string
  timing: string
  condition: string
  activ_rate: number
  effect: string
  auto_type: string
  parts: Part[]
  in_date: string
  ct: string
}

interface AbilityBonus {
  category: 'Ability'
  type: string
  value_type: string
  value: number[]
  skill: null
}

interface GrowthAbi {
  l: string
  n: string
}

export interface Skill {
  id: number
  style_id?: number
  label: string
  name: string
  desc: string
  hit_count: number
  target_type: string
  is_restricted: number
  auto_priority: number
  is_adv: boolean
  use_count: number[] | -1
  sp_cost: number
  max_level: number
  overwrite: number
  effect: string
  parts: Part[]
  hits: Hit[]
  in_date: string
  is_strval?: boolean
}

interface Part {
  skill_type: string
  target_type: string
  type: StyleType['type'] | null
  elements: StyleType['element'][]
  power: number[]
  value: number[]
  strval: number[] | Skill[]
  cond: string
  sstl: string[] | null
  dv: number
  multipliers: Multipliers
  diff_for_max: number
  parameters: Param
  growth: number[]
  hits: Hit[]
  hit_condition: string
  effect: Effect
}

interface Effect {
  category: string
  limitType: string
  exitCond: string
  exitVal: number[]
}

interface Hit {
  id: number
  type: string
  power_ratio: number
}

interface Param {
  str: number
  wis: number
  dex: number
  spr: number
  luk: number
  con: number
}

interface Multipliers {
  dp: number
  hp: number
  dr: number
}

interface BaseParam {
  dp: number
  hp: number
  sp: number
  str: number
  wis: number
  dex: number
  spr: number
  luk: number
  con: number
}