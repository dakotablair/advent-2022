#!/usr/bin/env ts-node-esm

import * as fs from 'node:fs';
import { fileURLToPath as path } from 'url';
import day1 from "./src/day1.mjs"
import day2 from "./src/day2.mjs"
import day3 from "./src/day3.mjs"
import day4 from "./src/day4.mjs"
import day5 from "./src/day5.mjs"
import day6 from "./src/day6.mjs"

const main = () => {
  day1()
  day2()
  day3()
  day4()
  day5()
  day6()
}

if(process.argv[1] === path(import.meta.url)) {
  main()
}
