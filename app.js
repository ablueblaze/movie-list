// todo: rename resources to something more applicable

import Movie from './scripts/movie-class.js';
import {
    searchApiStr,
    movieDataApiStr,
    getFindPageValues,
    getWatchListValues,
    getNoResultsHtml,
    getSearchDefaultHtml,
} from './scripts/resources.js';

let watchList = []

const validateData = (movieData) => {
    let validData = [];
    let pass = false;
    for (let i of movieData) {
        // todo: do I need the key here?
        for (let [key, value] of Object.entries(i)) {
            if (value === 'N/A') {
                pass = true;
                continue;
            }
        }
        if (pass) continue;
        validData.push(i);
    }
    return validData;
};

const getSearchResults = async (title) => {
    const resp = await fetch(searchApiStr(title));
    const searchData = await resp.json();
    // todo: incorporate exception handling around here
    if (searchData.Error) {
        return false;
    }
    const validSearch = validateData(searchData.Search);
    return validSearch;
};

const getMovieData = async (title, year) => {
    const resp = await fetch(movieDataApiStr(title, year));
    const movieData = await resp.json();
    return movieData;
};

const makeMovieObject = (movieData) => {
    return new Movie(
        movieData.Title,
        movieData.Ratings[0].Value,
        movieData.Runtime,
        movieData.Genre,
        movieData.Plot,
        movieData.Poster
    );
};

const getMovieObjects = async (searchData) => {
    let movieObjects = [];
    for (let i = 0; i < searchData.length; i++) {
        const movieData = await getMovieData(
            searchData[i].Title,
            searchData[i].Year
        );
        const newMovie = makeMovieObject(movieData);
        movieObjects.push(newMovie);
    }
    return movieObjects;
};

const searchWrapper = async (placement, title) => {
    const searchData = await getSearchResults(title);
    placement.innerHTML = '';
    if (searchData) {
        const movieObjects = await getMovieObjects(searchData);
        for (let i of movieObjects) {
            placement.insertAdjacentHTML('beforeend', i.getCardHtml());
        }
        return;
    }
    placement.innerHTML = getNoResultsHtml()
};

const mainContent = document.getElementById('main-content');
const navBtn = document.getElementById('navigation-btn')

// searchWrapper(mainContent, 'rango');

//! working area //

const flipPage = (pageName) => {
    const title = document.getElementById('title')
    const searchBarEl = document.getElementById('search-bar')

    const find = getFindPageValues()
    const watch = getWatchListValues()

    mainContent.innerHTML = ''

    if (pageName !== 'find') {
        title.textContent = find.title
        navBtn.textContent = find.navBtn
        navBtn.dataset.page = 'find'
        searchBarEl.classList.remove('hidden')
        mainContent.innerHTML = getSearchDefaultHtml()
        return;
    }
    title.textContent = watch.title
    navBtn.textContent = watch.navBtn
    navBtn.dataset.page = 'watch'
    searchBarEl.classList.add('hidden')
    mainContent.innerHTML = watchList.join('')
}

navBtn.addEventListener('click', (e) => {
    // todo Think of a better way to differentiat these two pages
    flipPage(e.target.dataset.page)
})