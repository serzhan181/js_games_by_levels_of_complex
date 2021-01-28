const GRID_SIZE = 21

export function random_grid_pos(): {x: number, y: number} {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  }
}

export function outside_grid(pos: {x: number, y: number}) {
  return (
    pos.x < 1 || pos.x > GRID_SIZE ||
    pos.y < 1 || pos.y > GRID_SIZE
  )
}