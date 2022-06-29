import Movie from './movie-class.js';

const pageValues = (pageName) => {
  if (pageName === 'find') {
    return {
      title: 'Find your film',
      navBtn: 'My Watchlist',
    };
  }
  return {
    title: 'My Watchlist',
    navBtn: 'Search for movies',
  };
};

const makeMovieObject = (movieData) => {
  return new Movie(
    movieData.Title,
    movieData.Ratings[0].Value,
    movieData.Runtime,
    movieData.Genre,
    movieData.Plot,
    movieData.Poster,
    movieData.imdbID
  );
};

export { pageValues, makeMovieObject };
