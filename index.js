#!/usr/bin/env node

const day1 = require("./src/day1")
const day2 = require("./src/day2")
const day3 = require("./src/day3")

const main = () => {
  day1()
  day2()
  day3()
}

if(require.main === module) {
  main()
}
