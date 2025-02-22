const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');
 
async function fbdl(fbUrl) {
  try {
    const form = new FormData();
    form.append('id', fbUrl);
    form.append('locale', 'id');
 
    const response = await axios.post('https://getmyfb.com/process', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
 
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const title = $('.results-item-text').text().trim();
      const thumbnail = $('.results-item-image').attr('src');
      const urlDownloads = {};
      const urlHd = $('.results-list li:nth-child(1) a').attr('href');
      const urlSd = $('.results-list li:nth-child(2) a').attr('href');
      return {
          title: title,
          thumb: thumbnail,
          video: {
              hd: urlHd,
              sd: urlSd,
          }
      }
    } else {
      return response.status;
    }
  } catch (error) {
    console.log('Error:', error);
    return error;
  }
              }

module.exports = { fbdl }
