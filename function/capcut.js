const axios = require("axios")

module.exports = function(app) {

async function fetchJson(url, options) {
try {
options ? options : {}
const res = await axios({
method: 'GET',
url: url,
headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
},
...options
})
return res.data
} catch (err) {
return err
}
}

async function capcut(url) {
try {
const response = await fetchJson(`https://api.siputzx.my.id/api/d/capcut?url=${url}`)
const result = {
title: response.data.title,
description: response.data.description,
usage: response.data.usage,
originalVideoUrl: response.data.originalVideoUrl,
coverUrl: response.data.coverUrl,
authorUrl: response.data.authorUrl
}
return result
} catch (error) {
console.error(error)
throw error
}
}

app.get('/api/download/capcut', async (req, res) => {
const url = req.query.url || ""
if (!url) {
return res.status(400).json({
status: false,
creator: "DiiOffc",
message: "Masukkan url parameters !"
})
}
try {
const response = await capcut(url)
res.status(200).json({
status: true,
creator: "DiiOffc",
result: response
})
} catch (error) {
res.status(500).json({
status: false,
creator: "DiiOffc",
message: "Error terjadi kesalahan !"
})
}
})
}
