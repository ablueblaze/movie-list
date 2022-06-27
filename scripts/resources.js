const searchApiStr = (title) => {
    return `http://www.omdbapi.com/?i=tt3896198&apikey=919de648&s=${title}&type=movie`;
};

const movieDataApiStr = (title, year) => {
    return `http://www.omdbapi.com/?i=tt3896198&apikey=919de648&t=${title}&y=${year}&type=movie`;
};

const getFindPageValues = () => {
    return {
        title: 'Find your film',
        navBtn: 'My Watchlist',
    };
};

const getWatchListValues = () => {
    return {
        title: 'My Watchlist',
        navBtn: 'Search for movies',
    };
};

const getNoResultsHtml = () => {
    return `
        <p class="no-result"> Unable to find what you’re looking for. Please try another search.</p>
    `;
};

const getSearchDefaultHtml = () => {
    return `
        <div class="place-holder-content flex">
            <img src="./assets/film-icon.png" alt="film icon">
            <p class="place-holder-text">Start exploring</p>
        </div>
    `;
};

export {
    searchApiStr,
    movieDataApiStr,
    getFindPageValues,
    getWatchListValues,
    getNoResultsHtml,
    getSearchDefaultHtml,
};
