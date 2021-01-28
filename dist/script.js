import { SNAKE_SPEED, update as update_snake, draw as draw_snake, get_snake_head, snake_intersection, score } from './snake.js';
import { update as update_food, draw as draw_food } from './food.js';
import { outside_grid } from './grid.js';
const gameBoard = document.getElementById('game');
let isGameOver = false;
let last_render_time = 0;
function main(currentTime) {
    if (isGameOver) {
        window.document.title = 'You lose!';
        alert(`You lose!\nScore: ${score}`);
        window.location.reload();
        return;
    }
    window.requestAnimationFrame(main);
    const seconds_since_last_render = (currentTime - last_render_time) / 1000;
    if (seconds_since_last_render < 1 / SNAKE_SPEED)
        return;
    last_render_time = currentTime;
    update();
    draw();
}
window.requestAnimationFrame(main);
function update() {
    update_snake();
    update_food();
    checkLose();
}
function draw() {
    gameBoard.innerHTML = '';
    draw_snake(gameBoard);
    draw_food(gameBoard);
    window.document.title = 'Score ' + score;
}
function checkLose() {
    isGameOver = outside_grid(get_snake_head()) || snake_intersection();
}
