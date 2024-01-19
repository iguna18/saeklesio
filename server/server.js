const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.static('../client/build'))
app.use(express.json())

app.get('/api/goc', async (req, res) => {
  console.log(req.query.month, req.query.day)
  if(!req.query.month || !req.query.day) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  try {
    const url = `https://www.orthodoxy.ge/calendar/2023/v2/${req.query.month}/${req.query.day}${req.query.month}.htm`;
    console.log(url);
    const response = await axios.get(url);
    const html = response.data;
    
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    // Find the table with the specified ID
    const table = $('#AutoNumber1');
    let contentBetweenElements = table.find('tr:first-child').find('td:nth-child(2)').toString()
    table.nextUntil('</body>').each((index, element) => {
      contentBetweenElements += $(element).toString();
    });
    // console.log(contentBetweenElements);
    res.send(contentBetweenElements);

    // const firstParagraph = $('p').first().text();
    
    // console.log(firstParagraph);
    // // res.send(`Content of the first <p> element: ${firstParagraph}`);
    // res.json({message:`Content of the first <p> element: ${firstParagraph}`});
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Something went wrong.');
  }
});

app.get('/api/roc', async (req, res) => {
  console.log(req.query.month, req.query.day)
  if(!req.query.month || !req.query.day) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }
  try {
    const url = `https://days.pravoslavie.ru/Days/2023${req.query.month}${req.query.day}.html`;
    console.log(url);
    const response = await axios.get(url);
    const html = response.data;
    
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);

    const div = $('.DD_TEXT');
    // console.log(div)
    res.send(div.text())
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Something went wrong.');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
