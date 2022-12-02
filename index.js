#!/usr/bin/env node

const day1 = require("./src/day1")
const day2 = require("./src/day2")

const main = () => {
  day1()
  day2()
}

if(require.main === module) {
  main()
}
