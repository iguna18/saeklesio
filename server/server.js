const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.use(express.static('build'))
app.use(express.json())

app.get('/api/goc', async (req, res) => {
  console.log(req.query.month, req.query.day)
  return res.end()
  try {
    const url = 'https://www.orthodoxy.ge/calendar/2023/v2/01/0101.htm';
    const response = await axios.get(url);
    const html = response.data;
    
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);
    const firstParagraph = $('p').first().text();
    
    console.log(firstParagraph);
    res.send(`Content of the first <p> element: ${firstParagraph}`);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Something went wrong.');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
