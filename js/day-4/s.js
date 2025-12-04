const start = Date.now()

import { readFileReturnLines } from '../utils/read-file-return-lines.mjs'

class Graph {
  constructor (lines) {
    this.g = []
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      this.g[i] = line.split('')
    }
  }

  get (x, y) {
    if (x < 0 || x >= this.g.length || y < 0 || y >= this.g[0].length) {
      return null
    }
    return this.g[x][y]
  }

  n (x, y) {
    return this.get(x - 1, y)
  }

  s (x, y) {
    return this.get(x + 1, y)
  }

  e (x, y) {
    return this.get(x, y + 1)
  }

  w (x, y) {
    return this.get(x, y - 1)
  }

  ne (x, y) {
    return this.get(x - 1, y + 1)
  }

  nw (x, y) {
    return this.get(x - 1, y - 1)
  }

  se (x, y) {
    return this.get(x + 1, y + 1)
  }

  sw (x, y) {
    return this.get(x + 1, y - 1)
  }

  getAllAdjacents () {
    const adjacents = []
    for (let i = 0; i < this.g.length; i++) {
      for (let j = 0; j < this.g[i].length; j++) {
        adjacents.push([this.g[i][j], this.getAdjacentsArr(i, j)])
      }
    }
    return adjacents
  }

  getAdjacentsArr (x, y) {
    return [
      this.n(x, y),
      this.s(x, y),
      this.e(x, y),
      this.w(x, y),
      this.ne(x, y),
      this.nw(x, y),
      this.se(x, y),
      this.sw(x, y)
    ]
  }

  getAdjacents (x, y) {
    return {
      n: this.n(x, y),
      s: this.s(x, y),
      e: this.e(x, y),
      w: this.w(x, y),
      ne: this.ne(x, y),
      nw: this.nw(x, y),
      se: this.se(x, y),
      sw: this.sw(x, y),
      arr: [
        this.n(x, y),
        this.s(x, y),
        this.e(x, y),
        this.w(x, y),
        this.ne(x, y),
        this.nw(x, y),
        this.se(x, y),
        this.sw(x, y)
      ]
    }
  }

  print () {
    for (let i = 0; i < this.g.length; i++) {
      console.log(this.g[i].join(''))
    }
  }

  remove (lift = false) {
    let removed = 0
    for (let i = 0; i < this.g.length; i++) {
      for (let j = 0; j < this.g[i].length; j++) {
        if (this.g[i][j] !== '@') continue
        const adjArr = this.getAdjacentsArr(i, j)
        if (adjArr.filter(val => val == '@').length < 4) {
          removed++
          if (lift) this.g[i][j] = '.'
        }
      }
    }
    return removed
  }
}

const lines = readFileReturnLines('../../inputs/day-4/input.txt')

const graph = new Graph(lines)

const ans1 = graph.remove()

let cur = 0
let ans2 = 0

do {
  cur = graph.remove(true)
  ans2 += cur
} while (cur > 0)

console.log(`Answer1: ${ans1}`)
console.log(`Answer2: ${ans2}`)
console.log('Execution time:', Date.now() - start, 'ms')
