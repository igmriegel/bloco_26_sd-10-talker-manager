const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.route('/talker')
  .get(rescue(middlewares.getAllTalkers));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('It is alive');
});
