const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const userTyped = new Event("waitType")
const stopCount = new Event("stopCounting")

let mistakes = 0
let totalChars = 0
renderNewQuote()

document.addEventListener('input', () => {
  quoteInputElement.focus()
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
      mistakes++
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
    }
  })

  if (correct) { 
    let wpm = Math.round(((totalChars-mistakes) / 5 ) / parseInt(timer.innerText) * 60)
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

    let acc = Math.round(((totalChars-mistakes) / totalChars) * 100)
    acc = acc < 0 || !acc || acc === Infinity ? 0: acc;


    document.getElementById("wpm").innerHTML = "WPM: " + wpm + "\t"
    document.getElementById("accuracy").innerHTML = "ACC: " + acc
    renderNewQuote()
    document.getElementById("wpm").style.color = 'white'
    document.getElementById("accuracy").style.color = 'white'
    document.dispatchEvent(stopCount)
  } 
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  document.getElementById("wpm").style.color = "#222222"
  document.getElementById("accuracy").style.color = "#222222"
  quoteInputElement.focus()
  timerElement.innerText = 0
  document.getElementById("timer").style.color="#222222"
  document.dispatchEvent(stopCount)
  started = false
  startTimer()
  const quote = await getRandomQuote() 
  totalChars = quote.length
  mistakes = 0

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

function goBack() {
  window.location.href="pageMain.html";
}


