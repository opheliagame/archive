class CSSGrid {
  constructor(qtree, width, height) {
    this.qtree = qtree
    this.width = width
    this.height = height

    this.rows = this.findRows()
    this.cols = this.findCols()

    this.template = new Array(this.cols).fill(0).map(a => new Array(this.rows).fill(0))
  }

  findRows() {
    let rowHeight = this.qtree.getSmallestQuad().boundary.h*2
    this.cellh = rowHeight/2
    return this.height/rowHeight
  }

  findCols() {
    let colWidth = this.qtree.getSmallestQuad().boundary.w*2
    this.cellw = colWidth/2
    return this.width/colWidth
  }

  buildCSSTemplate() {
    let leafNodes = this.qtree.getLeafNodes()
    this.nCells = leafNodes.length

    // let template = {}
    let chars = "abcdefghijklmnopqrstuvwxyz"
    // leafNodes.forEach((e, i) => {
    //   let letter = chars[i]
    //   template[letter] = Math.pow(e.boundary.w/this.cellw, 2)
    // });


    leafNodes.forEach((c, i) => {
      c.getCSSTemplate(this, chars[i])
    })

  }

  getGridAreaString() {
    this.buildCSSTemplate()
    return this.template.map(l => `'${l.join(' ')}'`).join(' ')
  }

}

export default CSSGrid