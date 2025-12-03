import { readFileReturnLines } from '../utils/read-file-return-lines.mjs'

const lines = readFileReturnLines('./day-1/input.txt')
let zeroPass = 0
let cur = 50
for (const line of lines) {
  console.log('Processing line:', line)
  const dir = line[0]
  let steps = parseInt(line.slice(1), 10)
  const ctr = dir === 'L' ? -1 : 1
  while (steps > 0) {
    cur += ctr
    if (cur === 100) {
      cur = 0
    } else if (cur === -1) {
      cur = 99
    }
    if (cur === 0) {
      zeroPass++
    }

    steps--
  }
}
console.log('Answer:', zeroPass)
