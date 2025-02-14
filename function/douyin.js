const axios = require("axios")

async function douyin(url) {
return new Promise(async (resolve, reject) => {
const apiUrl = 'https://tikvideo.app/api/ajaxSearch'
const headers = {
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Referer': 'https://tikvideo.app/id/download-douyin-video',
}
try {
const response = await axios.post(apiUrl, `q=${encodeURIComponent(url)}&lang=id`, { headers })
const inidata = response.data;
const videoHDMatch = inidata.data.match(/href="(.*?)"/)
const videoHD = videoHDMatch ? videoHDMatch[1] : ''
const audioMatch = inidata.data.match(/href="(.*?)"/g)
const audio = audioMatch && audioMatch.length > 1 ? audioMatch[1].match(/"(.*)"/)[1] : ''
const descriptionMatch = inidata.data.match(/<h3>(.*?)<\/h3>/)
const description = descriptionMatch ? descriptionMatch[1] : ''
const videoMatch = inidata.data.match(/href="(.*?)"/g)
const video = videoMatch ? videoMatch[0].match(/"(.*)"/)[1] : ''
resolve({description, "Video_HD": videoHD, "Video": video, "Audio": audio })
} catch (error) {
console.error(error)
throw error
}
})
}

module.exports = { douyin }