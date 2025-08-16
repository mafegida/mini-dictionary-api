import express from 'express';
import process from 'node:process';
import data from '../mini-dictionary-api/data.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// GET /words - Return all words
app.get('/words', (req, res) => {
  res.json(data);
});

// GET /words/:word - Get specific word details (case-insensitive)
app.get('/words/:word', (req, res) => {
  const {word} = req.params;
  const input = data.find(item => item.word.toLowerCase() === word.toLowerCase());

  if (!input){
    return res.status(404).json({error: 'Not found'});
  }
  res.json(input);
})

// GET /filter?type=verb - Filter by type
app.get('/filter', (req, res) => {
  const {type} = req.query;
  if(!type) {
    return res.status(400).json({error:'Missing required query parameter: type'});
  }

  const filtered = data.filter(item => item.type.toLowerCase()=== type.toLowerCase());
  res.json(filtered);
});

// GET /search?q=ap - Search words containing query
app.get('/search', (req, res) => {
  const q = req.query?.q;
   if (!q) {
    return res.status(400).json({ error: 'Missing required query parameter: q' });
  }
  const results = data.filter(item => item.word.toLowerCase().includes(q.toLowerCase()));

  res.json(results);
});

// Return one random word

app.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  res.json(data[randomIndex]);

})

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
