const instructions = document.getElementsByTagName('pre')[0].innerHTML.split('\n').slice(0, -1)
instructions.length // 144

const process = {
    "noop" : () => [ register ],
    "addx" : (param) => {
        previous = register
        register += param
        return [previous, register]
    }
}

let register = 1
results = [[register, register]].concat(instructions.map(instruction => {
  code = instruction.split(" ")
  param = code.length === 2 ? +code[1] : []
  return process[code[0]](param)
}))

cumulative = results.flatMap(el => el)

part1 = [
    20*cumulative[20],
    60*cumulative[60],
    100*cumulative[100],
    140*cumulative[140],
    180*cumulative[180],
    220*cumulative[220]
].reduce((a, b) => a + b)

console.log({part1})
// 120 too low
// 14360 wrong for me but right for someone else
// 15680

crt = cumulative.slice(1).flatMap(el => el).map((el, ix) => (Math.abs(el - (ix%40)) < 2) ? "#" : ".").join('')
crtOut = [
    crt.slice(0, 40),
    crt.slice(40, 80),
    crt.slice(80, 120),
    crt.slice(120, 160),
    crt.slice(160, 200),
    crt.slice(200, 240),
].join("\n")

console.log(crtOut)
// 0123456789012345678901234567890123456789
// ####.####.###..####.#..#..##..#..#.###..
// ...#.#....#..#.#....#..#.#..#.#..#.#..#.
// ..#..###..###..###..####.#....#..#.#..#.
// .#...#....#..#.#....#..#.#.##.#..#.###..
// #....#....#..#.#....#..#.#..#.#..#.#....
// ####.#....###..#....#..#..###..##..#....