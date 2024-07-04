const fs = require('node:fs/promises');

async function getStoredRiddles() {
  const rawFileContent = await fs.readFile('riddles.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedRiddles = data.riddles ?? [];
  return storedRiddles;
}

exports.getStoredRiddles= getStoredRiddles;
