// todo list:
/*
- Full refactoring
- Fix the watch list problems
  - Storing and removing on click
  - Removing from screen
- Enable the toggling of the watchList buttons
- Remove movie from watchList on click
- Re-organize the css
- Rethink all the file names

I feel like the transition isn't smooth because I have it firing in a bunch
of different places, and not just one transition happening.

Amusing idea:
  When flipping the page, have the elements spin in place and return changed
*/

import movieSearch from './scripts/api-tools.js';
import {
  pageTransition,
  displaySearchResults,
} from './scripts/dom-tools.js';

let watchList = [];
let activeSearchResults = [];

const navBtn = document.getElementById('navigation-btn');
const searchForm = document.getElementById('search-form');
const mainContent = document.getElementById('main-content');

// event listeners:

// Toggles the page between find and watch
navBtn.addEventListener('click', (e) => {
  const slidingEls = document.querySelectorAll('.slider');
  const pageName = e.target.dataset.page
  console.log(e.target.dataset.page)
  slidingEls.forEach((el) =>
    pageTransition.flipPage(mainContent, el, pageName, watchList, 600)
  );
  if (pageName === 'find') {
    e.target.dataset.page = 'watch'
    return 
  }
  e.target.dataset.page = 'find'
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  activeSearchResults = await movieSearch.byTitle(
    document.getElementById('search-input').value
  );
  displaySearchResults(mainContent, activeSearchResults);
  searchForm.reset();
});

// Watch for the "Add/Remove to/from watchlist" buttons
// Watch for the "No current movies" button on watch list page
mainContent.addEventListener('click', (e) => {
  const target = e.target;
  console.log(target);

  // Add movie to watch list
  if (target.dataset.watchListBtn) {
    if (target.dataset.action === 'add') {
      watchList.push(activeSearchResults.find(
        ({ id }) => id === target.dataset.watchListBtn
      ));
    }
  }

  // todo: Remove card from watch List
});
