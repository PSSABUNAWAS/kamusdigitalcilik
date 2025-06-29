
let data = [
  { perkataan: "Tendang", maksud: "Menyepak dengan kaki", ayat: "Ali tendang bola dengan kuat." },
  { perkataan: "Putar", maksud: "Memusing sesuatu", ayat: "Dia putar tombol pintu perlahan-lahan." },
  { perkataan: "Fotosintesis", maksud: "Proses tumbuhan membuat makanan", ayat: "Fotosintesis berlaku di daun hijau." },
  { perkataan: "Angkasa", maksud: "Ruang di luar atmosfera bumi", ayat: "Angkasawan pergi ke angkasa." },
  { perkataan: "Rengas", maksud: "Sejenis tumbuhan yang menghasilkan getah", ayat: "Pokok rengas hidup di hutan tropika." },
  { perkataan: "Siput", maksud: "Haiwan bercengkerang dan bergerak perlahan", ayat: "Siput itu merayap di atas daun." },
  { perkataan: "Berat", maksud: "Sukar diangkat atau ditanggung", ayat: "Kotak itu terlalu berat untuk adik." },
  { perkataan: "Tambah", maksud: "Menjadikan lebih banyak", ayat: "Guru tambah soalan latihan kepada murid." },
  { perkataan: "Korperat", maksud: "Berkaitan syarikat besar atau perniagaan", ayat: "Dia bekerja di syarikat korperat terkenal." },
  { perkataan: "Syarikat", maksud: "Organisasi perniagaan", ayat: "Syarikat itu menghasilkan produk tempatan." }
];

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

    const result = data.find(item => said.includes(item.perkataan.toLowerCase()));

    if (result) {
      document.getElementById('perkataan').innerText = result.perkataan;
      document.getElementById('maksud').innerText = 'Maksud: ' + result.maksud;
      document.getElementById('ayat').innerText = 'Contoh: ' + result.ayat;

      const gabungan = new SpeechSynthesisUtterance("Maksud: " + result.maksud + ". Contoh: " + result.ayat);
      gabungan.lang = 'ms-MY';

      speechSynthesis.onvoiceschanged = () => {
        const suara = speechSynthesis.getVoices().find(v => v.name === 'Microsoft Rizwan - Malay (Malaysia)');
        if (suara) gabungan.voice = suara;
        speechSynthesis.speak(gabungan);
      };

      const suaraAwal = speechSynthesis.getVoices().find(v => v.name === 'Microsoft Rizwan - Malay (Malaysia)');
      if (suaraAwal) {
        gabungan.voice = suaraAwal;
        speechSynthesis.speak(gabungan);
      }

      gabungan.onend = () => {
        setTimeout(() => {
          recognition.start();
        }, 1000);
      };

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
