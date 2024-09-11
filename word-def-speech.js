if (localStorage.getItem("Correct-Words") == null) {
  var cArray = [];
} else {
  var cArray = JSON.parse(localStorage.getItem("Correct-Words"));
}

if (localStorage.getItem("Wrong-Words") == null) {
  var wArray = [];
} else {
  var wArray = JSON.parse(localStorage.getItem("Wrong-Words"));
}

if (localStorage.getItem("History-Words") == null) {
  var historyArray = [];
} else {
  var historyArray = JSON.parse(localStorage.getItem("History-Words"));
}

let generatedWord = '';
var words = [];

function hardwords() {
  words = document.getElementById("hard").textContent.trim().split(" , ");
  generateWord();
}

function mediumwords() {
  words = document.getElementById("medium").textContent.trim().split(" , ");
  generateWord();
}

function easywords() {
  words = document.getElementById("easy").textContent.trim().split(" , ");
  generateWord();
}

var wrong = 0;

function generateWord() {
  wrong = 0;
  generatedWord = words[Math.floor(Math.random() * words.length)];
  callWord();
  let clear = document.getElementById("textbox").value = '';
  document.getElementById("textbox").style.backgroundColor = "white";
  return clear;
}

document.getElementById('selection').addEventListener("change", function () {
  if (this.value == "1") {
    easywords();
  } else if (this.value == "2") {
    mediumwords();
  } else {
    hardwords();
  }
});

function correctarray(cWord) {
  cArray.unshift(cWord.replace(/'/g, ''));
  historyArray.push({ word: cWord.replace(/'/g, ''), correct: true });
  localStorage.setItem("Correct-Words", JSON.stringify(cArray));
  localStorage.setItem("History-Words", JSON.stringify(historyArray));
  console.log(localStorage.getItem("Correct-Words"));
  history();
}

function wrongarray(wWord) {
  wArray.unshift(wWord.replace(/'/g, ''));
  historyArray.push({ word: wWord.replace(/'/g, ''), correct: false });
  localStorage.setItem("Wrong-Words", JSON.stringify(wArray));
  localStorage.setItem("History-Words", JSON.stringify(historyArray));
  console.log(localStorage.getItem("Wrong-Words"));
  history();
}

function inputLower() {
  let input = document.getElementById("textbox").value;
  let iStr = input.toString();
  const lowerInput = iStr.toLowerCase();
  genwordLower(lowerInput);
}

function genwordLower(lowerInput) {
  const normalizedWord = generatedWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  const lowernorm = normalizedWord.toLowerCase();
  const matchlowernorm = lowernorm.replace(/'/g, '');
  matching(matchlowernorm, lowerInput);
}

function matching(matchlowernorm, lowerInput) {
  if (lowerInput === matchlowernorm) {
    wrong = 0;
    correctarray(generatedWord);
    generateWord();
    let clear = document.getElementById("textbox").value = '';
    document.getElementById("textbox").style.backgroundColor = "white";
    console.log(wrong);
    return clear;
  } else {
    wrong = wrong + 1;
    if (wrong == 1) {
      let light = document.getElementById("textbox").style.backgroundColor = "lightcoral";
      return light;
    } else if (wrong == 2) {
      let red = document.getElementById("textbox").style.backgroundColor = "#e02e22";
      return red;
    } else if (wrong == 3) {
      wrongarray(generatedWord);
      console.log(wrong);
      generateWord();
      console.log(wrong);
    }

    console.log(wrong);
  }
}

function callWord() {
  speak(`The word is `, 1);
  speak(`${generatedWord}`, document.getElementById("adjustspeed").value);
}

function getDefinition() {
  NewgeneratedWord = generatedWord.replace(/'/g, '');
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${NewgeneratedWord}`)
    .then(response => response.json())
    .then(data => {
      try {
        var definition = data[0].meanings[0].definitions[0].definition;
        speak(`The definition of ${generatedWord} is: ${definition}`, document.getElementById("adjustspeed").value);
      } catch {
        speak(`Sorry, the definition of ${generatedWord} is unavailable`, document.getElementById("adjustspeed").value);
      }
      console.log(definition);
    })
}

function speak(text, rate) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  synth.speak(utterance);
}

function history() {
  document.getElementById("history").innerHTML = "";
  historyArray.slice().reverse().forEach(item => {
    const iconClass = item.correct ? 'fa-check check' : 'fa-xmark xmark';
    document.getElementById("history").innerHTML += `<div class='historyWord'><i class='fa-solid ${iconClass}'></i><p>${item.word}</p></div>`;
  });
}

history();
easywords();


/*if (localStorage.getItem("Correct-Words") == null) {
  var cArray = [];
}
else {
  var cArray = JSON.parse(localStorage.getItem("Correct-Words"));
}

if (localStorage.getItem("Wrong-Words") == null) {
  var wArray = [];
}
else {
  var wArray = JSON.parse(localStorage.getItem("Wrong-Words"));
}

let generatedWord = '';
var words = [];

function hardwords() {
  words = document.getElementById("hard").textContent.trim().split(" , ");
  generateWord();
}

function mediumwords() {
  words = document.getElementById("medium").textContent.trim().split(" , ");
  generateWord();
}

function easywords() {
  words = document.getElementById("easy").textContent.trim().split(" , ");
  generateWord();
}

//function CompList(){
//    words = document.getElementById("CompList").textContent.trim().split(" , ");
//    generateWord();
//}

var wrong = 0

function generateWord() {
  // Generate a random word from the array
  wrong = 0
  generatedWord = words[Math.floor(Math.random() * words.length)];
  callWord();
  let clear = document.getElementById("textbox").value = '';
  document.getElementById("textbox").style.backgroundColor = "white";
  return clear;
}

document.getElementById('selection').addEventListener("change", function () {
  if (this.value == "1") {
    easywords();
  } else if (this.value == "2") {
    mediumwords();
  } else {
    hardwords();
  }
});

function correctarray(cWord) {
  cArray.unshift(cWord.replace(/'/g, ''));
  localStorage.setItem("Correct-Words", JSON.stringify(cArray));
  console.log(localStorage.getItem("Correct-Words"));
  history();
}

function wrongarray(wWord) {
  wArray.unshift(wWord.replace(/'/g, ''));
  localStorage.setItem("Wrong-Words", JSON.stringify(wArray));
  console.log(localStorage.getItem("Wrong-Words"));
  history();
}

function inputLower() {
  //console.log('inputLower function called'); // Add this line to check if the function is being called
  let input = document.getElementById("textbox").value;
  let iStr = input.toString();
  //console.log(input);
  const lowerInput = iStr.toLowerCase();
  genwordLower(lowerInput);
}

/*function genwordLower(lowerInput) {
  const normalizedWord = generatedWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  const lowernorm = normalizedWord.toLowerCase();
  const matchlowernorm = lowernorm.replace(/'/g, '');
  matching(matchlowernorm, lowerInput);
}

function matching(matchlowernorm, lowerInput) {
  //console.log(lowerInput, matchlowernorm);
  if (lowerInput === matchlowernorm) {
    wrong = 0
    correctarray(generatedWord);
    generateWord();
    let clear = document.getElementById("textbox").value = '';
    document.getElementById("textbox").style.backgroundColor = "white";
    console.log(wrong)
    return clear;
  }
  else {
    wrong = wrong + 1;
    if (wrong == 1) {
      let light = document.getElementById("textbox").style.backgroundColor = "lightcoral";
      return light
    }
    else if (wrong == 2) {
      let red = document.getElementById("textbox").style.backgroundColor = "#e02e22";
      return red;
    }
    else if (wrong == 3) {
      let dark = document.getElementById("textbox").style.backgroundColor = "#9c251c";
      return dark;
    }

    console.log(wrong);

  }
}HAVE TO PUT END COMMENT

function genwordLower(lowerInput) {
  const normalizedWord = generatedWord.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  const lowernorm = normalizedWord.toLowerCase();
  const matchlowernorm = lowernorm.replace(/'/g, '');
  matching(matchlowernorm, lowerInput);
}

function matching(matchlowernorm, lowerInput) {
  //console.log(lowerInput, matchlowernorm);
  if (lowerInput === matchlowernorm) {
    wrong = 0;
    correctarray(generatedWord);
    generateWord();
    let clear = document.getElementById("textbox").value = '';
    document.getElementById("textbox").style.backgroundColor = "white";
    console.log(wrong);
    return clear;
  } else {
    wrong = wrong + 1;
    if (wrong == 1) {
      let light = document.getElementById("textbox").style.backgroundColor = "lightcoral";
      return light;
    } else if (wrong == 2) {
      let red = document.getElementById("textbox").style.backgroundColor = "#e02e22";
      return red;
    } else if (wrong == 3) {
      let dark = document.getElementById("textbox").style.backgroundColor = "#9c251c";
      wrongarray(generatedWord);
      generateWord();
      return dark;
    }

    console.log(wrong);
  }
}

function callWord() {
  // Call the text-to-speech function with the generated word as input
  speak(`The word is `, 1);
  speak(`${generatedWord}`, document.getElementById("adjustspeed").value);
}

function getDefinition() {
  NewgeneratedWord = generatedWord.replace(/'/g, '');
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${NewgeneratedWord}`)
    .then(response => response.json())
    .then(data => {
      try {
        var definition = data[0].meanings[0].definitions[0].definition;
        speak(`The definition of ${generatedWord} is: ${definition}`, document.getElementById("adjustspeed").value);
      } catch {
        speak(`Sorry, the definition of ${generatedWord} is unavailable`, document.getElementById("adjustspeed").value);
      }
      console.log(definition);
    })
}

// Function to convert text to speech using the Web Speech API
function speak(text, rate) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate; // Set the rate of speech
  synth.speak(utterance);
}

function history() {
  // Combine wArray and cArray into a single array with an additional property to indicate correctness
  const combinedArray = [];

  wArray.forEach(word => combinedArray.push({ word, correct: false }));
  cArray.forEach(word => combinedArray.push({ word, correct: true }));

  // Sort the combined array based on the order of addition
  combinedArray.sort((a, b) => {
    const aIndex = wArray.indexOf(a.word) !== -1 ? wArray.indexOf(a.word) : cArray.indexOf(a.word);
    const bIndex = wArray.indexOf(b.word) !== -1 ? wArray.indexOf(b.word) : cArray.indexOf(b.word);
    return aIndex - bIndex;
  });

  // Clear the history element
  document.getElementById("history").innerHTML = "";

  // Iterate over the combined array and add the words to the history element
  combinedArray.forEach(item => {
    const iconClass = item.correct ? 'fa-check check' : 'fa-xmark';
    document.getElementById("history").innerHTML += `<div class='historyWord'><i class='fa-solid ${iconClass}'></i><p>${item.word}</p></div>`;
  });
}

/*function history() {
  var dataLegnth = cArray.length;
  document.getElementById("history").innerHTML = "";
  //historyText = document.getElementById("history").textContent
  for (i in wArray) {
    document.getElementById("history").innerHTML += "<div class='historyWord'><i class='fa-solid fa-xmark'></i><p>" + wArray[i] + "</p></div>";
  }
  for (i in cArray) {
    document.getElementById("history").innerHTML += "<div class='historyWord'><i class='fa-solid fa-check check'></i><p>" + cArray[i] + "</p></div>";
  }
}HAVE TO PUT END COMMENT

history();

easywords();*/