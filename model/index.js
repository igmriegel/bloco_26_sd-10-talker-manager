const fs = require('fs').promises;
// const path = require('path');

const getAllTalkers = async (filePath) => {
  const talkersData = await fs.readFile(filePath, 'utf-8');
  const parsedData = await JSON.parse(talkersData);

  return parsedData;
};

const getTalkerByID = async (filePath, talkerID) => {
  const talkerArray = await getAllTalkers(filePath);
  const talker = talkerArray.filter(({ id }) => String(id) === String(talkerID));

  return talker;
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
};
