// todo list:
/*
- Documentation
- Full refactoring
- Cause the button on the find page to toggle after click
- Re-organize the css
- Rethink all the file names
- Research how to hide api code
*/

import movieSearch from './scripts/api-tools.js';
import { pageTransition, displaySearchResults } from './scripts/dom-tools.js';

let watchList = [];
let activeSearchResults = [];

const navBtn = document.getElementById('navigation-btn');
const searchForm = document.getElementById('search-form');
const mainContent = document.getElementById('main-content');

// todo: Consider name change
const pageChangeWrapper = (pageName, target) => {
  const slidingEls = document.querySelectorAll('.slider');
  slidingEls.forEach((el) =>
    pageTransition.flipPage(mainContent, el, pageName, watchList, 600)
  );
  if (pageName === 'find') {
    target.dataset.page = 'watch';
    return;
  }
  target.dataset.page = 'find';
};

// event listeners:

// Toggles the page between find and watch using nav btn
navBtn.addEventListener('click', (e) => {
  pageChangeWrapper(e.target.dataset.page, e.target);
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  activeSearchResults = await movieSearch.byTitle(
    document.getElementById('search-input').value.trim().replaceAll(' ', '+')
  );
  displaySearchResults(mainContent, activeSearchResults);
  searchForm.reset();
});

// Watch for the "Add/Remove to/from watch list" buttons
mainContent.addEventListener('click', (e) => {
  const target = e.target;

  if (target.dataset.watchListBtnId) {
    const movieId = target.dataset.watchListBtnId;

    // Add movie to watch list
    if (target.dataset.action === 'add') {
      watchList.push(activeSearchResults.find(({ id }) => id === movieId));
      return;
    }

    // Removes movie from watch list
    const movieToRemove = watchList.find(({ id }) => id === movieId);
    const movieIndex = watchList.indexOf(movieToRemove);
    const movieCard = document.querySelector(`[data-card-id="${movieId}"]`);
    watchList.splice(movieIndex, 1);
    movieCard.innerHTML = '';
    movieCard.remove();
  }

  // Switch to find move page from empty watch list btn
  if (target.id === 'empty-watch-btn') {
    navBtn.dataset.page = 'find';
    pageChangeWrapper(e.target.dataset.page, e.target);
  }
});

/*
Questions:
  1.  The use of modules in industry code?
    I like to use them because it feels like it keeps the code cleaner and 
    easier to read, but how often does that layout get used in industry?
  2.  I know that there is design pattern called "Model, view, controller."
      And I have been told that my coding style is a good representation of
      that pattern. Is this a pattern that I should keep using in my projects,
      or would it be better to try other methods?
*/