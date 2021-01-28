import { get_input_direction } from './input.js'

export const SNAKE_SPEED = 10 // times per second.
const snake_pos = [{ x: 11, y: 11 }]
export let score = snake_pos.length
let new_pos = 0

export function update() {
  add_pos()
  const input_dir = get_input_direction()

  for (let i = snake_pos.length - 2; i >= 0; i--) {
    snake_pos[i + 1] = { ...snake_pos[i] }
  }

  snake_pos[0].x += input_dir.x
  snake_pos[0].y += input_dir.y

  score = snake_pos.length
}

export function draw(gameBoard: HTMLElement) {
  snake_pos.forEach((pos, i) => {
    const snake_el = document.createElement('div')
    snake_el.style.gridRowStart = pos.y.toString()
    snake_el.style.gridColumnStart = pos.x.toString()
    if (i === 0) {
      snake_el.classList.add('snake-head')
    } else {
      snake_el.classList.add('snake')
    }

    gameBoard.appendChild(snake_el)
  })
}

export function expand_snake(amount: number) {
  new_pos += amount
}

export function on_snake(outer_pos: {x: number, y: number}, ignoreHead: boolean = false) {
  return snake_pos.some((pos, i) => {
    if (ignoreHead && i === 0) return false
    return pos.x === outer_pos.x && pos.y === outer_pos.y
  })
}

function add_pos() {
  for (let i = 0; i < new_pos; i++) {
    snake_pos.push({ ...snake_pos[snake_pos.length - 1] })
  }

  new_pos = 0
}

export function get_snake_head() {
  return snake_pos[0]
} 

export function snake_intersection() {

  const snake_head = get_snake_head()

  return on_snake(snake_head, true)
}