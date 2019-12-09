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

const main = () => {
  day1()
}

if(require.main === module) {
  main()
}
