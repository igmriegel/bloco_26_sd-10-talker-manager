const { randomBytes } = require('crypto');

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

const validateLoginData = (email, pass, tokenSize) => {
  try {
    validateEmail(email);
    validatePass(pass);
  } catch (e) {
    throw new Error(e.message);
  }

  return randomBytes(tokenSize).toString('hex');
};

module.exports = {
  validateLoginData,
};
