const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateUser, validateLogin } = require('../middlewares/validations');
const { createUser, login } = require('../controllers/users');

// роуты, не требующие авторизации,
// например, регистрация и логин
router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

// авторизация
router.use(auth);

// роуты, которым авторизация нужна
router.use('/', users);
router.use('/', movies);

router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
