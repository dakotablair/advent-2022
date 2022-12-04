#!/usr/bin/env ts-node-esm

import * as fs from 'node:fs';
import { fileURLToPath as path } from 'url';
import day1 from "./src/day1.mjs"
import day2 from "./src/day2.mjs"
import day3 from "./src/day3.mjs"

const main = () => {
  day1()
  day2()
  day3()
}

if(process.argv[1] === path(import.meta.url)) {
  main()
}
