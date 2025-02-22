const axios = require("axios");
const cheerio = require("cheerio");

async function jadwaltv(channel) {
    try {
        const url = `https://www.jadwaltv.net/channel/${channel}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let res = [];

        $('table tbody tr').each((i, el) => {
            const jam = $(el).find('td').eq(0).text().trim();
            const acara = $(el).find('td').eq(1).text().trim();
            if(!jam & acara) {
                res.push({jam, acara})
            }
            //console.log(acara)
            return res
        })
    } catch (error) {
        return error
        console.error('Error occurred:', error.response ? error.response.data : error.message);
    }
}

module.exports = { jadwaltv }
