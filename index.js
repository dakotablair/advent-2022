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
  // Test cases
  // const program = [1,0,0,0,99]
  // const program = [1,1,1,4,99,5,6,0,99]
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

const directions = {
 D: [0, -1],
 L: [-1, 0],
 R: [1, 0],
 U: [0, 1],
}

const parseMove = (move) => {
  const magnitude = parseInt(move.substr(1))
  const direction = directions[move[0]]
  return [magnitude, direction]
}

const makeMove = (crumbs, head, move, steps) => {
  const [moveMag, moveDir] = move
  for(let i=0;i<moveMag;i++) {
    head = [head[0] + moveDir[0], head[1] + moveDir[1]]
    headKey = JSON.stringify(head)
    if(!(headKey in crumbs)) crumbs[headKey] = steps + i + 1
  }
  steps = steps + moveMag
  return [crumbs, head, steps]
}

const l1Norm = (point) => {
  const norm = Math.abs(point[0]) + Math.abs(point[1])
  return norm
}

const intersection = (objA, objB) => (
  Object.keys(objA).filter(key => key in objB)
)

const day3 = () => {
  const content = fs.readFileSync("assets/day3.txt", {encoding: "utf-8"})
  // Test cases
  // const content = "R10,U10,L10,D8\nL10,U2,R11\n"
  // const content = "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83\n"
  // const content = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7\n"
  const wires = content.split("\n").slice(0, 2)
  const paths = []
  wires.forEach(wire => {
    let crumbs = {}
    let head = [0, 0]
    let steps = 0
    const moves = wire.split(",")
    moves.forEach(move => {
      const parsedMove = parseMove(move)
      const [outX, outY, outZ] = makeMove(crumbs, head, parsedMove, steps)
      crumbs = outX
      head = outY
      steps = outZ
    })
    paths.push(crumbs)
  })
  const crossings = intersection(...paths)
  const distances = crossings.map(crumb => {
    const distance = l1Norm(JSON.parse(crumb))
    return distance
  })
  const cross = Math.min(...distances)
  console.log("Part 1:", cross)
  const steps = crossings.map(crumb => {
    const out = paths.map(path => {
      return path[crumb]
    }).reduce((a, b) => a + b)
    return out
  })
  console.log("Part 2:", Math.min(...steps))
}

const notMonotoneIncreasing = (pass) => (pass.split("")
  .map((letter, ix) => letter <= pass[ix+1])
  .slice(0, pass.length - 1)
  .includes(false)
)

const twoAdjacent = (pass) => (pass.split("")
  .map((letter, ix) => letter === pass[ix+1])
  .includes(true)
)

const passPass = (pass) => {
  thisPass = pass.toString()
  return twoAdjacent(thisPass) && !notMonotoneIncreasing(thisPass)
}

// Test cases
// 6778
// 111122
// 117888
const twoAdjacentExact = (pass) => {
  let streak = 1
  const streaks = []
  for(let i=0;i < pass.length;i++) {
    if(pass[i] !== pass[i+1]) {
      if(streak === 1) continue
      streaks.push(streak)
      streak = 1
      continue
    }
    streak += 1
  }
  return streaks.includes(2)
}

const passPassII = (pass) => {
  thisPass = pass.toString()
  const cond = twoAdjacentExact(thisPass) && !notMonotoneIncreasing(thisPass)
  return cond
}

const day4 = () => {
  let passing = 0
  for(let i=356261;i<=846303;i++) {
    if(passPass(i)) passing += 1
  }
  console.log("Part 1:", passing)
  let passingExact = 0
  for(let i=356261;i<=846303;i++) {
    if(passPassII(i)) passingExact += 1
  }
  console.log("Part 2:", passingExact)
}

const main = () => {
  day4()
}

if(require.main === module) {
  main()
}
