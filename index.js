const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const talkerRouter = require('./routes/talkerRouter');
const loginRouter = require('./routes/loginRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', loginRouter);
app.use('/talker', talkerRouter);
app.use(middlewares.errorMiddleware);

app.listen(PORT, () => {
  console.log('It is alive');
});
