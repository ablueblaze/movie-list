import { makeMovieObject } from './misc-tools.js';

const movieSearch = (() => {
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

    // get the search formatted data from the api
    const getSearchResults = async (title) => {
        const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=919de648&s=${title}&type=movie`);
        const searchData = await resp.json();
        // todo: incorporate exception handling around here
        if (searchData.Error) {
            return false;
        }
        const validSearchData = validateData(searchData.Search);
        return validSearchData;
    };

    // get the in-depth data from the api
    //! Couldn't get the id to search, had to use this method
    const getMovieData = async (title, year) => {
        const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=919de648&t=${title}&y=${year}&type=movie`);
        const movieData = await resp.json();
        // todo: incorporate exception handling around here
        return movieData;
    };

    // the wrapper for getting all the in-depth data from the current search
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

    // search wrapper to convert
    const byTitle = async (title) => {
        const searchData = await getSearchResults(title);
        if (searchData) {
            const movieObjects = await getMovieObjects(searchData);
            return movieObjects;
        }
        return false;
    };

    return {byTitle};
})();

export default movieSearch