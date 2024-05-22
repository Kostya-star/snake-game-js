const score = document.querySelector('#score')

export function updateScore() {
  score.innerText = `Score: ${parseInt(score.innerText.split(':')[1]) + 1}`
}