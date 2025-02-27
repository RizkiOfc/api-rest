const axios = require('axios')
const cheerio = require('cheerio')
async function nhentaiSearch(query) {
try {
const { data } = await axios.get('https://nhentai.net/search/?q=' + query)
const $ = cheerio.load(data)
const result = []

$('.gallery').each((i, el) => {
result.push({
title: $(el).find('.caption').text().trim(),
thumb: $(el).find('.lazyload').attr("data-src").trim(),
link: 'https://nhentai.net'+$(el).find('a').attr("href").trim(),
})
})

return result
} catch (err) {
console.log(err)
}
}

module.exports = { nhentaiSearch }
