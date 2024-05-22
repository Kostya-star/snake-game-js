import { 
  SNAKE_SPEED,
  update as updateSnake, 
  draw as drawSnake, 
  getSnakeHead,
  snakeIntersection
} from './snake.js'

import {
  update as updateFood,
  draw as drawFood,
} from './food.js'

import { isOutsideGrid } from './grid.js';

const gameBoard = document.querySelector('#game-board')

let lastRenderTime = 0;
let isGameOver = false

function main(currentTime) {
  if (isGameOver) {
    if (confirm('You lost! Wanna play again')) {
      window.location = '/';
    } 
   
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  isGameOver = isOutsideGrid(getSnakeHead()) || snakeIntersection();
}