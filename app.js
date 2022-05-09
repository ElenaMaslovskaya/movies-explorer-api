const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DB_ADDRESS_DEV } = require('./utils/config');
const limiter = require('./middlewares/limiter');
const NotFoundError = require('./errors/NotFoundError');
const router = require('./routes/index');
require('dotenv').config();

const { PORT = 3001, NODE_ENV, DB_ADDRESS_PROD } = process.env;

const app = express();

app.use(cors());

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS_PROD : DB_ADDRESS_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// подключаем логгер запросов
app.use(requestLogger);

app.use(helmet());
app.use(bodyParser.json());

// подключаем rate-limiter
app.use(limiter);
app.use('/', router);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(() => {
  throw new NotFoundError('Страница не найдена');
});

// подключаем логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: 'На сервере произошла ошибка' });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
