
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
    alert("Anda sebut: " + said);  // Debug line to show what was heard

    const result = data.find(item => item.perkataan.toLowerCase() === said);

    if (result) {
      document.getElementById('perkataan').innerText = result.perkataan;
      document.getElementById('maksud').innerText = 'Maksud: ' + result.maksud;
      document.getElementById('ayat').innerText = 'Contoh: ' + result.ayat;

      const suaraMaksud = new SpeechSynthesisUtterance("Maksud: " + result.maksud);
      suaraMaksud.lang = 'ms-MY';

      const suaraAyat = new SpeechSynthesisUtterance("Contoh: " + result.ayat);
      suaraAyat.lang = 'ms-MY';

      suaraMaksud.onend = () => {
        speechSynthesis.speak(suaraAyat);
      };

      speechSynthesis.speak(suaraMaksud);
    } else {
      document.getElementById('perkataan').innerText = said;
      document.getElementById('maksud').innerText = 'Perkataan tidak dijumpai dalam senarai.';
      document.getElementById('ayat').innerText = '';
    }
  };
}
