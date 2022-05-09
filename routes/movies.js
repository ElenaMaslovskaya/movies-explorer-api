const routerMovie = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/validations');

routerMovie.get('/movies', getMovies);
routerMovie.post('/movies', validateMovie, createMovie);
routerMovie.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = routerMovie;
