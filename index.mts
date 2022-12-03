#!/usr/bin/env node

import { fileURLToPath } from 'url';
import process from 'process';

// const day1 = require("./src/day1")
// const day2 = require("./src/day2")

import day1 from "./src/day1.js"
import day2 from "./src/day2.js"

const main = () => {
  day1()
  day2()
}

// if(require.main === module) {
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}

// export default main
