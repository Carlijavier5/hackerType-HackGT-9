const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const userTyped = new Event("waitType")
const stopCount = new Event("stopCounting")

renderNewQuote()

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')
  document.getElementById("timer").style.color='#FFFFFF';
  if (!started) {
    document.dispatchEvent(userTyped)
  }
  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]

    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
      
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
    }
  })

  if (correct) { 
    renderNewQuote()
    document.dispatchEvent(stopCount)
  } 
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  timerElement.innerText = 0
  document.getElementById("timer").style.color="#222222";
  document.dispatchEvent(stopCount)
  started = false
  startTimer()
  const quote = await getRandomQuote() 
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => { // for looping through each character 
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
}


let startTime
function startTimer() {
timerElement.innerText = 0
started = false
document.addEventListener("waitType", e => {
  started = true
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
})

document.addEventListener("stopCounting", e => {
  return
})

}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

