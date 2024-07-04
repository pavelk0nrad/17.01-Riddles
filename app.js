const express = require('express');
const bodyParser = require('body-parser');

const { getStoredRiddles } = require('./data/riddles');

const app = express();
const PORT = process.env.PORT || 3000; // Nastavíme port dle prostředí nebo 3000 jako výchozí

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
  res.json({ riddles: storedRiddles });
});

app.get('/riddles/:id', async (req, res) => {
  const storedRiddles = await getStoredRiddles();
  const riddle = storedRiddles.find((riddle) => riddle.ID === parseInt(req.params.id));
  if (!riddle) {
    res.status(404).json({ error: 'Riddle not found' });
  } else {
    res.json({ riddle });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
