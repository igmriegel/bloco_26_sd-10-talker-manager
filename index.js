const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const talkerRouter = require('./routes/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use('/talker', talkerRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(middlewares.errorMiddleware);

app.listen(PORT, () => {
  console.log('It is alive');
});
