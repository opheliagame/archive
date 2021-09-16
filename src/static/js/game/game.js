let res = 16+8, rows, cols
let user, game, sprite, sprites
let urlPrefix = '/static'
let buildingJson

function preload() {
  buildingJson = loadJSON(urlPrefix + '/assets/building-small.json')
  tileset = loadImage(urlPrefix + '/assets/tilation-indoor.png')
  sprites = [
    loadImage(urlPrefix + '/assets/character_animation.png'),
    loadImage(urlPrefix + '/assets/hair_braids_brown.png'),
    loadImage(urlPrefix + '/assets/pants_black.png'),
    loadImage(urlPrefix + '/assets/shirt_basic_red.png'),
    loadImage(urlPrefix + '/assets/shoes_brown.png'),
  ]
  
}

function setup() {
  rows = buildingJson.rows
  cols = buildingJson.cols
  let canvas = createCanvas(res*cols, res*rows)
  canvas.parent('canvasDiv')

  let g = createGraphics(32*8, 32*2)
  sprites.forEach(s => g.image(s, 0, 0))
  sprite = g.get()

  user = new User(sprite, buildingJson, res)
  game = new Game(user, buildingJson, res)
}

function draw() {
  background(255)
  game.draw()
}

function keyPressed() {
  switch(keyCode) {
    case LEFT_ARROW:
      user.move('left')
      break
    case RIGHT_ARROW: 
      user.move('right')
      break
    case UP_ARROW:
      user.move('up')
      break
    case DOWN_ARROW:
      user.move('down')
      break
    default:
      return
  }
}

