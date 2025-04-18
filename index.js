require("./settings.js")
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;
const axios = require("axios")
const { getBuffer, fetchJson } = require('./function/function.js')  
const { stalk } = require("node-tiklydown")
const { setTimeout: sleep } = require('timers/promises');
const fetch = require("node-fetch")
const { jadwaltv } = require("./function/jadwaltv.js")
const { BSearch } = require('./function/bstation.js') 
const { pin2 } = require("./function/pin2.js")
const { doodS } = require('./function/doodstream.js')
const { jadwalsolat } = require("./function/jadwalsolat.js")
const { douyin } = require('./function/douyin.js')
const { mediafire } = require('./function/mediafire.js')
const { nhentaiSearch } = require("./function/nhentaiSearch.js")
const { muslimai } = require("./function/muslimai.js")
const { kodepos } = require("./function/kodepos.js")
const { chord } = require('./function/chord.js')
const { wikimedia } = require("./function/wikimedia.js")
const { ttSearch } = require('./function/tiktoksearch.js') 
const { souncloudDl } = require('./function/soundcloud.js') 
const { lirikLagu } = require('./function/liriklagu.js') 
const { animesearch } = require('./function/animesearch')
const { playstore } = require("./function/playstore.js")
const { ssweb } = require("./function/ssweb.js")
const { ephoto } = require('./function/pornhub.js') 
const { simsimi } = require("./function/simsimi.js")
const { YtMp3, YtMp4, Search } = require('./function/youtube.js') 
const scp = require("caliph-api")
const { pinterest2, pinterest } = require('./function/pinterest.js') 
const { pindlVideo } = require('./function/pindl.js') 
const { halodoc } = require('./function/halodoc.js')
const { ba } = require('./function/ba.js');
const scp2 = require("imon-videos-downloader")
const { googleImage } = require('./function/gimage.js') 
const { githubstalk } = require('./function/githubstalk.js') 
const { fbdl } = require('./function/facebook.js') 
const { shortUrl, shortUrl2 } = require('./function/tinyurl.js') 
const { remini } = require('./function/remini.js')
const { igdl } = require('./function/instagram.js') 
const { chatbot } = require('./function/gpt.js')
const { uploaderImg } = require('./function/uploadImage.js');
const { tiktokdl } = require('./function/tiktok.js') 
const {
  convertCRC16,
  generateTransactionId,
  generateExpirationTime,
  elxyzFile,
  generateQRIS,
  createQRIS,
  checkQRISStatus
} = require('./function/orkut.js') 


app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "function")));
app.use(bodyParser.raw({ limit: '50mb', type: '*/*' }))

const cekApikey = async (key) => {
let list = []
try {
list = global.apikey
return list.includes(key.toLowerCase()) ? true : false
} catch (err) {
return false
}}

app.get('/api/orkut/createpayment', async (req, res) => {
    const { apikey, amount } = req.query;
    if (!apikey) {
    return res.json("Isi Parameter Apikey.");
    }
    const check = global.apikey
    if (!check.includes(apikey)) return res.json("Apikey Tidak Valid!.")
    if (!amount) {
    return res.json("Isi Parameter Amount.")
    }
    const { codeqr } = req.query;
    if (!codeqr) {
    return res.json("Isi Parameter CodeQr menggunakan qris code kalian.");
    }
    try {
        const qrData = await createQRIS(amount, codeqr);
        res.json({ status: true, creator: global.creator, result: qrData });        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})



app.get('/api/orkut/cekstatus', async (req, res) => {
    const { merchant, keyorkut } = req.query;
        if (!merchant) {
        return res.json("Isi Parameter Merchant.")
    }
    if (!keyorkut) {
        return res.json("Isi Parameter Keyorkut.");
    }
    try {
        const apiUrl = `https://gateway.okeconnect.com/api/mutasi/qris/${merchant}/${keyorkut}`;
        const response = await axios.get(apiUrl);
        const result = await response.data;
                // Check if data exists and get the latest transaction
        const latestTransaction = result.data && result.data.length > 0 ? result.data[0] : null;
                if (latestTransaction) {
            res.json(latestTransaction);
        } else {
            res.json({ message: "No transactions found." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('random/ba', async (req, res) => {
    try {
        const anu = await ba();
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': anu.length,
        });
        res.end(anu);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    };
});



app.get("/api/ai/openai-prompt", async (req, res) => {
    const { prompt, msg } = req.query;
    if (!prompt || !msg) return res.json("Isi Parameternya!");

    try {
        var anu = await groq(`${msg}`, `${prompt}`)
        if (!anu.status) {
        res.json ({
        status: false,
        creator: global.creator,
        result: anu.respon
        })
        }

        res.json({
            status: true,
            creator: global.creator,
            result: anu.respon     
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/ai/openai", async (req, res) => {
    const { msg } = req.query;
    if (!msg) return res.json("Isi Parameternya!");

    try {
        var anu = await groq(`${msg}`)
        if (!anu.status) {
        res.json ({
        status: false,
        creator: global.creator,
        result: anu.respon
        })
        }

        res.json({
            status: true,
            creator: global.creator,
            result: anu.respon     
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/ai/muslimai", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.json("Isi Parameternya!");

    try {
        var anu = await muslimai(`${query}`)
        if (!anu.status) {
        res.json ({
        status: false,
        creator: global.creator,
        result: anu
        })
        }

        res.json({
            status: true,
            creator: global.creator,
            result: anu     
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/ai/gpt4", async (req, res) => {
    const { text } = req.query;
    if (!text) return res.json("Isi Parameternya!");

    try {
        var anu = await chatbot.send(`${text}`)
        if (!anu?.choices[0]?.message?.content) {
        res.json ({
        status: false,
        creator: global.creator,
        result: null
        })
        }

        res.json({
            status: true,
            creator: global.creator,
            result: anu.choices[0].message.content
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/ai/gpt-3-5-turbo", async (req, res) => {
    const { text } = req.query;
    if (!text) return res.json("Isi Parameternya!");

    try {
        var anu = await chatbot.send(`${text}`, "gpt-3.5-turbo")
        if (!anu?.choices[0]?.message?.content) {
        res.json ({
        status: false,
        creator: global.creator,
        result: null
        })
        }

        res.json({
            status: true,
            creator: global.creator,
            result: anu.choices[0].message.content
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/ai/simsimi", async (req, res) => {
    const { text } = req.query;
    if (!text) return res.json("Isi Parameternya!");

    try {
        var anu = await simsimi(`${text}`)
        if (!anu.status) {
        res.json ({
        status: false,
        creator: global.creator,
        result: anu
        })
        }

        res.json({
            status: true,
            creator: global.creator,
            result: anu     
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get('/api/jadwal/jadwaltv', async (req, res) => {
    const { channel } = req.query;

    try {
        const url = `https://jadwaltv.net/channel/${channel.toLowerCase()}`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let jadwal = [];

        // Scraping data dari tabel
        $('.table tbody tr').each((i, el) => {
            const jam = $(el).find('td').eq(0).text().trim();
            const acara = $(el).find('td').eq(1).text().trim();

            if (jam && acara) {
                jadwal.push({ jam, acara });
            }
        });

        if (jadwal.length === 0) {
            return res.status(404).json({ status: false, message: `Masukan Nama Channel Parameters!` });
        }

        res.json({
            status: true,
            creator: global.creator,
            result: jadwal
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Terjadi kesalahan saat mengambil data.' });
    }
});



app.get('/api/tools/removebg', async (req, res) => {
    let { img } = req.query;

    // Cek apakah ada URL gambar
    if (!img) {
        return res.status(400).json({ success: false, message: "Masukan Url Parameters!" });
    }

    try {
        // Request ke API Lolhuman
        let response = await axios.get(`https://api.lolhuman.xyz/api/removebg?apikey=Rizki#321&img=${encodeURIComponent(img)}`, {
            responseType: 'arraybuffer' // Agar hasil berupa gambar
        });

        // Kirim gambar hasil ke user
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error("Error RemoveBG:", error.message);
        res.status(500).json({ success: false, message: "Gagal memproses gambar!" });
                  }
});
      


app.get("/api/ai/gemini", async (req, res) => {
    const { text } = req.query;
    if (!text) return res.json("Isi Parameternya!");

try {
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCPlGoKHoePXhHIaI7TLUESYgExSiB5XbI");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = text

const result = await model.generateContent(prompt);
const anu = await result.response.text()
       
        if (!anu) {
        res.json ({
        status: false,
        creator: global.creator,
        result: null
        })
        }

        res.json({
            status: true,
            creator: global.creator,
            result: anu
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})


app.get("/api/download/fbdl", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await fbdl(`${url}`)
        res.json({
        status: true, 
        creator: global.creator, 
        result: anu
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/search/jadwalsolat", async (req, res) => {
    const { id } = req.query;
    if (!id) return res.json("Masukan Id Parameters!!");

    try {
        var anu = await jadwalsolat(`${id}`)
        res.json({
        status: true, 
        creator: global.creator, 
        result: anu
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})


app.get("/api/search/nhentai", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.json("Masukan Parameternya!");

    try {
        var anu = await nhentaiSearch(`${query}`)
        res.json({
        status: true, 
        creator: global.creator, 
        result: anu
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})


app.get("/api/download/mediafire", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.json("Masukan Url Parameters!") 

  try {
    var anu = await mediafire(`${url}`)
    res.json({
      status: true,
      creator: global.creator,
      result: anu
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while fetching data." })
  }
})

app.get("/api/download/igdl", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await igdl(`${url}`)
        res.json(anu)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/download/tiktokdl", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await tiktokdl.fetchData(`${url}`)

        res.json({
            status: true,
            creator: global.creator,
            result: anu     
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/download/ytmp3", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await YtMp3(`${url}`)

        res.json({
            status: true,
            creator: global.creator,
            metadata: anu.details, 
            download: anu.downloads        
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

app.get("/api/download/ytmp4", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await YtMp4(`${url}`)

        res.json({
            status: true,
            creator: global.creator,
            metadata: anu.details, 
            download: anu.downloads        
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

app.get("/api/download/douyin", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await douyin(`${url}`)

        res.json({
            status: true,
            creator: global.creator,
            result: anu   
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

app.get("/api/download/doodstream", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await doodS(`${url}`)

        res.json({
            status: true,
            creator: global.creator,
            result: anu   
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

app.get("/api/download/soundcloud", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await souncloudDl.process(`${url}`)
        res.json({
            status: true,
            creator: global.creator,
            result: anu       
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/download/gdrive", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await scp2.GDLink(`${url}`)
        res.json({
            status: true,
            creator: global.creator,
            result: anu.data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

app.get("/api/download/pindlvid", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await pindlVideo(`${url}`)
        res.json({
            status: true,
            creator: global.creator,
            result: anu.data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
})

app.get("/api/download/capcut", async (req, res) => {
    const { url } = req.query;
    if (!url) return res.json("Isi Parameternya!");

    try {
        var anu = await scp2.capcut(`${url}`)
        res.json({
            status: true,
            creator: global.creator,
            result: anu.data
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while fetching data." });
    }
});

app.get("/api/tools/remini", async (req, res) => {
    try {     
      const { url } = req.query
      if (!url) return res.json("Isi Parameternya!");
      const image = await getBuffer(url)
      if (!image) res.json("Error!");
      const result = await remini(image, "enhance")
      await res.set("Content-Type", "image/png")
      await res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/tools/bratgenerator", async (req, res) => {
    try {     
      const { text } = req.query
      if (!text) return res.json("Isi Parameternya!");
      const image = await getBuffer(`https://brat.caliphdev.com/api/brat?text=${text}`)
      if (!image) res.json("Error!")
      await res.set("Content-Type", "image/png")
      await res.send(image)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/tools/tinyurl", async (req, res) => {
    try {     
      const { url } = req.query
      if (!url) return res.json("Isi Parameternya!");
      if (!url.startsWith("https://")) res.json("Link tautan tidak valid!")
      const result = await shortUrl(url)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      link: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/tools/isgd", async (req, res) => {
    try {     
      const { url } = req.query
      if (!url) return res.json("Isi Parameternya!");
      if (!url.startsWith("https://")) res.json("Link tautan tidak valid!")
      const result = await shortUrl2(url)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      link: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

  app.get("/api/tools/ssweb", async (req, res) => {
    try {     
      const { url } = req.query
      if (!url) return res.json("Isi Parameternya!");
      const image = await getBuffer(url)
      if (!image) res.json("Error!");
      const result = await ssweb(image)
      await res.set("Content-Type", "image/png")
      await res.send(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/tools/tiktokstalk", async (req, res) => {
    try {     
      const { user } = req.query
      if (!user) return res.json("Isi Parameternya!");
      const result = await stalk(user).then(res => res.data)
      if (!result) return res.json("Error!");
      let value = {
      nama: result.user.nickname, 
      user: result.user.uniqueId, 
      bio: result.user.signature, 
      privatemode: result.user.privateAccount,
      profile: result.user.avatarMedium, 
      followers: result.stats.followerCount, 
      following: result.stats.followingCount
      }
      res.json({
      status: true, 
      creator: global.creator, 
      result: value
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/tools/githubstalk", async (req, res) => {
    try {     
      const { user } = req.query
      if (!user) return res.json("Isi Parameternya!");
      const result = await githubstalk(user).then(res => res)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.post("/api/tools/upload", async (req, res) => {
    try {     
      const image = req.body
      if (!image) return res.send("POST METHOD!")
      const result = await uploaderImg(image)
      if (!result.status) return res.send("Image Tidak Ditemukan!")
      return res.json(result)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/pterodactyl/listpanel", async (req, res) => {
    try {     
let { egg, nestid, loc, domain, ptla, ptlc } = req.query
if (!egg || !nestid || !loc || !domain || !ptla || !ptlc) return res.json("Isi Parameternya!")
domain = "https://" + domain
let listnya = []
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + ptla
}
})
let res2 = await f.json();
let servers = res2.data;
if (servers.length < 1) return res.json("Tidak ada server panel!");
for (let server of servers) {
let s = server.attributes
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + ptlc
}
})
let data = await f3.json();
let status = data.attributes ? data.attributes.current_state : s.status;
await listnya.push({
Id: s.id, 
Nama: s.name, 
Ram: `${s.limits.memory == 0 ? "Unlimited" : s.limits.memory.toString().length > 4 ? s.limits.memory.toString().split("").slice(0,2).join("") + "GB" : s.limits.memory.toString().length < 4 ? s.limits.memory.toString().charAt(1) + "GB" : s.limits.memory.toString().charAt(0) + "GB"}`, 
Cpu: `${s.limits.cpu == 0 ? "Unlimited" : s.limits.cpu.toString() + "%"}`, 
Disk: `${s.limits.disk == 0 ? "Unlimited" : s.limits.disk.length > 3 ? s.limits.disk.toString().charAt(1) + "GB" : s.limits.disk.toString().charAt(0) + "GB"}`, 
Created: `${s.created_at.split("T")[0]}`
})
}
res.json({
status: true, 
creator: global.creator,
totalserver: listnya.length.toString(),
result: listnya
})
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/pinterest", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      const result = await pinterest2(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/pin2", async (req, res) => {
    try {     
      const { query } = req.query
      if (!query) return res.json("Isi Parameternya!");
      const result = await pin2(query)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


app.get("/api/download/animesearch", async (req, res) => {
  try {
    const result = await animesearch()
    if(!result) return res.json("error");
    res.json({
      status: true,
      creator: global.creator,
      result: result
    })
  } catch (e) {
    console.log(e)
    res.send(e)
  }
})

app.get("/api/search/halodoc", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      const result = await halodoc(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/wikimedia", async (req, res) => {
    try {     
      const { title } = req.query
      if (!title) return res.json("Isi Parameternya!");
      const result = await wikimedia(title)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/bstation", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      const result = await BSearch(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/sfile", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      let result = await scp.search.sfile(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result.result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/happymod", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      let result = await scp.search.happymod(q)
      result = result.result.map((e) => {
      return { icon: e.thumb, name: e.title, link: e.link }
     })
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/gimage", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      const result = await googleImage(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


app.get("/api/search/ytsearch", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      const result = await Search(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/kodepos", async (req, res) => {
    try {     
      const { query } = req.query
      if (!query) return res.json("Isi Parameternya!");
      const result = await kodepos(query)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


app.get("/api/search/playstore", async (req, res) => {
    try {     
      const { search } = req.query
      if (!search) return res.json("Isi Parameternya!");
      const result = await playstore(search)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/chord", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      const result = await chord(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/tiktoksearch", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      const result = await ttSearch(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/search/lyrics", async (req, res) => {
    try {     
      const { q } = req.query
      if (!q) return res.json("Isi Parameternya!");
      const result = await lirikLagu(q)
      if (!result) return res.json("Error!");
      res.json({
      status: true, 
      creator: global.creator, 
      result: result
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/imagecreator/pornhub", async (req, res) => {
    try {     
      const { text1, text2 } = req.query
      if (!text1 || !text2) return res.json("Isi Parameternya!");
      const image = await ephoto(text1, text2)
      if (!image) res.json("Error!")
      res.json({
      status: true, 
      creator: global.creator, 
      result: image
      })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/api/imagecreator/qc", async (req, res) => {
    try {     
      const { text, fotoUrl, nama } = req.query
      if (!text || !nama || !fotoUrl) return res.json("Isi Parameternya!");
const json = {
  "type": "quote",
  "format": "png",
  "backgroundColor": "#000000",
  "width": 812,
  "height": 968,
  "scale": 2,
  "messages": [
    {
      "entities": [],
      "avatar": true,
      "from": {
        "id": 1,
        "name": nama,
        "photo": {
          "url": fotoUrl
        }
      },
      "text": text,
      "replyMessage": {}
    }
  ]
};
        const response = axios.post('https://bot.lyo.su/quote/generate', json, {
        headers: {'Content-Type': 'application/json'}
}).then(async (res) => {
    const buffer = Buffer.from(res.data.result.image, 'base64')
  return buffer
})
      if (!response) res.json("Error!")
      await res.set("Content-Type", "image/png")
      await res.send(response)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Error");
});


app.use((req, res, next) => {
res.send("Sepertinya Ada Gangguan, Mohon Laporkan Kepada Creator")
});


app.listen(PORT, () => {
  console.log(`Server Telah Berjalan > http://localhost:${PORT}`)
})



