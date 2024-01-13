interface RawStyle {
  id: number
  image: string
  strip: string
  bg: string
  mv: string | null
  lmv: string | null
  lvl: string | null
  lvt: string | null
  team: string
  chara: string
  chara_label: string
  chara_icon: string
  name: string
  desc: string
  in_date: string
  label: string
  tier: string
  piece: RawPiece
  role: string
  type: string
  elements: string[]
  weapon: RawWeapon
  base_param: RawBaseParam
  skills: RawSkill[]
  growth_abi: RawGrowthAbi | null
  limit_break: RawLimitBreak
  ability_tree: RawAbilityTree[]
  passives: RawPassive[]
  generalize: boolean
}
interface RawPassive {
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
  skill?: RawSkill
  in_date: string
  parts?: RawPart[]
}
interface RawAbilityTree {
  label: string
  name: string
  conditions: string[] | null
  ability_list: RawAbilityList[]
}
interface RawAbilityList {
  category: string
  type: string
  value_type: string
  value: number[]
  skill: number | null
  is_exclusive: boolean
  requires: RawRequires
}
interface RawRequires {
  sc_num: number
  ci_num: number
  level: number
  items: RawItem[]
}
interface RawItem {
  item: string
  num: number
}
interface RawLimitBreak {
  stat_up_per_level: number
  bonus_per_level: RawBonusPerLevel[]
}
interface RawBonusPerLevel {
  step: number
  piece_num: number
  level_cap: number
  bonus: (RawAbilityBonus | RawPassiveBonus)[]
}
interface RawPassiveBonus {
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
  parts: RawPart[]
  in_date: string
  ct: string
}
interface RawAbilityBonus {
  category: "Ability"
  type: string
  value_type: string
  value: number[]
  skill: null
}
interface RawGrowthAbi {
  l: string
  n: string
}
interface RawSkill {
  id: number
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
  parts: RawPart[]
  hits: RawHit[]
  in_date: string
  is_strval?: boolean
}
interface RawPart {
  skill_type: string
  target_type: string
  type: string | null
  elements: string[]
  power: number[]
  value: number[]
  strval: number[] | RawSkill[]
  cond: string
  sstl: string[] | null
  dv: number
  multipliers: RawMultipliers
  diff_for_max: number
  parameters: RawParameters
  growth: number[]
  hits: RawHit[]
  hit_condition: string
  effect: RawEffect
}
interface RawEffect {
  category: string
  limitType: string
  exitCond: string
  exitVal: number[]
}
interface RawHit {
  id: number
  type: string
  power_ratio: number
}
interface RawParameters {
  str: number
  wis: number
  dex: number
  spr: number
  luk: number
  con: number
}
interface RawMultipliers {
  dp: number
  hp: number
  dr: number
}
interface RawBaseParam {
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
interface RawWeapon {
  type: string
  name: string
}
interface RawPiece {
  id: number
  category: string
  rarity: number
  image: string
  label: string
  name: string
  text: string
  value: number
  limit: number
  price: number
  price_alt: number
  sale: number
  currency: string
  location: string
  almightyRate: number
}