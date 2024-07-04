const fs = require('node:fs/promises');

async function getStoredRiddles() {
  try {
    const rawFileContent = await fs.readFile('riddles.json', { encoding: 'utf-8' });
    console.log('Raw file content:', rawFileContent); // Log raw content for debugging
    const data = JSON.parse(rawFileContent);
    const storedRiddles = data.riddles ?? [];
    return storedRiddles;
  } catch (error) {
    console.error('Error reading or parsing riddles.json:', error.message);
    return []; // Return empty array or handle error as appropriate
  }
}


exports.getStoredRiddles= getStoredRiddles;
