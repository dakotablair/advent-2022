const integerCompare = (a, b) => {
    return Math.sign(a - b);
}

const ops = {
    "+": (a, b) => a + b,
    "*": (a, b) => a * b,
}
const parseFormula = (formula) => (old) => {
    const [t1, op, t2] = formula.split(" ")
    const parseTerm = (term) => (old) => (term === "old" ? old : +term)
    const t1p = parseTerm(t1)
    const t2p = parseTerm(t2)
    return ops[op](t1p(old), t2p(old)) 
}

const itemsPrefix = "  Starting items: "
const operationPrefix = "  Operation: new = "
const testPrefix = "  Test: divisible by "

const parseMonkey = (monkey) => {
    const [
        name,
        items,
        operation,
        test,
        actionPass,
        actionFail,
    ] = monkey
    return {
        actionFail: actionFail.slice(-1),
        actionPass: actionPass.slice(-1),
        inspections: 0,
        items: items.slice(itemsPrefix.length).split(", ").map(el => +el),
        modulus: +test.slice(testPrefix.length),
        name,
        operation: parseFormula(operation.slice(operationPrefix.length)),
    }
}

const observe = (monkeys, nrounds, part) => {
    const monkeyModulus = monkeys.map(monkey => monkey.modulus).reduce((a, b) => a*b, 1)
    Array(nrounds).fill(0).forEach(() => {
        monkeys.forEach(monkey => {
            // monkey business
            const { actionFail, actionPass, inspections, items, modulus, operation } = monkey
            while(items.length > 0) {
                const item = items.shift()
                worry = part === 1 ? Math.floor(operation(item)/3) : operation(item) % monkeyModulus
                monkey.inspections += 1
                worry % modulus === 0
                    ? monkeys[actionPass].items.push(worry)
                    : monkeys[actionFail].items.push(worry)
            }
        })
    })
}

const testNotes = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`.split('\n').slice(0, -1)

const monkeysTest = Array(4).fill(0).map((el, ix) => parseMonkey(testNotes.slice(7*ix, 7*(ix+1))))
console.log(monkeysTest.map(monkey => monkey.items).join("\n"))
observe(monkeysTest, 20, 1)
console.log(monkeysTest.map(monkey => monkey.items).join("\n"))
console.log(monkeysTest.map(monkey => [monkey.name, monkey.inspections]).join("\n"))
console.log(monkeysTest.map(monkey => monkey.inspections).sort(integerCompare).slice(-2).reduce((a, b) => a*b, 1))

const monkeysTest2 = Array(4).fill(0).map((el, ix) => parseMonkey(testNotes.slice(7*ix, 7*(ix+1))))
console.log(monkeysTest2.map(monkey => monkey.items).join("\n"))
observe(monkeysTest2, 10000, 2)
console.log(monkeysTest2.map(monkey => monkey.items).join("\n"))
console.log(monkeysTest2.map(monkey => [monkey.name, monkey.inspections]).join("\n"))
console.log(monkeysTest2.map(monkey => monkey.inspections).sort(integerCompare).slice(-2).reduce((a, b) => a*b, 1))
//

const notes = document.getElementsByTagName('pre')[0].innerHTML.split('\n').slice(0, -1)

monkeysInput = Array(8).fill(0).map((el, ix) => parseMonkey(notes.slice(7*ix, 7*(ix+1))))
console.log(monkeysInput.map(monkey => monkey.items).join("\n"))
observe(monkeysInput, 20, 1)
console.log(monkeysInput.map(monkey => [monkey.name, monkey.items]).join("\n"))
console.log(monkeysInput.map(monkey => [monkey.name, monkey.inspections]).join("\n"))
console.log(monkeysInput.map(monkey => monkey.inspections).sort(integerCompare).slice(-2).reduce((a, b) => a*b, 1))
// 69918
// 67685919938910 too high

monkeysInput2 = Array(8).fill(0).map((el, ix) => parseMonkey(notes.slice(7*ix, 7*(ix+1))))
observe(monkeysInput2, 10000, 2)
console.log(monkeysInput2.map(monkey => [monkey.name, monkey.items]).join("\n"))
console.log(monkeysInput2.map(monkey => [monkey.name, monkey.inspections]).join("\n"))
console.log(monkeysInput2.map(monkey => monkey.inspections).sort(integerCompare).slice(-2).reduce((a, b) => a*b, 1))
// 14472571140 too low
// 19573408701