import Movie from './scripts/movie-class.js';

const getSearchResults = async (title) => {
    const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=919de648&s=${title}&type=movie`)
    const searchData = await resp.json()
    return searchData
}

const getMovieData = async (title, year) => {
    const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=919de648&t=${title}&y=${year}&type=movie`)
    const movieData = await resp.json()
    return movieData
}

const makeMovieObject = (movieData) => {
    return new Movie(
        movieData.Title,
        //todo figure out the ratings problem
        // movieData.Ratings[0].Value,
        movieData.Runtime,
        movieData.Genre,
        movieData.Plot,
        movieData.Poster
    )
}

const getMovieObjects = async (searchData) => {
    let movieObjects = []
    for (let i = 0; i < searchData.length; i++) {
        const movieData = await getMovieData(searchData[i].Title, searchData[i].Year)
        const newMovie = makeMovieObject(movieData)
        movieObjects.push(newMovie)
        console.log(newMovie)
    }
    return movieObjects
}

const displayResults = (placement, movieObjects) => {
    placement.innerHTML = ''
    for (let i of movieObjects) {
        placement.insertAdjacentHTML('beforeend', i.getCardHtml())
    }
}

const searchWrapper = async (placement, title) => {
    const searchData = await getSearchResults(title)
    const movieObjects = await getMovieObjects(searchData.Search)
    displayResults(placement, movieObjects)
}

const mainContent = document.getElementById('main-content')

searchWrapper(mainContent, 'rango')

//! working area //

function validateData(movieData) {
    
}