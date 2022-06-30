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
      placement.insertAdjacentHTML('beforeend', i.getCardHtml('plus'));
    }
    return;
  }
  placement.innerHTML = getNoResultsHtml();
};

// applies a timeout to the given element and causes it to fade out then in.
const fadeTransitionEl = (element) => {
  element.style.transition = `opacity 600ms`;
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.opacity = 1;
  }, 600);
};

// waits for a set time to change the text content of a given element
const transitionText = (element, content) => {
  setTimeout(() => {
    element.textContent = content;
  }, 600);
};

const transitionInnerHtml = (target, newHtml) => {
  setTimeout(() => {
    target.innerHTML = newHtml;
  }, 600);
};

const textTransitionWrap = (pageName) => {
    const title = document.getElementById('title');
    const navBtn = document.getElementById('navigation-btn');
    const tempValues = pageValues(pageName);
    transitionText(title, tempValues.title)
    transitionText(navBtn, tempValues.navBtn);
    navBtn.dataset.page = pageName;
}

const flipPage = (mainContent, pageName, watchList) => {
  const slider = document.querySelectorAll('.slider')
  const searchBarEl = document.getElementById('search-bar');

  slider.forEach((el) => el.style.transition = 'opacity 600ms')
  mainContent.innerHTML = '';

  slider.forEach((el) => fadeTransitionEl(el))
  // fadeTransitionEl(slider);

  if (pageName !== 'find') {
    textTransitionWrap('find')
    transitionInnerHtml(mainContent, getSearchDefaultHtml())
    setTimeout(() => {
      searchBarEl.classList.remove('hidden');
    }, 600);
    // mainContent.innerHTML = getSearchDefaultHtml();
    return;
  }
  textTransitionWrap('watch')
  searchBarEl.classList.add('hidden');
  if (watchList.length === 0) {
    transitionInnerHtml(mainContent, getWatchListDefaultHtml())
    // mainContent.innerHTML = getWatchListDefaultHtml();
    return;
  }
  transitionInnerHtml(mainContent, watchList.join(''))
  mainContent.innerHTML = watchList.join('');
};

export {
  flipPage,
  fadeTransitionEl,
  transitionText,
  getNoResultsHtml,
  displaySearchResults,
  getSearchDefaultHtml,
  getWatchListDefaultHtml,
};
