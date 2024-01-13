

export function filterNotUndefined<T>(list: (T|undefined)[]): T[] {
  return list.filter(it => it)
}
