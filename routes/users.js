const routerUser = require('express').Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');
const { validateUserUpdate } = require('../middlewares/validations');

routerUser.get('/users/me', getCurrentUser);
routerUser.patch('/users/me', validateUserUpdate, updateUserInfo);

module.exports = routerUser;
