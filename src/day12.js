const dirs = {
  'R': [0, 1],
  'U': [-1, 0],
  'L': [0, -1],
  'D': [1, 0],
}

const addPoints = (pt1, pt2) => {
  const [x1, y1] = pt1
  const [x2, y2] = pt2
  return [x1 + x2, y1 + y2]
}

const day12pt1 = (htmap, srow, scol) => {
  const nrows = htmap.length
  const ncols = htmap[0].length
  const oob = (rix, cix) => {
    return nrows - 1 < rix || rix < 0 || ncols - 1 < cix || cix < 0
  }

  seen = new Set()
  const getNextPaths = (path) => {
    const last = path.length > 0 ? path.slice(-1)[0] : [0, 0]
    const [rix, cix] = last
    const levelLast = htmap[rix][cix]
    const levelLastCode = levelLast === 'S' ? 97 : levelLast.charCodeAt(0)
    return Object.values(dirs).map(dir => {
      const next = addPoints(last, dir)
      if(oob(...next)) return null
      const nextKey = JSON.stringify(next)
      const [nrix, ncix] = next
      window.next = next
      const levelNext = htmap[nrix][ncix]
      const levelNextCode = levelNext === 'E' ? 122 : levelNext.charCodeAt(0)
      const excludeTest = (
        seen.has(nextKey) ||
        levelLastCode + 1 < levelNextCode ||
        JSON.stringify(path).indexOf(nextKey) > -1
      )
      if(excludeTest) {
        return null
      }
      seen.add(nextKey)
      return [...path, next]
    }).filter(path => path)
  }

  const pathIsDone = (path) => {
    const [rix, cix] = path.slice(-1)[0]
    return htmap[rix][cix] === 'E'
  }

  steps = 0
  const shortestPath = (rix, cix) => {
    queue = [[[rix, cix]]]
    while(queue.length > 0 && steps < 1e5) {
      steps += 1
      const path = queue.shift()
      // evaluate
      if(pathIsDone(path)) return path
      // seek
      nextPaths = getNextPaths(path)
      queue.push(...nextPaths)
    }
  }

  const pathShortest = shortestPath(srow, scol)
  console.log({nsteps: pathShortest.length - 1})

  const board = htmap.map(row => row.split(''))
  Array(nrows).fill(0).map((row, rix) => Array(ncols).fill(0).map((col, cix) => {
      const visited = new Set(pathShortest.map(pt => JSON.stringify(pt)))
      board[rix][cix] = visited.has(JSON.stringify([rix, cix])) ? htmap[rix][cix] : "#"
  }))
  console.log(board.map(row => row.join("")).join("\n"))
  return pathShortest
}

const heightmap = document.getElementsByTagName('pre')[0].innerHTML.split('\n').slice(0, -1)
console.log({
  rows: heightmap.length, // 41
  cols: heightmap[0].length, // 179
})

// 483 too low
const foundPath = day12pt1(heightmap, 20, 0) // 484

const sample = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`.split('\n').slice(0, -1)
const samplePath = day12pt1(sample, 0, 0) // 29
/*

const replacer = (key, value) => {
  if(Array.isArray(value) && value.length === 2) {
      return `[${value[0]},${value[1]}]`
  }
  return value
}

console.log(`Step ${steps}: ${JSON.stringify(queue, replacer, 4)}`)
*/

// start at E, go to a, the first one that is found will be the nearest one
const day12pt2 = (htmap, srow, scol) => {
  const nrows = htmap.length
  const ncols = htmap[0].length
  const oob = (rix, cix) => {
    return nrows - 1 < rix || rix < 0 || ncols - 1 < cix || cix < 0
  }

  seen = new Set()
  const getNextPaths = (path) => {
    const last = path.length > 0 ? path.slice(-1)[0] : [0, 0]
    const [rix, cix] = last
    const levelLast = htmap[rix][cix]
    const levelLastCode = levelLast === 'E' ? 122 : levelLast.charCodeAt(0)
    return Object.values(dirs).map(dir => {
      const next = addPoints(last, dir)
      if(oob(...next)) return null
      const nextKey = JSON.stringify(next)
      const [nrix, ncix] = next
      window.next = next
      const levelNext = htmap[nrix][ncix]
      const levelNextCode = levelNext === 'S' ? 97 : levelNext.charCodeAt(0)
      const excludeTest = (
        seen.has(nextKey) ||
        levelLastCode > levelNextCode + 1 ||
        JSON.stringify(path).indexOf(nextKey) > -1
      )
      if(excludeTest) {
        return null
      }
      seen.add(nextKey)
      return [...path, next]
    }).filter(path => path)
  }

  const pathIsDone = (path) => {
    const [rix, cix] = path.slice(-1)[0]
    const doneTest = htmap[rix][cix] === 'a' || htmap[rix][cix] === 'S'
    return doneTest
  }

  steps = 0
  const shortestPath = (rix, cix) => {
    queue = [[[rix, cix]]]
    while(queue.length > 0 && steps < 1e5) {
      steps += 1
      const path = queue.shift()
      // evaluate
      if(pathIsDone(path)) return path
      // seek
      nextPaths = getNextPaths(path)
      queue.push(...nextPaths)
    }
  }

  const pathShortest = shortestPath(srow, scol)
  console.log({nsteps: pathShortest.length - 1})

  const board = htmap.map(row => row.split(''))
  Array(nrows).fill(0).map((row, rix) => Array(ncols).fill(0).map((col, cix) => {
      const visited = new Set(pathShortest.map(pt => JSON.stringify(pt)))
      board[rix][cix] = visited.has(JSON.stringify([rix, cix])) ? htmap[rix][cix] : "#"
  }))
  console.log(board.map(row => row.join("")).join("\n"))
  return pathShortest
}

const sampleScenic = day12pt2(sample, 2, 5)
const foundScenic = day12pt2(heightmap, 20, 154)