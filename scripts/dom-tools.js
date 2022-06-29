import { pageValues } from './misc-tools.js';

const getNoResultsHtml = () => {
  return `
    <p class="no-result"> 
      Unable to find what you’re looking for. Please try another search.
    </p>
  `;
};

const getSearchDefaultHtml = () => {
  return `
    <div class="place-holder-content flex">
      <img src="./assets/film-icon.png" alt="film icon">
      <p id="add-movies" class="add-movies">Start exploring</p>
    </div>
    `;
};

const getWatchListDefaultHtml = () => {
  return `
    <div class="place-holder-content flex">
      <p class="place-holder-text">
        Your watchlist is looking a little empty...
      </p>
      <button
        id="empty-watch-btn"
        class="watch-list-btn flex"
        data-page="watch">
        <img src="../assets/plus-icon.png" alt="plus symbol" />
        Add Movies
      </button>
    </div>
  `;
};

const displaySearchResults = async (placement, results) => {
  const movies = await results;
  placement.innerHTML = '';
  if (movies) {
    for (let i of movies) {
      placement.insertAdjacentHTML('beforeend', i.getCardHtml());
    }
    return;
  }
  placement.innerHTML = getNoResultsHtml();
};

// todo: how to make this more modular?
const fadeTransition = (element, content) => {
  element.style.transition = `opacity 600ms`;
  element.style.opacity = 0;
  setTimeout(() => {
    element.textContent = content;
    element.style.opacity = 1;
  }, 600);
};

export {
  fadeTransition,
  getNoResultsHtml,
  displaySearchResults,
  getSearchDefaultHtml,
  getWatchListDefaultHtml,
};
