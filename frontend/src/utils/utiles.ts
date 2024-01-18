import {Style} from '@ham-vue3-gas/shared'


export function filterNotUndefined<T>(list: (T|undefined)[]): T[] {
  return list.filter(it => it) as T[]
}
export function getStylesById(ids: number[], _styles: Style[]) {
  return filterNotUndefined(ids.map(id => _styles.find(it => it.id === id))).sort((a, b) => a.id - b.id)
}