const model = require('../model');
const services = require('../services');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
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

const createTalker = async (req, res, next) => {
  const { name, age, talk } = req.body;
  const { authorization } = req.headers;

  try {
    await services.validateToken(tokensFile, authorization);
    services.validateTalkerData({ name, age, talk });

    const talker = await services.createTalker({ name, age, talk }, talkersFile);

    return res.status(HTTP_CREATED_STATUS).json({ ...talker });
  } catch (e) {
    console.log(e);
    const { status, message } = e;
    return next({ status, message });
  }
};

const editTalker = async (req, res, next) => {
  const { name, age, talk } = req.body;
  const { id } = req.params;
  const { authorization } = req.headers;

  try {
    await services.validateToken(tokensFile, authorization);
    services.validateTalkerData({ name, age, talk });
    await model.deleteTalkerByID(talkersFile, id);

    const talker = await services.createTalker({ name, age, talk }, talkersFile, id);

    return res.status(HTTP_OK_STATUS).json({ ...talker });
  } catch (e) {
    console.log(e);
    const { status, message } = e;
    return next({ status, message });
  }
};

const deleteTalker = async (req, res, next) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  
  try {
    const message = 'Pessoa palestrante deletada com sucesso';
    await services.validateToken(tokensFile, authorization);
    await model.deleteTalkerByID(talkersFile, id);

    return res.status(HTTP_OK_STATUS).json({ message });
  } catch (e) {
    console.log(e);
    const { status, message } = e;
    return next({ status, message });
  }
};

const searchTalker = async (req, res, next) => {
  const { authorization } = req.headers;
  const { q } = req.query;

  try {
    await services.validateToken(tokensFile, authorization);
    const queryResult = await model.textSearchOnFile(talkersFile, q);

    return res.status(HTTP_OK_STATUS).json(queryResult);
  } catch (e) {
    console.log(e);
    const { status, message } = e;
    return next({ status, message });
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
  createTalker,
  editTalker,
  deleteTalker,
  searchTalker,
  errorMiddleware,
};
