import * as fs from 'node:fs';

const intervalContains = (interval1: string, interval2: string) => {
  const [a1, b1] = interval1.split("-").map(endpoint => +endpoint)
  const [a2, b2] = interval2.split("-").map(endpoint => +endpoint)
  return a1 <= a2 && b2 <= b1
}

const intervalOverlaps = (interval1: string, interval2: string) => {
  const [a1, b1] = interval1.split("-").map(endpoint => +endpoint)
  const [a2, b2] = interval2.split("-").map(endpoint => +endpoint)
  return (
    (a2 <= a1 && a1 <= b2) ||
    (a1 <= a2 && a2 <= b1)
  )
}

const day4 = () => {
  console.log("Day 4")
  const content = fs.readFileSync("assets/2022-12-04.txt", {encoding: "utf-8"})
  const pairs = content.split("\n").slice(0, -1)
  const containments = pairs.filter(pair => {
    const [assign1, assign2] = pair.split(",")
    return (
      intervalContains(assign1, assign2) ||
      intervalContains(assign2, assign1)
    )
  })
  console.log(
    "  Part 1: ",
    containments.length
  )
  const overlaps = pairs.filter(pair => {
    const [assign1, assign2] = pair.split(",")
    return intervalOverlaps(assign1, assign2)
  })
  console.log(
    "  Part 2: ",
    overlaps.length
  )
}

export default day4
