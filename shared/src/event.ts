export interface Event {
  id: number
  notice_id: number
  label: string
  name: string
  desc: string
  logo: string
  image: string
  condition: string
  in_date: string
  out_date: string
}

export interface Chapter {
  id: number
  label: string
  name: string
  desc: string
  image: string
  in_date: string
}

export interface ChapterImages {
  [label: string]: string
}