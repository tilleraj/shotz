import moviesData from '../../helpers/data/moviesData';
import util from '../../helpers/util';

import './movies.scss';

let movies = [];

const domStringBuilder = (moviesToPrint) => {
  let domString = '';
  domString += '<h2>Movies:</h2>';
  domString += '<div id="movies" class="row">';
  moviesToPrint.forEach((movie) => {
    domString += '<div class="col-12 col-sm-6 col-md-4 col-lg-3">';
    domString += `  <div id="${movie.id}" class="card movie">`;
    domString += '    <div class="card-header">';
    domString += `      ${movie.name}`;
    domString += '    </div>';
    domString += '    <div class="card-body">';
    domString += `      <p class="card-text genre">${movie.genre}</p>`;
    domString += `      <p class="card-text release-date">${movie.releaseDate}</p>`;
    domString += `      <p class="card-text">${movie.description}</p>`;
    domString += `      <p class="card-text">${movie.locations.length} locations</p>`;
    domString += '    </div>';
    domString += '  </div>';
    domString += '</div>';
  });
  domString += '</div>';
  util.printToDom('movies', domString);
};

const filteredMovies = (movieId) => {
  const selectedMovie = movies.filter(x => x.id === movieId);
  domStringBuilder(selectedMovie);
};

const initializeMovies = () => {
  moviesData.getMoviesData()
    .then((response) => {
      const movieResults = response.data.movies;
      movies = movieResults;
      domStringBuilder(movies);
      const domMovies = Array.from(document.getElementsByClassName('movie'));
      domMovies.forEach((movie) => {
        movie.addEventListener('click', () => {
          filteredMovies(movie.id);
        });
      });
    })
    .catch(error => console.error(error));
};

export default { initializeMovies };
