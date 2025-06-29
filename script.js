
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

      // Gunakan suara Microsoft Rizwan
      const suara = speechSynthesis.getVoices().find(v => v.name === 'Microsoft Rizwan - Malay (Malaysia)');
      if (suara) gabungan.voice = suara;

      gabungan.onend = () => {
        setTimeout(() => {
          recognition.start();
        }, 1000);
      };

      speechSynthesis.speak(gabungan);
    } else {
      document.getElementById('perkataan').innerText = said;
      document.getElementById('maksud').innerText = 'Perkataan tidak dijumpai dalam senarai.';
      document.getElementById('ayat').innerText = '';
      setTimeout(() => {
        recognition.start();
      }, 1000);
    }
  };

  recognition.onerror = function() {
    setTimeout(() => {
      recognition.start();
    }, 1000);
  };

  recognition.start();
}
