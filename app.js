const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const users = require('./routes/users');
const movies = require('./routes/movies');
const auth = require('./middlewares/auth');
require('dotenv').config();

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(auth);

app.use('/', users);
app.use('/', movies);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: `На сервере произошла ошибка: ${err.message}` });
  next();
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
