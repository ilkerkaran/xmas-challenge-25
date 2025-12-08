const start = Date.now()

import { readFileReturnLines } from '../utils/read-file-return-lines.mjs'

const lines = readFileReturnLines('../../inputs/day-7/input.txt')
const linesEx = readFileReturnLines('../../inputs/day-7/input-ex.txt')

const p1 = lines => {
  const beamMap = {}

  beamMap[lines[0].indexOf('S')] = true
  let ctr = 0
  for (let i = 2; i < lines.length; i += 2) {
    lines[i].split('').map((char, j) => {
      if (char == '^') {
        if (beamMap[j]) {
          ctr++
        }
        beamMap[j - 1] = true
        beamMap[j + 1] = true
        beamMap[j] = false
      }
    })
  }
  return ctr
}

const p2 = lines => {
  let path = lines[0].indexOf('S')
  let ctr = 0
  let h = 0
  const cache = new Map()
  const key = (loc, startLine) => `${loc},${startLine}`

  const move = (loc, startLine) => {
    const cacheKey = key(loc, startLine)
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }
    for (let j = startLine; j < lines.length; j += 2) {
      if (lines[j][loc] == '^') {
        const result = move(loc + 1, j + 2) + move(loc - 1, j + 2)
        cache.set(cacheKey, result)
        return result
      }
    }
    cache.set(cacheKey, 1n)
    return 1n
  }
  const res = move(path, 2)
  console.log('Cache size:', cache.size * 16, 'bytes')
  return res
}

console.log('p1 Expected: 21, actual: ', p1(linesEx))
console.log('p1', p1(lines))

console.log('p2 Expected: 40, actual: ', p2(linesEx))
console.log('p2 Expected: 7759107121385, actual', p2(lines))
console.log('Execution time:', Date.now() - start, 'ms')
