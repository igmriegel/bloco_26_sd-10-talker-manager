const { randomBytes } = require('crypto');
const model = require('../model');

const validateEmail = (email) => {
  if (!email) throw new Error('O campo "email" é obrigatório');

  const emailPattern = /[^@]+@[^.]+\..+/;
  const matchEmail = email.match(emailPattern);

  if (!matchEmail) throw new Error('O "email" deve ter o formato "email@email.com"');
};

const validatePass = (password) => {
  if (!password) throw new Error('O campo "password" é obrigatório');

  if (password.length < 6) throw new Error('O "password" deve ter pelo menos 6 caracteres');
};

const validateLoginData = async (email, pass, tokenSize, savePath) => {
  try {
    validateEmail(email);
    validatePass(pass);
  } catch (e) {
    throw new Error(e.message);
  }
  const token = randomBytes(tokenSize).toString('hex');

  await model.appendTextData(savePath, { email, token });

  return token;
};

const customError = (status, message) => ({
  status,
  message,
});

const validateToken = async (filePath, token) => {
  const tokenList = await model.getAllTokens(filePath);
  const validation = tokenList.includes(token);

  if (!token) throw customError(401, 'Token não encontrado');
  if (token.length !== 16) throw customError(401, 'Token inválido');
  if (!validation) throw customError(401, 'Token não encontrado');
};

const validateDate = (date) => {
  const dateRegEx = /^(0[1-9]|[12]\d|3[01])[/](0[1-9]|1[0-2])[/]\d{4}$/gm;
  const validDate = date.match(dateRegEx);
  if (!validDate) return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
 };

const validateRate = (rating) => {
  const validRate = [1, 2, 3, 4, 5].includes(rating);
  if (!validRate) return 'O campo "rate" deve ser um inteiro de 1 à 5';
};

const validateTalkObj = (talk) => {
  try {
    const { rate, watchedAt } = talk;
    const typeRate = typeof rate !== 'number';
    const invalidRate = validateRate(rate);
    const invalidDate = validateDate(watchedAt);

    if (typeRate || !watchedAt) {
      return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
    }

    return invalidRate || invalidDate;
  } catch (error) {
    console.log(error);
    return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
  }
};

const validateAge = (age) => {
  if (!age) return 'O campo "age" é obrigatório';
  if (age < 18) return 'A pessoa palestrante deve ser maior de idade';

  return null;
};

const validateName = (name) => {
  if (!name) return 'O campo "name" é obrigatório';
  if (name.length < 3) return 'O "name" deve ter pelo menos 3 caracteres';

  return null;
};

const validateTalkerData = (talkerData) => {
  const { name, age, talk } = talkerData;

  const inValidName = validateName(name);
  const inValidAge = validateAge(age);
  const inValidTalk = validateTalkObj(talk);

  if (inValidName) throw customError(400, inValidName);
  if (inValidAge) throw customError(400, inValidAge);
  if (inValidTalk) throw customError(400, inValidTalk);
};

const createTalker = async (talkerData, savePath, talkerId = '') => {
  const talkersArray = await model.getAllTalkers(savePath);
  let newID = talkerId;

  if (!talkerId) {
    newID = Math.max(...talkersArray.map(({ id }) => id)) + 1;
  }

  const talkerObj = {
    id: parseInt(newID, 10),
    ...talkerData,
  };

  model.appendTextData(savePath, talkerObj);

  return talkerObj;
};

module.exports = {
  validateLoginData,
  validateToken,
  validateTalkerData,
  createTalker,
};
