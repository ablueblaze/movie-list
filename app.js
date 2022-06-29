// todo list:
/*
-   Enable the toggling of the watchList buttons
-   On search, clear search field
-   Fade in/out default content 
-   Fade in/out movie cards on switching pages
-   Re-organize the css
-   Clean up the flipPage function
-   Rethink all the file names
*/

import movieSearch from './scripts/api-tools.js';
import { pageValues } from './scripts/misc-tools.js';
import {
  fadeTransition,
  getNoResultsHtml,
  displaySearchResults,
  getSearchDefaultHtml,
  getWatchListDefaultHtml,
} from './scripts/dom-tools.js';

let watchList = [];
let activeSearchResults = [];

const navBtn = document.getElementById('navigation-btn');
const searchForm = document.getElementById('search-form');
const mainContent = document.getElementById('main-content');

// todo transition cards
// todo Clean this up!!!
const flipPage = (pageName) => {
  const title = document.getElementById('title');
  const searchBarEl = document.getElementById('search-bar');

  title.style.transition = 'opacity 600ms';
  navBtn.style.transition = 'opacity 600ms';

  mainContent.innerHTML = '';

  if (pageName !== 'find') {
    const findValues = pageValues('find');
    fadeTransition(title, findValues.title);
    fadeTransition(navBtn, findValues.navBtn);
    navBtn.dataset.page = 'find';
    setTimeout(() => {
      searchBarEl.classList.remove('hidden');
    }, 600);
    mainContent.innerHTML = getSearchDefaultHtml();
    return;
  }
  const watchValues = pageValues('watch');
  fadeTransition(title, watchValues.title);
  fadeTransition(navBtn, watchValues.navBtn);
  navBtn.dataset.page = 'watch';
  searchBarEl.classList.add('hidden');
  if (watchList.length === 0) {
    mainContent.innerHTML = getWatchListDefaultHtml();
    return;
  }
  mainContent.innerHTML = watchList.join('');
};

// event listeners:

navBtn.addEventListener('click', (e) => {
  flipPage(e.target.dataset.page);
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchValue = document.getElementById('search-input').value;
  activeSearchResults = await movieSearch.byTitle(searchValue);
  displaySearchResults(mainContent, activeSearchResults);
  searchForm.reset()
});

mainContent.addEventListener('click', (e) => {
  const target = e.target;
  console.log(target)
  if (target.dataset.watchListBtn) {
    let tempMovie;
    watchList.push(
      tempMovie = activeSearchResults
        .find(({ id }) => id === target.dataset.watchListBtn)
        .getCardHtml()
    );
  }
  if (target.id === 'empty-watch-btn') {
    flipPage('watch')
  }
});
