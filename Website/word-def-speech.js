/*let generatedWord = '';

function generateWord() {
  // Array of random words
  const words = document.getElementById("hard").textContent.split(", ");
  // Generate a random word from the array
  generatedWord = words[Math.floor(Math.random() * words.length)];
  // Call the text-to-speech function with the generated word as input
  speak(`The word is ${generatedWord}`);
}

function getDefinition() {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${generatedWord}`)
    .then(response => response.json())
    .then(data => {
      const definition = data[0].meanings[0].definitions[0].definition;
      // Call the text-to-speech function with the extracted definition as input
      speak(`The definition of ${generatedWord} is: ${definition}`);
    })
    .catch(error => console.log(error));
}

// Function to convert text to speech using the Web Speech API
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
*/

let generatedWord = '';
var words = [];

function hardwords(){
    words = document.getElementById("hard").textContent.trim().split(" , ");
}

function mediumwords(){
    words = document.getElementById("medium").textContent.trim().split(" , ");
}

function easywords(){
    words = document.getElementById("easy").textContent.trim().split(" , ");
}

function generateWord() {
  // Generate a random word from the array
  generatedWord = words[Math.floor(Math.random() * words.length)];
  // Call the text-to-speech function with the generated word as input
  speak(`The word is ${generatedWord}`, 0.4);
}

function getDefinition() {
  NewgeneratedWord = generatedWord.replace(/'/g, '');
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${NewgeneratedWord}`)
    .then(response => response.json())
    .then(data => {
      const definition = data[0].meanings[0].definitions[0].definition;
      // Call the text-to-speech function with the extracted definition as input
      speak(`The definition of ${generatedWord} is: ${definition}`, 0.98);
    })
    .catch(error => console.log(error));
}

// Function to convert text to speech using the Web Speech API
function speak(text, rate) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // Set the rate of speech
  synth.speak(utterance);
}


//original
/*let generatedWord = '';

function generateWord() {
  // Array of random words
  const words = ['apple', 'banana', 'chocolate', 'diamond', 'elephant', 'football', 'guitar', 'hamburger', 'internet', 'jacket'];
  // Generate a random word from the array
  generatedWord = words[Math.floor(Math.random() * words.length)];
  // Call the text-to-speech function with the generated word as input
  speak(`The word is ${generatedWord}`);
}

function getDefinition() {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${generatedWord}`)
    .then(response => response.json())
    .then(data => {
      const definition = data[0].meanings[0].definitions[0].definition;
      // Call the text-to-speech function with the extracted definition as input
      speak(`The definition of ${generatedWord} is: ${definition}`);
    })
    .catch(error => console.log(error));
}

// Function to convert text to speech using the Web Speech API
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
}
*/