const express = require('express');
const bodyParser = require('body-parser');

const { getStoredRiddles } = require('./data/riddles');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/riddles', async (req, res) => {
  const storedRiddles = await getStoredRiddles();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ riddles: storedRiddles });
});

app.get('/riddles/:id', async (req, res) => {
  const storedRiddles = await getStoredRiddles();
  const riddle = storedRiddles.find((riddle) => riddle.id === req.params.id);
  res.json({ riddle });
});


app.listen(3000);
