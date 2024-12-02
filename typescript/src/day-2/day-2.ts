import fs from "node:fs"
import path from "node:path"

const parseInput = (filename: string): number[][] => {
  const file_path = path.join(__dirname, filename)
  const file = fs.readFileSync(file_path, 'utf-8')
  const lines = file.split('\n')

  const data: number[][] = []
  for (let line of lines) {
    if (line.trim() === '') continue;
    const levels: number[] = []
    const numbers = line.split(' ').filter(Boolean)
    for (let number of numbers) {
      levels.push(parseInt(number))
    }
    data.push(levels)
  }
  return data
}



const isSafeWithDampener = (levels: number[]): boolean => {
  if (isSafeReport(levels)) {
    return true;
  }

  for (let i = 0; i < levels.length; i++) {
    const newLevels = levels.slice(0, i).concat(levels.slice(i + 1));
    if (isSafeReport(newLevels)) {
      return true;
    }
  }

  return false;
}

const isSafeReport = (levels: number[]): boolean => {
  if (levels.length < 2) return false;

  let isIncreasing = levels[1] > levels[0];
  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      return false;
    }
    if ((isIncreasing && diff <= 0) || (!isIncreasing && diff >= 0)) {
      return false;
    }
  }
  return true;
}

export const part1 = (filename: string): number => {
  const data = parseInput(filename)

  let total_safe_count = 0;
  for (let level of data) {
    if (isSafeReport(level)) {
      total_safe_count++;
    }
  }

  return total_safe_count;
}


export const part2 = (filename: string): number => {
  const data = parseInput(filename);

  let total_safe_count = 0;
  for (let level of data) {
    if (isSafeWithDampener(level)) {
      total_safe_count++;
    }
  }

  return total_safe_count;
}