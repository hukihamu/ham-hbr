import {Skill} from './styles'

export interface Accessory {
  id: number
  in_date: string
  image: string
  name: string
  text: string
  location: string
  label: string
  skill: Skill[]
}