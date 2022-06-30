// todo list:
/*
- Full refactoring
- Enable the toggling of the watchList buttons
- Remove movie from watchList on click
- Re-organize the css
- Fix the fade functionality  
  - Clean up the flipPage function
- Rethink all the file names

I feel like the transition isn't smooth because I have it firing in a bunch
of different places, and not just one transition happening.

Amusing idea:
  When flipping the page, have the elements spin in place and return changed
*/

import movieSearch from './scripts/api-tools.js';
import { flipPage, displaySearchResults } from './scripts/dom-tools.js';

let watchList = [];
let activeSearchResults = [];

const navBtn = document.getElementById('navigation-btn');
const searchForm = document.getElementById('search-form');
const mainContent = document.getElementById('main-content');

// event listeners:
navBtn.addEventListener('click', (e) => {
  flipPage(mainContent, e.target.dataset.page, watchList);
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchValue = document.getElementById('search-input').value;
  activeSearchResults = await movieSearch.byTitle(searchValue);
  displaySearchResults(mainContent, activeSearchResults);
  searchForm.reset();
});

mainContent.addEventListener('click', (e) => {
  const target = e.target;
  console.log(target);
  if (target.dataset.watchListBtn) {
    if (target.dataset.action === 'add') {
      const tempMovie = activeSearchResults
          .find(({ id }) => id === target.dataset.watchListBtn)
      watchList.push(tempMovie.getCardHtml('minus'))
    } //else {
    //   const tempMovie = watchList
    //       .find(({ id }) => id === target.dataset.watchListBtn)
    //   watchList.splice(tempMovie.getCardHtml('plus'))

    // }

  }
  if (target.id === 'empty-watch-btn') {
    const watchListHtml = watchList.map(movie => map.getCardHtml('minus'))
    flipPage(mainContent, 'watch', watchListHtml.join(''));
  }
});
