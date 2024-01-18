
export interface RawAccessory {
  id: number
  in_date: string
  label: string
  rarity: number
  image: string
  name: string
  text: string
  max_lv: number
  location: string
  condition: string
  effects: RawAccessoryEffect[]
  rng_eff: RngEff[][]
  skill: RawSkill[]
}

export interface RawAccessoryEffect {
  category: string
  type: string
  value_type: string
  value: number[]
  skill?: EffectSkill
}

export interface EffectSkill {
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
}

export interface RngEff {
  category: string
  type: string
  value_type: string
  value: number[]
  plus: number
  condition: string
  skill?: EffectSkill
}
