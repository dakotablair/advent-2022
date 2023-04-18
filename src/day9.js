const test = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`

distLInf = (pt1, pt2) => {
  const [x1, y1] = pt1
  const [x2, y2] = pt2
  return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))
}

const addPoints = (pt1, pt2) => {
  const [x1, y1] = pt1
  const [x2, y2] = pt2
  return [x1 + x2, y1 + y2]
}

const diffPoints = (pt1, pt2) => {
  const [x1, y1] = pt1
  const [x2, y2] = pt2
  return [x1 - x2, y1 - y2]
}

const negPoint = pt1 => {
  const [x1, y1] = pt1
  return [-x1, -y1]
}

const dirs = {
  'R': [0, 1],
  'L': [0, -1],
  'U': [-1, 0],
  'D': [1, 0],
}

const deltas = [
  [[-1, -1], [-1, -1], [-1, 0], [-1, 1], [-1, 1]],
  [[-1, -1], [ 0,  0], [ 0, 0], [ 0, 0], [-1, 1]],
  [[ 0, -1], [ 0,  0], [ 0, 0], [ 0, 0], [ 0, 1]],
  [[ 1, -1], [ 0,  0], [ 0, 0], [ 0, 0], [ 1, 1]],
  [[ 1, -1], [ 1, -1], [ 1, 0], [ 1, 1], [ 1, 1]],
]


const gridState = (grid) => Array(10).fill(0).map(
  (rel, rix) => Array(10).fill(0).map(
    (cel, cix) => grid.has(JSON.stringify([rix-5, cix-5])) ? "x" : " "
  ).join("")
).join("\n")

const movesToPly = (moves) => {
  let head = [0, 0]
  let tail = [0, 0]
  const headVisited = new Set([JSON.stringify(head)])
  const tailVisited = new Set([JSON.stringify(tail)])
  moves.map(move => {
    const [dir, dist] = move.split(" ")
    Array(+dist).fill(0).forEach(() => {
      head = addPoints(head, dirs[dir])
      const [dx, dy] = diffPoints(head, tail)
      tail = addPoints(tail, deltas[dx+2][dy+2])
      headVisited.add(JSON.stringify(head))
      tailVisited.add(JSON.stringify(tail))
    })
  })
  console.log({
    tailVisited
  })
}

const testmoves = test.split("\n").slice(0, -1)
movesToPly(testmoves)
const inputMoves = document.getElementsByTagName('pre')[0].innerHTML.split('\n').slice(0, -1)
movesToPly(inputMoves)
// 5778 too low
// 5779


let ropeMoves = (moves) => {
  const knots = Array(10).fill(0).map(() => [0, 0])
  const knotsVisited = Array(10).fill(0).map(() => 
    new Set([JSON.stringify([0, 0])])
  )
  moves.map(move => {
    const [dir, dist] = move.split(" ")
    Array(+dist).fill(0).forEach(() => {
      knots[0] = addPoints(knots[0], dirs[dir])
      knotsVisited[0].add(JSON.stringify(knots[0]))
      knots.forEach((knot, ix) => {
        if(ix === 0) return
        const [dx, dy] = diffPoints(knots[ix-1], knot)
        knots[ix] = addPoints(knot, deltas[dx+2][dy+2])
        knotsVisited[ix].add(JSON.stringify(knots[ix]))
      })
    })
  })
  console.log({
    tailVisited: knotsVisited[9]
  })
}

ropeMoves(testmoves)
test2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`
const testmoves2 = test2.split("\n").slice(0, -1)
ropeMoves(testmoves2)
ropeMoves(inputMoves)
// 2331