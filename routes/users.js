const routerUser = require('express').Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');
const { validateUserUpdate, validateUserId } = require('../middlewares/validations');

routerUser.get('/users/me', validateUserId, getCurrentUser);
routerUser.patch('/users/me', validateUserUpdate, updateUserInfo);

module.exports = routerUser;
