import { getInputDirection } from './input.js';

export const SNAKE_SPEED = 5;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;

export function update() {
  addSnakeParts()

  const inputDirection = getInputDirection();

  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
  snakeBody.forEach((snakePart) => {
    const snakeEl = document.createElement('div');
    snakeEl.style.gridColumnStart = snakePart.x;
    snakeEl.style.gridRowStart = snakePart.y;
    snakeEl.classList.add('snake');
    gameBoard.appendChild(snakeEl);
  });
}

export function expandSnake(rate) {
  newSegments += rate;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((snakePart, index) => {
    if(ignoreHead && index === 0) return false;

    return equalPositions(snakePart, position);
  });
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSnakeParts() {
  for(let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
  }

  newSegments = 0
}

export function getSnakeHead() {
  return snakeBody[0]
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true })
}