export function filterNotUndefined<T>(list: (T|undefined)[]): T[] {
  return list.filter(it => it) as T[]
}
export function getListById(ids: number[], list: any[], isNotSort: boolean = false) {
  const temp = filterNotUndefined(ids.map(id => list.find(it => it.id === id)))
  return isNotSort ? temp : temp.sort((a, b) => a.id - b.id)
}

export function zeroToOne(num: number): number {
  if (num === 0) return 1
  return num
}