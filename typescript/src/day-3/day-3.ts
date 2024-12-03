import fs from "node:fs"
import path from "node:path"

const parseInput = (filename: string): string => {
  const file_path = path.join(__dirname, filename)
  return fs.readFileSync(file_path, 'utf-8')
}

const parse_mul_instructions = (data: string): number => {
  let total = 0

  const instructions = data.match(/mul\(\d+,\d+\)/g)
  if (!instructions) return total

  for (const instruction of instructions) {
    const [x, y] = instruction.slice(4, -1).split(',').map(Number)
    total += x * y
  }

  return total
}

const parse_do_mul_instructions = (data: string): number => {
  let isEnabled = true
  let total = 0

  const instructions = data.match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)
  if (!instructions) return total

  for (const instruction of instructions) {
    if (instruction === 'do()') {
      isEnabled = true
    } else if (instruction === "don't()") {
      isEnabled = false
    } else if (isEnabled && instruction.startsWith('mul(')) {
      const [x, y] = instruction.slice(4, -1).split(',').map(Number)
      total += x * y
    }
  }

  return total
}


export const part1 = (filename: string): number => {
  const data = parseInput(filename)
  return parse_mul_instructions(data)
}

export const part2 = (filename: string): number => {
  const data = parseInput(filename)
  return parse_do_mul_instructions(data)
}