import * as fs from 'node:fs';

const day3 = () => {
  console.log("Day 3")
  const content = fs.readFileSync("assets/2022-12-03.txt", {encoding: "utf-8"})
  const sacks = content.split("\n").slice(0, -1)
  const priority = (chr: string) => {
    const code = chr.charCodeAt(0)
    // A = 27 ... Z = 52 ... a = 1 ... z = 26
    // A = 65 ...            a = 97
    const offset = code < 97 ? -65 + 27 : -97 + 1
    return code + offset
  }
  const mistakes = sacks.map(sack => {
    const size = sack.length / 2
    const c1 = new Set(sack.slice(0, size))
    const c2 = new Set(sack.slice(size))
    return priority(Array.from(c1.keys()).filter(k => c2.has(k))[0])
  })
  console.log(
    "  Part 1: ",
    mistakes.reduce((a, b) => a + b)
  )
  const count = (items: string[]) => {
    const counts: Record<string, number> = {}
    Array.from(items).forEach((item: string) => {
        if(!counts.hasOwnProperty(item)) {
            counts[item] = 1
            return
        }
        counts[item] += 1
    })
    return counts
  }
  const ngroups = sacks.length/3
  const badges = Array(ngroups).fill(0).map((el, ix) => {
    const types = [
      Array.from((new Set(sacks[3*ix]))).join(''),
      Array.from((new Set(sacks[3*ix + 1]))).join(''),
      Array.from((new Set(sacks[3*ix + 2]))).join(''),
    ].join('')
    return Object.entries(count(types.split(''))).filter(([k, v]) => v === 3)[0][0]
  })
  console.log(
    "  Part 2: ",
    badges.map(priority).reduce((a, b) => a + b)
  )
}

export default day3
