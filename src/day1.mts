import * as fs from 'node:fs';

export const integerCompare = (a: number, b: number) => {
  return Math.sign(a - b);
}

const day1 = () => {
  console.log("Day 1")
  const content = fs.readFileSync("assets/2022-12-01.txt", {encoding: "utf-8"})
  const inventorys = (content
    .split("\n\n")
    .map(inventory => inventory.split("\n")
      .map(raw => parseInt(raw))
      .filter(el => !Number.isNaN(el))
    )
  )
  const encumberances = inventorys.map(
    inventory => inventory.reduce((a, b) => a + b)
  );
  console.log(
    "  Part 1: ",
    Math.max(...encumberances)
  )
  console.log(
    "  Part 2: ",
    encumberances.sort(integerCompare).reverse().slice(0, 3).reduce((a, b) => a + b)
  )
}

export default day1
