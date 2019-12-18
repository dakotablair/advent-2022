#!/usr/bin/env node

const fs = require("fs")

const day1 = () => {
  const content = fs.readFileSync("assets/day1.txt", {encoding: "utf-8"})
  const modules = (content
    .split("\n")
    .map(raw => parseInt(raw))
    .filter(el => !Number.isNaN(el))
  )
  console.log(
    "Part 1: ",
    modules.reduce((a, b) => a + Math.floor(b/3) - 2, 0)
  )
  const moduleFuelCost = (module) => {
    const fuelCost = Math.floor(module/3) - 2
    if(fuelCost <= 0) return 0
    return fuelCost + moduleFuelCost(fuelCost)
  }
  console.log(
    "Part 2: ",
    modules.map(moduleFuelCost).reduce((a, b) => a + b, 0)
  )
}

const compute = (program, noun=12, verb=2) => {
  program[1] = noun
  program[2] = verb
  //const program = [1,0,0,0,99]
  //const program = [1,1,1,4,99,5,6,0,99]
  const evaluate = {
    1: (codelist, a, b, c) => {
      codelist[c] = codelist[a] + codelist[b]
    },
    2: (codelist, a, b, c) => {
      codelist[c] = codelist[a] * codelist[b]
    },
    99: codelist => codelist
  }
  let out
  for(let head=0; head<program.length; head++) {
    if(!(program[head] in evaluate)) return console.log(
      "Input invalid:", program[1], program[2],
      "Encountered opcode:", program[head]
    )
    out = evaluate[program[head]](
      program, program[head+1], program[head+2], program[head+3]
    )
    if(out) break
    head += 3
  }
  return out[0]
}

const day2 = () => {
  const content = fs.readFileSync("assets/day2.txt", {encoding: "utf-8"})
  const opcodes = (content
    .split(",")
    .map(raw => parseInt(raw))
    .filter(el => !Number.isNaN(el))
  )
  console.log("Part 1:", compute([...opcodes]))
  console.log("Part 2: 89, 76", compute([...opcodes], 89, 76))
}

const main = () => {
  day2()
}

if(require.main === module) {
  main()
}
