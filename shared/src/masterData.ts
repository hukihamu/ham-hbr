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