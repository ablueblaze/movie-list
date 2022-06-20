class Movie{
    constructor(title, ratings, runTime, genre, description, poster, saved = false) {
        this.title = title
        this.rating = ratings
        this.runTime = runTime
        this.genre = genre
        this.description = description
        this.poster = poster
        this.saved = saved
    }
    getCardHtml() {
        return `
            <div class="card flex">
                <div class="card-body flex">
                    <div class="sub-title flex">
                        <h3>${this.title}</h3>
                        <p class="rating flex">
                            <img    src="./assets/star-icon.png" 
                                    alt="star icon">
                                    ${this.rating}
                        </p>
                    </div>
                    <div class="movie-data flex">
                        <p class="play-time">${this.runTime}</p>
                        <p class="genre-list">${this.genre}</p>
                        ${this.getWatchListHtml()}
                    </div>
                    <div class="description">${this.description}</div>
                </div>
                <img class="movie-img" src="${this.poster}" alt="movie poster">
            </div>
        
        `
    }
    getWatchListHtml() {
        let symbol = "./assets/plus-icon.png"
        let word = "Add"
        if (this.saved) {
            symbol = "./assets/minus-icon.png"
            word = "Remove"
        }
        return `
            <button class="watch-list-btn flex" data-watch-list-btn="${this.title}">
                <img src=${symbol} alt="plus symbol"> 
                ${word} to watchlist
            </button> 
        `
    }


}

export default Movie;


// Actors: "Harrison Ford, Rutger Hauer, Sean Young"
// Awards: "Nominated for 2 Oscars. 12 wins & 19 nominations total"
// BoxOffice: "$32,914,489"
// Country: "United States"
// DVD: "30 Oct 2001"
// Director: "Ridley Scott"
// Genre: "Action, Drama, Sci-Fi"
// Language: "Low German, English, German, Cantonese, Japanese, Hungarian, Arabic, Korean"
// Metascore: "84"
// Plot: "A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator."
// Poster: "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
// Production: "N/A"
// Rated: "R"
// Ratings: (3) [{…}, {…}, {…}]
// 0: {Source: 'Internet Movie Database', Value: '8.1/10'}
// 1: {Source: 'Rotten Tomatoes', Value: '89%'}
// 2: {Source: 'Metacritic', Value: '84/100'}
// length: 3
// Released: "25 Jun 1982"
// Response: "True"
// Runtime: "117 min"
// Title: "Blade Runner"
// Type: "movie"
// Website: "N/A"
// Writer: "Hampton Fancher, David Webb Peoples, Philip K. Dick"
// Year: "1982"
// imdbID: "tt0083658"
// imdbRating: "8.1"
// imdbVotes: "750,069"