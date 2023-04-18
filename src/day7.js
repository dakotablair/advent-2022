const sizes = {}

class Node {
  constructor({ name, parent, childs }) {
    this.childs = childs
    this.name = name
    this.parent = parent
  }

  addChild(name, value) {
    this.childs[name] = value
  }

  find() {
    console.log({name: this.name})
    Object.keys(this.childs).forEach(childName => {
      const child = this.childs[childName]
      if(!(child instanceof Node)) return console.log({[childName]: child})
      sizes[childName] = child.size()
      child.find()
    })
  }

  size() {
    if (this.childs.length === 0) {
      return 0
    }
    return Object.values(this.childs).map(child => {
      if(child instanceof Node) return child.size()
      return +child
    }).reduce((a, b) => a + b, 0)
  }
}

class Agent {

  constructor({ node }) {
    this.node = node
    if(node.name === '/') {
      this.root = node
    }
  }

  cd(path) {
    if(path === '/') {
      this.node = this.root
      return
    }
    if(path === '..') {
      this.node = this.node.parent
      return
    }
    this.node = this.node.childs[path]
  }

  ls() {
    Object.keys(this.node.childs).map(childName => {
      const child = this.node.childs[childName]
      if(!(child instanceof Node)) return console.log(`${child} ${childName}`)
      console.log(`dir ${childName}`)
    })
  }

  recover(outlines) {
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
      this.node.addChild(name, size)
    })
  }
}

outlines = `$ cd /
$ ls
dir brdsppd
dir dnjqmzgg
126880 fmftdzrp.fwt
173625 hhfqgzfj.qvt
dir lbbcfjl
dir mzdqcb
dir npppw
dir plmb
6337 rfgtcj.tdn
dir szfw
230140 vmc.cdf
$ cd brdsppd
$ ls
dir gjc
dir lcz
218543 ndqmcv
dir qnj
dir rrdd
dir zppsglq
`.split("\n").slice(1, -1)

root = new Node({
  childs:{},
  name:'/',
  parent: null,
})

a = new Agent({node: root})

a.recover(outlines)

a.cd('/')

a.node.find()