const routerUser = require('express').Router();

const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');

routerUser.get('/users/me', getCurrentUser);
routerUser.patch('/users/me', updateUserInfo);

module.exports = routerUser;
