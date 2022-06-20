import Movie from "./scripts/movie-class.js"

const getMovie = async (movieTitle) => {
    const resp = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=919de648&t=${movieTitle}`)
    const data = await resp.json()
    console.log(data)
    return new Movie(
        data.Title,
        data.Ratings[0].Value,
        data.Runtime,
        data.Genre,
        data.Plot,
        data.Poster
    )
}

const mainContent = document.getElementById('main-content')

const postMovie =  async (placement, movie) => {
    placement.innerHTML = await movie.getCardHtml()
}

// postMovie(mainContent, await getMovie('buddy') )