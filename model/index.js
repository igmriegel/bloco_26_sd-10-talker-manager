const fs = require('fs').promises;

const readParseFile = async (filePath) => {
  const data = await fs.readFile(filePath, 'utf-8');
  const parsedData = await JSON.parse(data);

  return parsedData;
};

const appendTextData = async (filePath, data) => {
  const oldData = await readParseFile(filePath);
  const newData = JSON.stringify([...oldData, data], null, '  ');

  fs.writeFile(filePath, newData, { flag: 'w+' })
    .then(() => console.log(`${JSON.stringify(data)} saved to ${filePath}`))
    .catch((error) => console.log(error));
};

const getAllTalkers = async (filePath) => {
  const allTalkers = await readParseFile(filePath);

  return allTalkers;
};

const getTalkerByID = async (filePath, talkerID) => {
  const talkerArray = await getAllTalkers(filePath);
  const talker = talkerArray.filter(({ id }) => String(id) === String(talkerID));

  return talker;
};

const getAllTokens = async (filePath) => {
  const tonkensArray = await readParseFile(filePath);
  const tokensList = tonkensArray.map((i) => i.token);

  return tokensList;
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
  getAllTokens,
  appendTextData,
};
