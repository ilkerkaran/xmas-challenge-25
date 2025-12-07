const start = Date.now()

import { readFileReturnLines } from '../utils/read-file-return-lines.mjs'

const lines = readFileReturnLines('../../inputs/day-6/input.txt')

const matrix = lines.map(line => line.split(''))

const transposed = matrix[0].map((_, colIndex) =>
  matrix.map(row => row[colIndex])
)
const problemArr = []
console.log('Transposed:', transposed)
const operators = []
let nums = []
for (let i = 0; i < transposed.length; i++) {
  if (transposed[i][transposed[i].length - 1] !== ' ') {
    operators.push(transposed[i][transposed[i].length - 1])
  }
  console.log(
    'Transposed col:',
    transposed[i],
    transposed[i].some(char => char !== '')
  )
  if (transposed[i].some(char => char !== ' ')) {
    nums.push(
      +transposed[i]
        .slice(0, transposed[i].length - 1)
        .join('')
        .trim()
    )
  } else {
    problemArr.push(nums)
    nums = []
  }
}
problemArr.push(nums)
let ans = 0
for (let i = 0; i < problemArr.length; i++) {
  console.log('Problem set', i + 1)
  const p = problemArr[i]
  const op = operators[i]
  let res = op === '+' ? 0 : 1
  for (let j = 0; j < problemArr[i].length; j++) {
    if (op === '+') {
      res += p[j]
    } else if (op === '*') {
      res *= p[j]
    }
  }
  ans += res
}

console.log('Answer:', ans)
console.log('Execution time:', Date.now() - start, 'ms')
