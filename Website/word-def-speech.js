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

if(localStorage.getItem("Correct-Words") == null){
  var cArray = [];
}else{
  var cArray = JSON.parse(localStorage.getItem("Correct-Words"));
}

let generatedWord = '';
var words = [];


function hardwords(){
    words = document.getElementById("hard").textContent.trim().split(" , ");
    generateWord();
}

function mediumwords(){
    words = document.getElementById("medium").textContent.trim().split(" , ");
    generateWord();
}

function easywords(){
    words = document.getElementById("easy").textContent.trim().split(" , ");
    generateWord();
}

function generateWord() {
  // Generate a random word from the array
  generatedWord = words[Math.floor(Math.random() * words.length)];
  callWord();
}

document.getElementById('selection').addEventListener("change", function() {
  if (this.value == "1") {
    easywords();
  }else if (this.value == "2"){
    mediumwords();
  }else{
    hardwords();
  }
});

function correctarray(cWord){
  cArray.push(cWord.replace(/'/g, ''));
  localStorage.setItem("Correct-Words", JSON.stringify(cArray));
  console.log(localStorage.getItem("Correct-Words"));
}

function inputLower(){
  //console.log('inputLower function called'); // Add this line to check if the function is being called
  let input = document.getElementById("textbox").value;
  let iStr = input.toString();
  //console.log(input);
  const lowerInput = iStr.toLowerCase();
  genwordLower(lowerInput);
}

function genwordLower(lowerInput){
  const normalizedWord = generatedWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  const lowernorm = normalizedWord.toLowerCase();
  const matchlowernorm = lowernorm.replace(/'/g, '');
  matching(matchlowernorm, lowerInput);
}

function matching(matchlowernorm, lowerInput){
  //console.log(lowerInput, matchlowernorm);
  if (lowerInput === matchlowernorm){
    correctarray(generatedWord);
    generateWord();
    let clear = document.getElementById("textbox").value = '';
    return clear;
  }
  else{
    alert("That is incorrect\nTry again")
  }
}

function callWord(){
  // Call the text-to-speech function with the generated word as input
  speak(`The word is `, 1);
  speak(`${generatedWord}`, document.getElementById("adjustspeed").value);
}

function getDefinition() {
  NewgeneratedWord = generatedWord.replace(/'/g, '');
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${NewgeneratedWord}`)
    .then(response => response.json())
    .then(data => {
      const definition = data[0].meanings[0].definitions[0].definition;
      // Call the text-to-speech function with the extracted definition as input
      speak(`The definition of ${generatedWord} is: ${definition}`, document.getElementById("adjustspeed").value);
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