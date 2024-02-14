export function arrayUnique<T>(array: T[]): T[] {
  let unique: T[] = new Array<T>()
  for (let i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) === i) {
      unique = unique.concat([array[i]])
    }
  }

  return unique
}
