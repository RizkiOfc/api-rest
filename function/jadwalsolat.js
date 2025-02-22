const axios = require("axios");
const cheerio = require("cheerio");

async function jadwalsholat(id) {
    try {
        const url = `https://www.jadwalsholat.org/adzan/daily.php?id=${id}`
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let result = {};
        const waktu = ["imsak", "subuh", "dzuhur", "ashar", "maghrib"];

        $("tr td").each((i, el) => {
            let title = $(el).find("h1").text();
            if(i < waktu.length) {
                result[waktu[i]] = $(el).text();
            }
        });
        return result;
    } catch (e) {
        console.log(e)
    }
}

module.exports = { jadwalsholat }
