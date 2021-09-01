const model = require('../model');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;
const talkersFile = 'talker.json';

const getAllTalkers = async (_req, res) => {
  const talkerData = await model.getAllTalkers(talkersFile);

  return res.status(HTTP_OK_STATUS).json(talkerData);
};

const getTalkerByID = async (req, res, next) => {
  const { id } = req.params;
  const [talkerData] = await model.getTalkerByID(talkersFile, id);

  if (!talkerData) {
    return next({
      status: HTTP_NOT_FOUND,
      message: 'Pessoa palestrante não encontrada',
    });
  }

  return res.status(HTTP_OK_STATUS).json(talkerData);
};

const errorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;

  return res.status(status).json({ message });
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
  errorMiddleware,
};
