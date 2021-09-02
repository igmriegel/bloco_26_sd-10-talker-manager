const model = require('../model');
const services = require('../services');

const HTTP_OK_STATUS = 200;
const HTTP_BAD_REQST = 400;
const HTTP_NOT_FOUND = 404;
const talkersFile = 'talker.json';
const tokensFile = 'loginTokens.json';
const tokenSize = 8;

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

const doLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await services.validateLoginData(email, password, tokenSize, tokensFile);
  
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (e) {
    const { message } = e;
    return next({ status: HTTP_BAD_REQST, message });
  }
};

const errorMiddleware = (err, _req, res, _next) => {
  const { status, message } = err;
  console.log(`ran one error status: ${status} and message: ${message}`);

  return res.status(status).json({ message });
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
  doLogin,
  errorMiddleware,
};
