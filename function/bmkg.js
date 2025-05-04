/*
- [ `Scraper Gempa Bmkg` ]
- Created: Rizki
- Sumber: https://whatsapp.com/channel/0029VadfVP5ElagswfEltW0L
*/

const fetch = require('node-fetch');

async function getGempa() {
  try {
    const response = await fetch(`https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`);
    const data = await response.json();
    const i = data.Infogempa.gempa;

    const result = {
      tanggal: i.Tanggal,
      jam: i.Jam,
      magnitudo: i.Magnitude,
      kedalaman: i.Kedalaman,
      wilayah: i.Wilayah,
      potensi: i.Potensi,
      dirasakan: i.Dirasakan || 'Kurang Kerasa😂',
      koordinat: i.Coordinates,
      lintang: i.Lintang,
      bujur: i.Bujur,
      shakemap: `https://data.bmkg.go.id/DataMKG/TEWS/${i.Shakemap}`,
      datetime: i.DateTime
    };

   return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

module.exports = { getGempa }