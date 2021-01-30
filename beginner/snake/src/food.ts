import { on_snake, expand_snake } from './snake.js'
import { random_grid_pos } from './grid.js'

let food = get_random_food_pos()
const EXPANDS_BY = 1 // how much cells will be added when snake eats food

export function update() {
  if (on_snake(food)) {
    expand_snake(EXPANDS_BY)
    food = get_random_food_pos()
  }
}

export function draw(gameBoard: HTMLElement) {
  // const arrDOM = [...gameBoard.children]

  const food_el = document.createElement('div')
  food_el.style.gridRowStart = food.y.toString()
  food_el.style.gridColumnStart = food.x.toString()
  food_el.classList.add('food')

  gameBoard.appendChild(food_el)
}

function get_random_food_pos() {
  let new_food_pos: {x: number, y: number}


  do {
      new_food_pos = random_grid_pos()
  }
  while (new_food_pos === null || on_snake(new_food_pos))

  return new_food_pos
}
