import { pl, FPS } from './app.js'

const KeyInput = {
  TOP: 'w',
  RIGHT: 'd',
  BOTTOM: 's',
  LEFT: 'a',
}

const SIDES = {
  top: 'TOP',
  right: 'RIGHT',
  bottom: 'BOTTOM',
  left: 'LEFT',
}

function getMoveValue(n, pos) {
  console.log(n)

  if (n < 0) return 0
  if (pos === 'x' && n >= maxXvalue) return maxXvalue - 77
  if (pos === 'y' && n >= maxYvalue) return maxYvalue - 77

  return n
} // function doesn't work

export function draw() {
  setInterval(() => {
    if (pl.player.isMoving) {
      switch (pl.player.side) {
        case SIDES.top: {
          const value = getMoveValue(pl.player.y - pl.player.step, 'y')
          pl.player.y = value
          pl.player.el.style.top = `${pl.player.y}px`
          break
        }
        case SIDES.bottom: {
          const value = getMoveValue(pl.player.y + pl.player.step, 'y')
          pl.player.y = value
          pl.player.el.style.top = `${pl.player.y}px`
          break
        }
        case SIDES.right: {
          const value = getMoveValue(pl.player.x + pl.player.step, 'x')
          pl.player.x = value
          pl.player.el.style.left = `${pl.player.x}px`
          break
        }
        case SIDES.left: {
          const value = getMoveValue(pl.player.x - pl.player.step, 'x')
          pl.player.x = value
          pl.player.el.style.left = `${pl.player.x}px`
          break
        }
      }
    }
  }, FPS)
}

export class Player {
  constructor(game_el) {
    this.player = {
      x: 100,
      y: 100,
      el: null,
      side: 'TOP',
      step: 10,
      isMoving: false,
      sprites: {
        top: 'src/sprites/player-top.png',
        right: 'src/sprites/player-right.png',
        bottom: 'src/sprites/player-bottom.png',
        left: 'src/sprites/player-left.png',
      },
    }
    this.game_el = game_el
  }
  move(side) {
    this.player.isMoving = true
    switch (side) {
      case KeyInput.TOP: {
        this.player.el.style.backgroundImage = `url(${this.player.sprites.top})`
        this.player.side = SIDES.top
        break
      }

      case KeyInput.RIGHT: {
        this.player.el.style.backgroundImage = `url(${this.player.sprites.right})`
        this.player.side = SIDES.right
        break
      }

      case KeyInput.BOTTOM: {
        this.player.el.style.backgroundImage = `url(${this.player.sprites.bottom})`
        this.player.side = SIDES.bottom
        break
      }

      case KeyInput.LEFT: {
        this.player.el.style.backgroundImage = `url(${this.player.sprites.left})`
        this.player.side = SIDES.left
        break
      }
    }
  }

  stopMoving() {
    this.player.isMoving = false
  }

  init() {
    this.game_el.innerHTML = `<div style='left: ${this.player.x}px; top: ${this.player.y}px;' id='player'></div>`
    this.player.el = document.getElementById('player')
  }
}

window.addEventListener('keydown', (e) => {
  if (['w', 'd', 's', 'a'].includes(e.key.toLowerCase())) pl.move(e.key)
  return
})

window.addEventListener('keyup', (e) => {
  if (['w', 'd', 's', 'a'].includes(e.key.toLowerCase())) pl.stopMoving()
})
