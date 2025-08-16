import express from 'express';
import process from 'node:process';
import data from '../mini-dictionary-api/data.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  });
});

app.get('/words', (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
