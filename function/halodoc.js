const axios = require("axios")
const cheerio = require("cheerio")

async function halodoc(query) {
try {
const ress = await axios.get(`https://www.halodoc.com/artikel/search/${query}`)
const $ = cheerio.load(ress.data)
const hasil = []
$('.article-card.default-view').each((index, element) => {
const judul = $(element).find('header a').text().trim()
const tautan = `https://www.halodoc.com${$(element).find('header a').attr('href')}`
const deskripsi = $(element).find('.description').text().trim()
const kategori = $(element).find('.tag-container a').map((i, el) => $(el).text().trim()).get()
const gambar = $(element).find('.hd-base-image-mapper__img').attr('src')
hasil.push({ judul, tautan, deskripsi, kategori, gambar })
})
return hasil
} catch (err) {
console.error(err)
}
}

module.exports = { halodoc }