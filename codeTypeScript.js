const items = ["Python!",
              "num = 8\nnum_sqrt = num ** 0.5\nprint('The square root of %0.3f is %0.3f'%(num ,num_sqrt))",
              "a = 5\nb = 6\nc = 7\n\ns = (a + b + c) / 2\n\narea = (s*(s-a)*(s-b)*(s-c)) ** 0.5",
              "my_list = [1, 2, 3, 4, 5]\nfor elem in my_list:\n\tif elem % 2 == 0:\n\t\tprint(\"Even:\", elem)\n\t\tprint(\"break\")\n\t\tbreak\n \telse:\n\t\tprint(\"Odd:\", elem)",
              "C++!",
              "#include <iostream>\nusing namespace std;\nint main() {\nint a;\nint b;\ncin>>a>>b;\ncout<<a+b;\nreturn 0;\n}",
              "#include <iostream>\nusing namespace std;\nint main() {\nint a;\ncin>>a;\nif(a%2 == 0)\ncout<<\"even\";\nelse cout<<\"odd\";\nreturn 0;\n}",
              "#include <iostream>\nusing namespace std;\nint main() {\nstring str;\ncin>>str;\nint count = 0;\nfor(int i = 0;str[i];i++) count++;\ncout<<count;",
              ];
var i = -1;
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

renderNewQuote() 

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

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
      correct = false
    }
  })

  if (correct) renderNewQuote()
})

function getRandomQuote() {
  i++;
  if (i == items.length) i = 0;
  return items[i];
}

async function renderNewQuote() {
  const quote = getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => { // for looping through each character 
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}
