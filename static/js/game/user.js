class User {
  constructor(sprite, bJson, res) {
    this.sprite = sprite
    this.spritePos = 0
    this.x = 0
    this.y = 6
    this.bJson = bJson
    this.res = res
    this.grid = bJson.blocks
  }

  draw() {
    let yStart = this.spritePos < 4 ? 0 : 32
    let xStart = yStart === 0 ? 
                (this.spritePos%4) * 32 :
                ((7-this.spritePos)%4) * 32 
    let currSprite = this.sprite.get(xStart, yStart, 32, 32)
  
    push()
    translate(this.x*this.res, this.y*this.res)
    // fill(255)
    // rect(0, 0, this.res, this.res)
    image(currSprite, -this.res*0.4, -this.res*0.4, this.res*1.4, this.res*1.4)
    pop()
  }

  move(dir) {
    let currIndex = this.y*this.bJson.cols + this.x
    let block 
    switch(dir) {
      case 'left':
        block = (currIndex-1) >= 0 ? this.grid[currIndex-1] : undefined
        if(block !== undefined && 
          (block.filled === false || block.type !== 'wall') && 
          (currIndex)%this.bJson.rows !== 0) 
          this.x -= 1
        this.spritePos = (((this.spritePos+1) % 4) + 4) % 8
        break
      case 'right':
        block = (currIndex+1) < this.grid.length ? this.grid[currIndex+1] : undefined
        if(block !== undefined &&
          (block.filled === false || block.type !== 'wall') && 
          (currIndex)%this.bJson.rows !== this.bJson.rows-1) this.x += 1
        this.spritePos = (this.spritePos+1) % 4
        break
      case 'up':
        block = (currIndex-this.bJson.cols) >= 0 ? this.grid[currIndex-this.bJson.cols] : undefined
        if(block !== undefined && 
          (block.filled === false || block.type !== 'wall')) this.y -= 1
        this.spritePos = (((this.spritePos+1) % 4) + 4) % 8
        break
      case 'down':
        block = (currIndex+this.bJson.cols) < this.grid.length ? this.grid[currIndex+this.bJson.cols] : undefined
        if(block !== undefined && 
          (block.filled === false || block.type !== 'wall')) this.y += 1
        this.spritePos = (this.spritePos+1) % 4
        break
    }
  }
}