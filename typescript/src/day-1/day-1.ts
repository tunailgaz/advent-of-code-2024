import fs from "node:fs"
import path from "node:path"

export const parseInput = (filename: string): [number[], number[]] => {
  const file_path = path.join(__dirname, filename)
  const file = fs.readFileSync(file_path, 'utf-8')
  const lines = file.split('\n')
  const left: number[] = []
  const right: number[] = []

  for (let line of lines) {
    const [left_id, right_id] = line.split(' ').filter(Boolean) as [string, string]
    left.push(parseInt(left_id))
    right.push(parseInt(right_id))
  }
  return [left, right]
}

export const part1 = (filename: string): number => {
  const [left, right] = parseInput(filename)
  let total = 0

  const sorted_left = left.sort((a, b) => a - b)
  const sorted_right = right.sort((a, b) => a - b)
  for (let i = 0; i < sorted_left.length; i++) {
    total += Math.abs(sorted_left[i] - sorted_right[i])
  }
  return total
}

const findNumberOfOccurrence = (arr: number[], value: number): number => {
  let count = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      count++
    }
  }
  return count
}

export const part2 = (filename: string): number => {
  const [left, right] = parseInput(filename)
  let total = 0
  for (let i = 0; i < left.length; i++) {
    total += findNumberOfOccurrence(right, left[i]) * left[i]
  }
  return total
}