import fs from 'node:fs'

export function readFileReturnLines (filePath) {
  const data = fs.readFileSync(filePath, 'utf8')
  return data.split(/\r?\n/)
}
