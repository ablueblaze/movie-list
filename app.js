// todo list:
/*
-   Rethink all the file names
-   Incorporate exception handling in the api-tools
-   Fade in/out default content 
-   Fade in/out movie cards on switching pages
-   Enable the toggling of the watchList buttons
-   Set up the search bar as a small form
-   Re-organize the css
-   On search, clear search field
-   Implement no results
-   Clean up the flipPage function
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

const mainContent = document.getElementById('main-content');
const navBtn = document.getElementById('navigation-btn');
const searchBtn = document.getElementById('search-btn');

// todo transition cards
// todo Clean this up!!!
const flipPage = (pageName) => {
    const findValues = pageValues('find');
    const watchValues = pageValues('watch');
    const title = document.getElementById('title');
    const searchBarEl = document.getElementById('search-bar');

    title.style.transition = 'opacity 600ms';
    navBtn.style.transition = 'opacity 600ms';

    mainContent.innerHTML = '';

    if (pageName !== 'find') {
        fadeTransition(title, findValues.title);
        fadeTransition(navBtn, findValues.navBtn);
        navBtn.dataset.page = 'find';
        setTimeout(() => {
            searchBarEl.classList.remove('hidden');
        }, 600);
        mainContent.innerHTML = getSearchDefaultHtml();
        return;
    }
    fadeTransition(title, watchValues.title);
    fadeTransition(navBtn, watchValues.navBtn);
    navBtn.dataset.page = 'watch';
    searchBarEl.classList.add('hidden');
    if (watchList.length === 0) {
        // todo set transition on default html
        mainContent.innerHTML = getWatchListDefaultHtml();
        return;
    }
    mainContent.innerHTML = watchList.join('');
};

// event listeners:

navBtn.addEventListener('click', (e) => {
    flipPage(e.target.dataset.page);
});

searchBtn.addEventListener('click', async () => {
    const searchValue = document.getElementById('search-input').value;
    activeSearchResults = await movieSearch.byTitle(searchValue);
    displaySearchResults(mainContent, activeSearchResults);
});

mainContent.addEventListener('click', (e) => {
    const target = e.target;
    if (target.dataset.watchListBtn) {
        watchList.push(
            activeSearchResults
                .find(({ id }) => id === target.dataset.watchListBtn)
                .getCardHtml()
        );
    }
});
