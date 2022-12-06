import * as fs from 'node:fs';

const day5 = () => {
  console.log("Day 5")
  const content = fs.readFileSync("assets/2022-12-05.txt", {encoding: "utf-8"})
  const lines = content.split("\n").slice(0, -1)
  const stackLines= lines.slice(0, 8)
  const stacks: Record<number, string[]> = {}
  stackLines.forEach((line, lineno) => {
    Array(10).fill(0).forEach((el, col) => {
      const stackno = col + 1
      const crate = line[4*col + 1]
      if (!crate || crate === ' ') return
      if (!stacks.hasOwnProperty(stackno)) stacks[stackno] = []
      stacks[stackno].push(crate)
    })
  })
  const moves = lines.slice(10)
  const noMatch = {qty: 0, stackFrom: 0, stackTo: 0}
  // Deep copy by value, not by reference.
  const stacks9000 = JSON.parse(JSON.stringify(stacks))
  moves.forEach(move => {
    const match = Array.from(move.matchAll(/^move (\d+) from (\d+) to (\d+)$/g))
    const {qty, stackFrom, stackTo} = Array.from(move.matchAll(
      /^move (?<qty>\d+) from (?<stackFrom>\d+) to (?<stackTo>\d+)$/g
    ))[0]['groups'] || noMatch
    const stackFromIx = +stackFrom
    const stackToIx = +stackTo
    const nqty = +qty
    // CrateMover 9000
    Array(nqty).fill(0).forEach(() => {
      const cratePicked = stacks9000[stackFromIx].shift() || ''
      stacks9000[stackToIx].unshift(cratePicked)
    })
    // CrateMover 9001
    stacks[stackToIx] = (
      stacks[stackFromIx].slice(0, nqty).concat(stacks[stackToIx])
    )
    stacks[stackFromIx] = stacks[stackFromIx].slice(nqty)
  })
  const tops9000: string = Array(10).fill(0).map((el, ix) => {
    if(!ix) return ''
    return stacks9000[ix][0]
  }).join('')
  console.log(
    "  Part 1: ",
    tops9000
  )
  const tops: string = Array(10).fill(0).map((el, ix) => {
    if(!ix) return ''
    return stacks[ix][0]
  }).join('')
  console.log(
    "  Part 2: ",
    tops
  )
}

export default day5
