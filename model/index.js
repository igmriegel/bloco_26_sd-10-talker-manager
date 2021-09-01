const fs = require('fs').promises;
// const path = require('path');

const getAllTalkers = async (filePath) => {
  const talkersData = await fs.readFile(filePath, 'utf-8');
  const parsedData = await JSON.parse(talkersData);

  return parsedData;
};

module.exports = {
  getAllTalkers,
};
