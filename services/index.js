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

module.exports = {
  validateLoginData,
};
