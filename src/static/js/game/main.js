class Game {
  constructor(user, building, res) {

    this.user = user
    this.building = building
    this.res = res
  }

  draw() {
    this.building.blocks.forEach(block => {
      if(block.filled === true) {
        let tx = block.tileIndex % 8
        let ty = Math.floor(block.tileIndex / 8)
        let w = tileset.get(tx*16, ty*16, 16, 16)
        image(w, block.x*this.res, block.y*this.res, this.res, this.res)
      }
    })
    this.user.draw()
  }

  
}