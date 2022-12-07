import * as fs from 'node:fs';

const day6 = () => {
  console.log("Day 6")
  const content = fs.readFileSync("assets/2022-12-06.txt", {encoding: "utf-8"})
  const packet_marker = content.split("").map((chr, ix) => {
    if(ix < 3) return false
    return (new Set(content.slice(ix - 4, ix))).size === 4
  }).indexOf(true)
  console.log(
    "  Part 1: ",
    packet_marker
  )
  const message_marker = content.split("").map((chr, ix) => {
    if(ix < 13) return false
    return (new Set(content.slice(ix - 14, ix))).size === 14
  }).indexOf(true)
  console.log(
    "  Part 2: ",
    message_marker
  )
}

export default day6
