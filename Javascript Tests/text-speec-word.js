function getWord(word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => response.json())
      .then(data => {
        const word = data[0].word;
        // Call the text-to-speech function with the extracted definition as input
        speak(word);
      })
      .catch(error => console.log(error));
  }
  
  // Function to convert text to speech using the Web Speech API
  function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  }
  
  // Call the getDefinition function with a word as input
  getWord("hello");