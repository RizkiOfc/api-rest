const Groq = require('groq-sdk');
require("../settings.js")

let api = [
"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"
]

let apikey = api[Math.floor(Math.random() * api.length)]

const client = new Groq({
  apiKey: apikey,
});

async function groq(teks, prompt = `sekarang kamu adalah ai yang mengetahui tentang semua bahasa pemrograman dan selalu gunakan bahasa Indonesia saat menjawab semua pertanyaan!`) {
try {
  const chatCompletion = await client.chat.completions
    .create({
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: teks }
      ],
      model: 'llama3-8b-8192',
    })
    .catch(async (err) => {
      if (err instanceof Groq.APIError) {
        console.log(err.status);
        console.log(err.name);
        console.log(err.headers);
      } else {
        throw err;
      }
    })
    
    return {
  status: true, 
  creator: global.creator,
  respon: chatCompletion.choices[0].message.content
  }
  
  } catch (e) {
  return {
  status: false, 
  creator: global.creator,
  respon: "Error :" + e  
  }
  }
}

module.exports = { groq }
