const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
 
async function simsimi(text, languageCode = 'id') {
  const url = 'https://api.simsimi.vn/v1/simtalk';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  };
 
  const data = new URLSearchParams();
  data.append('text', text);
  data.append('lc', languageCode);
 
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: data.toString(),
    });
    const rawResponse = await response.text();
    console.log('Raw Response:', rawResponse);
 
    // .text() => .json()
    try {
      const jsonResponse = JSON.parse(rawResponse);
      return jsonResponse.message;
    } catch (error) {
      console.error('Respons bukan JSON:', rawResponse);
      throw new Error('Respons dari server bukan JSON yang valid');
    }
  } catch (error) {
    console.error('Error asking SimSimi:', error);
    throw error;
  }
}

module.exports = { simsimi }
