const axios = require("axios")
const cheerio = require("cheerio")

async function getKode(query) {
    try {
        const url = `https://nomorkodepos.com/?s=${query}`;
        const { data } = await axios.get(url);
        const $ = await cheerio.load(data);

        let result = [];

        $(".table tbody tr").each((i, el) => {
            const klm = $(el).find("td");
            if(klm.length >= 3) {
                const kelurahan = $(klm[0]).text().trim();
                const kecamatan = $(klm[1]).text().trim();
                const kode = $(klm[2]).text().trim();
                }
            return result
        })
    } catch (e) {
        console.log(e)
    }
}

module.exports = { getKode }
