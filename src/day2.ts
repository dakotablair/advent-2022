import * as fs from 'fs';

const day2 = () => {
  console.log("Day 2")
  const content = fs.readFileSync("assets/2022-12-02.txt", {encoding: "utf-8"})
  const scores: Record<string, number>  = {
    "A": 1, // rock
    "B": 2, // paper
    "C": 3, // scissors
    "X": 1, // rock
    "Y": 2, // paper
    "Z": 3, // scissors
  }
  const total = (content
    .split("\n")
    .map(game => {
      const [p1, p2] = game.split(" ")
      const outcome = (scores[p2] - scores[p1] + 3) % 3 // tie: 0, win: 1, loss: 2
      const bonus = [3, 6, 0][outcome] // tie: 3, win: 6, loss: 0
      return bonus + scores[p2]
    })
    .filter(el => el === +el)
    .reduce((a, b) => a + b)
  )
  console.log(
    "  Part 1: ",
    total
  )
  // outcomes desired
  const ods: Record<string, number> = {
    'X': 2, // loss
    'Y': 0, // tie
    'Z': 1, // win
  }
  const total2 = (content
    .split("\n")
    .map(game => {
      const [p1, od] = game.split(" ")
      // Solve for play (p2) based on outcome desired:
      // outcome = (p2+1) - (p1+1) mod 3
      // outcome + (p1+1) - 1 = p2 mod 3
      // outcome + (p1+1) + 2 = p2 mod 3 // avoids undesirable behavior of js % operator
      const play = (ods[od] + scores[p1] + 2) % 3 + 1 // rock: 1, paper: 2, scissors: 3
      const bonus = [3, 6, 0][ods[od]] // tie: 3, win: 6, loss: 0
      return bonus + play
    })
    .filter(el => el === +el)
    .reduce((a, b) => a + b)
  )
  console.log(
    "  Part 2: ",
    total2
  )
}

export default day2
