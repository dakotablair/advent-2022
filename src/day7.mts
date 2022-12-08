import * as fs from 'node:fs';
import { integerCompare } from "./day1.mjs"

export interface NodeInterface {
  childs: Record<string, Node | number>
  name: string
  parent: Node | null
}

const sizes: Record<string, number> = {}
const smallnodes: Record<string, number> = {}

class Node {
  childs: Record<string, Node | number>
  name: string
  parent: Node | null
  path: string
  constructor({ name, parent, childs }: NodeInterface) {
    this.childs = childs
    this.name = name
    this.parent = parent
    this.path = this.parent ? `${this.parent.path}/${name}` : ''
  }

  addChild(name: string, value: Node | number) {
    this.childs[name] = value
  }

  find() {
    Object.keys(this.childs).forEach(childName => {
      const child = this.childs[childName]
      if(!(child instanceof Node)) return {[childName]: child}
      sizes[child.path] = child.size()
      child.find()
    })
  }

  size(): number {
    if (this.childs.length === 0) {
      return 0
    }
    return (
      Object.entries(this.childs)
        .map(([childName, child]) => {
          if(child instanceof Node) return child.size()
          if(+child <= 100000) smallnodes[childName] = +child
          return +child
        }).reduce((a, b) => a + b, 0)
    )
  }
}

class Agent {
  node: Node
  root: Node | null = null

  constructor({ node }: { node: Node }) {
    this.node = node
    if(node.name === '/') {
      this.root = node
    }
  }

  cd(path: string) {
    if(path === '/' && this.root) {
      this.node = this.root
      return
    }
    if(path === '..' && this.node.parent) {
      this.node = this.node.parent
      return
    }
    const target = this.node.childs[path]
    if(!(target instanceof Node)) return
    this.node = target
  }

  ls() {
    Object.keys(this.node.childs).map(childName => {
      const child = this.node.childs[childName]
      if(!(child instanceof Node)) return console.log(`${child} ${childName}`)
      console.log(`dir ${childName}`)
    })
  }

  recover(outlines: string[]) {
    outlines.forEach(outline => {
      if (outline === '$ ls') return
      if (outline.startsWith('$ cd')) {
        this.cd(outline.slice(5))
        return
      }
      if (outline.startsWith('dir')) {
        const childName = outline.slice(4)
        const child = new Node({
          childs: {},
          name: childName,
          parent: this.node,
        })
        this.node.addChild(childName, child)
        return
      }
      const [size, name] = outline.split(" ")
      this.node.addChild(name, +size)
    })
  }
}

const day7 = () => {
  console.log("Day 7")
  const content = fs.readFileSync("assets/2022-12-07.txt", {encoding: "utf-8"})
  const lines = content.split("\n").slice(0, -1)
  const root = new Node({
    childs: {},
    name: "/",
    parent: null,
  })
  const agent = new Agent({node: root})
  agent.recover(lines)
  agent.cd('/')
  if(!agent.root) return
  agent.root.find()

  console.log(
    "  Part 1: ",
    (
      Object
        .values(sizes)
        .filter(size => size <= 100000)
        .reduce((a, b) => a + b, 0)
    )
  )
  const max_storage = 40000000
  const target = agent.root.size() - max_storage
  const sizesSorted = Object.values(sizes).sort(integerCompare)
  // find the index of the greatest lower bound of target in values (sorted)
  const priceIsRight = (values: number[], target: number): number => {
    if(values.length === 1) return 0
    const half = Math.floor(values.length/2)
    const [offset, next] = values[half] < target
      ? [half, values.slice(half)]
      : [0, values.slice(0, half)]
    return offset + priceIsRight(next, target)
  }
  const sizeSolution = priceIsRight(sizesSorted, target)
  const threshold = sizesSorted[ sizeSolution + 1 ]
  console.log(
    "  Part 2: ",
    threshold
  )
}

export default day7
