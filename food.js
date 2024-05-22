import { randomGridPosition } from './grid.js';
import { updateScore } from './score.js';
import { onSnake, expandSnake } from './snake.js'

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE);
    updateScore()
    food = getRandomFoodPosition();
  }
}

export function draw(gameBoard) {
  const foodEl = document.createElement('div');
  foodEl.style.gridColumnStart = food.x;
  foodEl.style.gridRowStart = food.y;
  foodEl.classList.add('food');
  gameBoard.appendChild(foodEl);
}

function getRandomFoodPosition() {
  let newFoodPosition

  while(!newFoodPosition || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }

  return newFoodPosition
}