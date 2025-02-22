 const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fetch = require("node-fetch");

async function YtMp3(url) {
    try {
        const {
            videoDetails
        } = await ytdl.getInfo(url, {
            lang: "id"
        });
        const stream = await ytdl(url, {
            filter: "audioonly",
            quality: "highestaudio"
        });

        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));

        await new Promise((resolve, reject) => {
            stream.on("end", resolve);
            stream.on("error", reject);
        });

        const buffer = Buffer.concat(chunks);
        return {
            meta: {
                title: videoDetails.title,
                channel: videoDetails.author.name,
                seconds: videoDetails.lengthSeconds,
                description: videoDetails.description,
                image: videoDetails.thumbnails.slice(-1)[0].url,
            },
            buffer: buffer,
            size: buffer.length,
        };
    } catch (error) {
        throw error;
    }
                                                     }
async function YtMp4(url) {
    try {
        const videoInfo = await ytdl.getInfo(url, {
            lang: "id"
        });
        const format = videoInfo.formats.find(f => f.hasVideo && f.hasAudio && f.qualityLabel);

        if (!format) throw new Error("Format video tidak ditemukan.");

        let response = await require("node-fetch").fetch(format.url, {
            method: "HEAD"
        });
        let fileSizeInBytes = parseInt(response.headers.get("content-length"));

        return {
            title: videoInfo.videoDetails.title,
            thumb: videoInfo.videoDetails.thumbnails.slice(-1)[0].url,
            date: videoInfo.videoDetails.publishDate,
            duration: `${Math.floor(videoInfo.videoDetails.lengthSeconds / 60)} menit`,
            channel: videoInfo.videoDetails.ownerChannelName,
            quality: format.qualityLabel,
            contentLength: fileSizeInBytes,
            description: videoInfo.videoDetails.description,
            videoUrl: format.url
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { YtMp3, YtMp4 }
