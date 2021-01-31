import { Player, draw as drawPlayer } from './player.js'

const game_el = document.getElementById('game')

let maxYvalue = game_el.clientHeight
let maxXvalue = game_el.clientWidth
window.maxXvalue = maxXvalue
window.maxYvalue = maxYvalue

export const FPS = 1000 / 60

export const pl = new Player(game_el)

function main() {
  pl.init()
  drawPlayer()
}

main()
