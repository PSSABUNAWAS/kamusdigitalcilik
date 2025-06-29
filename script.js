
let data;

fetch('data.json')
  .then(response => response.json())
  .then(json => data = json);

function mulaSebut() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'ms-MY';
  recognition.start();

  recognition.onresult = function(event) {
    const said = event.results[0][0].transcript.toLowerCase();
    const result = data.find(item => item.perkataan.toLowerCase() === said);

    if (result) {
      document.getElementById('perkataan').innerText = result.perkataan;
      document.getElementById('maksud').innerText = 'Maksud: ' + result.maksud;
      document.getElementById('ayat').innerText = 'Contoh: ' + result.ayat;

      const suara = new SpeechSynthesisUtterance(result.maksud);
      suara.lang = 'ms-MY';
      speechSynthesis.speak(suara);
    } else {
      document.getElementById('perkataan').innerText = said;
      document.getElementById('maksud').innerText = 'Perkataan tidak dijumpai.';
      document.getElementById('ayat').innerText = '';
    }
  };
}
