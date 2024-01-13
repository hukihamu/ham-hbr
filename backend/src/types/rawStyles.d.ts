interface RawStyles {
  id: number;
  image: string;
  strip: string;
  bg: string;
  mv?: string;
  lmv?: string;
  lvl?: string;
  lvt?: string;
  team: string;
  chara: string;
  chara_label: string;
  chara_icon: string;
  name: string;
  desc: string;
  in_date: string;
  label: string;
  tier: string;
  piece: RawPiece;
  role: string;
  type: string;
  elements: string[];
  weapon: RawWeapon;
  base_param: RawBaseParam;
  skills: RawSkill[];
  growth_abi?: RawGrowthAbi;
  limit_break: RawLimitBreak;
  ability_tree: RawAbilityTree[];
  passives: RawPassive[];
  generalize: boolean;
}
interface RawPassive {
  category: string;
  id: number;
  label: string;
  name: string;
  desc: string;
  info: string;
  timing: string;
  condition: string;
  activ_rate: number;
  effect: string;
  auto_type: string;
  skill?: RawSkill;
  in_date: string;
  parts?: RawPart[];
}
interface Part12 {
  elements: string[][];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: any[];
  hits: any[];
  hit_condition: string;
  effect: RawEffect;
}
interface Skill2 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number;
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part11[];
  hits: any[];
  in_date: string;
}
interface Part11 {
  skill_type: string;
  target_type: string;
  type: string;
  elements: any[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: any[];
  hit_condition: string;
  effect: RawEffect;
}
interface RawAbilityTree {
  label: string;
  name: string;
  conditions?: (string[] | null)[];
  ability_list: RawAbilityList[];
}
interface RawAbilityList {
  category: string;
  type: string;
  value_type: string;
  value: number[];
  skill: (null | number)[];
  is_exclusive: boolean;
  requires: RawRequires;
}
interface RawRequires {
  sc_num: number;
  ci_num: number;
  level: number;
  items: RawItem[];
}
interface RawItem {
  item: string;
  num: number;
}
interface RawLimitBreak {
  stat_up_per_level: number;
  bonus_per_level: RawBonusPerLevel[];
}
interface RawBonusPerLevel {
  step: number;
  piece_num: number;
  level_cap: number;
  bonus: RawBonus[][];
}
interface RawBonus {
  category: string;
  id?: number;
  label?: string;
  name?: string;
  desc?: string;
  info?: string;
  timing?: string;
  condition?: string;
  activ_rate?: number;
  effect?: string;
  auto_type?: string;
  parts?: Part10[];
  in_date?: string;
  ct?: string;
  type?: string;
  value_type?: string;
  value?: number[];
  skill?: any;
}
interface Part10 {
  skill_type: string;
  target_type: string;
  type?: string;
  elements: string[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: any[];
  hits: any[];
  hit_condition: string;
  effect: RawEffect;
}
interface RawGrowthAbi {
  l: string;
  n: string;
}
interface RawSkill {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[] | -1;
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: RawPart[];
  hits: RawHit[];
  in_date: string;
  is_strval?: boolean;
}
interface Part9 {
  skill_type: string;
  target_type: string;
  type?: null | null | null | string | string | string | string | string | string;
  elements: string[][];
  power: number[];
  value: number[];
  strval: (RawStrval | Strval2 | Strval3 | Strval4 | Strval5 | Strval6 | Strval7 | Strval8 | Strval9 | Strval10 | Strval11 | Strval12 | number | number | number | number | number | number | number | number | number | number | number | number)[];
  cond: string;
  sstl?: ((string[] | null)[] | null)[];
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: RawHit[][];
  hit_condition: string;
  effect: RawEffect;
}
interface Strval12 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part6[];
  hits: any[];
  in_date: string;
  is_strval: boolean;
}
interface Strval11 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part3[];
  hits: RawHit[];
  in_date: string;
  is_strval: boolean;
}
interface Strval10 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: RawPart[];
  hits: any[];
  in_date: string;
  is_strval: boolean;
}
interface Strval9 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part8[];
  hits: any[];
  in_date: string;
  is_strval: boolean;
}
interface Part8 {
  skill_type: string;
  target_type: string;
  type?: any;
  elements: any[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: RawHit[];
  hit_condition: string;
  effect: RawEffect;
}
interface Strval8 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part4[];
  hits: any[];
  in_date: string;
  is_strval: boolean;
}
interface Strval7 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part7[];
  hits: RawHit[];
  in_date: string;
  is_strval: boolean;
}
interface Part7 {
  skill_type: string;
  target_type: string;
  type?: string | string;
  elements: (string | string)[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: RawHit[][];
  hit_condition: string;
  effect: RawEffect;
}
interface Strval6 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part6[];
  hits: RawHit[];
  in_date: string;
  is_strval: boolean;
}
interface Part6 {
  skill_type: string;
  target_type: string;
  type?: string;
  elements: string[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: RawHit[];
  hit_condition: string;
  effect: RawEffect;
}
interface Strval5 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part5[];
  hits: any[];
  in_date: string;
  is_strval: boolean;
}
interface Part5 {
  skill_type: string;
  target_type: string;
  type: string;
  elements: string[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: any[];
  hit_condition: string;
  effect: RawEffect;
}
interface Strval4 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part4[];
  hits: RawHit[];
  in_date: string;
  is_strval: boolean;
}
interface Part4 {
  skill_type: string;
  target_type: string;
  type: string;
  elements: string[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: any[];
  hit_condition: string;
  effect: RawEffect;
}
interface Strval3 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part3[];
  hits: any[];
  in_date: string;
  is_strval: boolean;
}
interface Part3 {
  skill_type: string;
  target_type: string;
  type?: string;
  elements: any[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: RawHit[];
  hit_condition: string;
  effect: RawEffect;
}
interface Strval2 {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: Part2[];
  hits: RawHit[];
  in_date: string;
  is_strval: boolean;
}
interface Part2 {
  skill_type: string;
  target_type: string;
  type?: string | string;
  elements: any[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: RawHit[][];
  hit_condition: string;
  effect: RawEffect;
}
interface RawStrval {
  id: number;
  label: string;
  name: string;
  desc: string;
  hit_count: number;
  target_type: string;
  is_restricted: number;
  auto_priority: number;
  is_adv: boolean;
  use_count: number[];
  sp_cost: number;
  max_level: number;
  overwrite: number;
  effect: string;
  parts: RawPart[];
  hits: RawHit[];
  in_date: string;
  is_strval: boolean;
}
interface RawPart {
  skill_type: string;
  target_type: string;
  type?: string;
  elements: string[];
  power: number[];
  value: number[];
  strval: number[];
  cond: string;
  sstl?: any;
  dv: number;
  multipliers: RawMultipliers;
  diff_for_max: number;
  parameters: RawParameters;
  growth: number[];
  hits: RawHit[];
  hit_condition: string;
  effect: RawEffect;
}
interface RawEffect {
  category: string;
  limitType: string;
  exitCond: string;
  exitVal: number[];
}
interface RawHit {
  id: number;
  type: string;
  power_ratio: number;
}
interface RawParameters {
  str: number;
  wis: number;
  dex: number;
  spr: number;
  luk: number;
  con: number;
}
interface RawMultipliers {
  dp: number;
  hp: number;
  dr: number;
}
interface RawBaseParam {
  dp: number;
  hp: number;
  sp: number;
  str: number;
  wis: number;
  dex: number;
  spr: number;
  luk: number;
  con: number;
}
interface RawWeapon {
  type: string;
  name: string;
}
interface RawPiece {
  id: number;
  category: string;
  rarity: number;
  image: string;
  label: string;
  name: string;
  text: string;
  value: number;
  limit: number;
  price: number;
  price_alt: number;
  sale: number;
  currency: string;
  location: string;
  almightyRate: number;
}