const items = [
              "public class Example {\npublic static void main(String[] args) {\nSystem.out.println(\"Hey there\");\n}\n}",
              "int number = 1;\n\nwhile (true) {\nSystem.out.println(number);\nif (number >= 5) {\nbreak;\n}\nnumber = number + 1;\n}",
              "import java.util.*;\npublic class ListExample{\npublic static void main(String args[]){\nList<String> list=new ArrayList<String>();\nlist.add(\"Mango\")",
              "num = 8\nnum_sqrt = num ** 0.5\nprint('The square root of %0.3f is %0.3f'%(num ,num_sqrt))",
              "a = 5\nb = 6\nc = 7\n\ns = (a + b + c) / 2\n\narea = (s*(s-a)*(s-b)*(s-c)) ** 0.5",
              "my_string = 'deepak'\nmy_tuple = (1,2,3,4)\nprint('name in a list: ', list(mystring))\nprint('numbers in a list: ', list(mytuple))",
              "var names = new List<string>() { \"John\", \"Tom\", \"Peter\" };\nforeach (string name in names)\n{\nConsole.WriteLine(name);\n}",
              "int i = 1;\n\nswitch (i)\n{\ncase 1:\nConsole.WriteLine(\"One\");\nbreak;\ncase 2:\nConsole.WriteLine(\"Two\");\nbreak;\n}",
              "int[] intArray = new int[5] { 8, 10, 2, 6, 3 };\nArray.Sort(intArray);\nforeach (int i in intArray) Console.Write(i + \" \");",
              "#include <iostream>\nusing namespace std;\nint main() {\nint a;\nint b;\ncin>>a>>b;\ncout<<a+b;\nreturn 0;\n}",
              "#include <iostream>\nusing namespace std;\nint main() {\nint a;\ncin>>a;\nif(a%2 == 0)\ncout<<\"even\";\nelse cout<<\"odd\";\nreturn 0;\n}",
              "#include <iostream>\nusing namespace std;\nint main() {\nstring str;\ncin>>str;\nint count = 0;\nfor(int i = 0;str[i];i++) count++;\ncout<<count;",
              ];
var i = -1;
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
  i++;
  if (i == items.length) i = 0;
  return items[i];
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
  const quote = getRandomQuote() 
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


