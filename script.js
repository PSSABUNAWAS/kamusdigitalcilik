
let data;

fetch('data.json')
  .then(response => response.json())
  .then(json => data = json);

let recognition;
let sedangDengar = false;

function mulaAuto() {
  if (sedangDengar) return;

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'ms-MY';
  recognition.continuous = false;
  sedangDengar = true;

  recognition.onresult = function(event) {
    const said = event.results[0][0].transcript.toLowerCase();
    alert("Anda sebut: " + said);

    const result = data.find(item => item.perkataan.toLowerCase() === said);

    if (result) {
      document.getElementById('perkataan').innerText = result.perkataan;
      document.getElementById('maksud').innerText = 'Maksud: ' + result.maksud;
      document.getElementById('ayat').innerText = 'Contoh: ' + result.ayat;

      const gabungan = new SpeechSynthesisUtterance("Maksud: " + result.maksud + ". Contoh: " + result.ayat);
      gabungan.lang = 'ms-MY';

      gabungan.onend = () => {
        recognition.start();  // Mula dengar semula selepas habis sebut
      };

      speechSynthesis.speak(gabungan);
    } else {
      document.getElementById('perkataan').innerText = said;
      document.getElementById('maksud').innerText = 'Perkataan tidak dijumpai dalam senarai.';
      document.getElementById('ayat').innerText = '';
      recognition.start();  // Teruskan dengar semula walaupun tak jumpa
    }
  };

  recognition.onerror = function() {
    recognition.start();  // Auto restart jika berlaku ralat
  };

  recognition.start();
}
