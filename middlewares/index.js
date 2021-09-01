const model = require('../model');

const HTTP_OK_STATUS = 200;

const getAllTalkers = async (_req, res) => {
  const talkerData = await model.getAllTalkers('talker.json');

  return res.status(HTTP_OK_STATUS).json(talkerData);
};

module.exports = {
  getAllTalkers,
};
