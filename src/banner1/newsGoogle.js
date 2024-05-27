const axios = require('axios');
//pub_42274efc9a31e45f9bc6231a79f84c5d77fd1 nwsdata.IO
//https://newsdata.io/api/1/news?apikey=pub_42274efc9a31e45f9bc6231a79f84c5d77fd1&language=en&timeframe=6
//title 
//link
//description
const options = {
  method: 'GET',
  url: 'https://google-news13.p.rapidapi.com/latest',
  params: {lr: 'en-US'},
  headers: {
    'X-RapidAPI-Key': 'ad3df2f269msh0d61e30fe7df8f0p12b1efjsn0da44fd748b6',
    'X-RapidAPI-Host': 'google-news13.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}