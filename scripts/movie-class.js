class Movie {
  constructor(
    title,
    ratings,
    runTime,
    genre,
    description,
    poster,
    id,
    saved = false
  ) {
    this.title = title;
    this.rating = ratings;
    this.runTime = runTime;
    this.genre = genre;
    this.description = description;
    this.poster = poster;
    (this.id = id), (this.saved = saved);
  }
  getCardHtml() {
    return `
          <div class="card flex">
            <div class="card-body flex">
              <div class="sub-title flex">
                <h3>${this.title}</h3>
                <p class="rating flex">
                  <img src="./assets/star-icon.png" alt="star icon" />
                  <span class="rating-num">${this.rating}</span>
                </p>
              </div>
              <div class="movie-data flex">
                <p class="play-time">${this.runTime}</p>
                <p class="genre-list">${this.genre}</p>
                <div  
                  class="watch-list-btn-container"
                  data-movie-id="${this.id}">
                    ${this.getWatchListHtml()}
                </div>
              </div>
              <div class="description">${this.description}</div>
            </div>
            <img class="movie-img" src="${this.poster}" alt="movie poster" />
          </div>
        `;
  }
  // todo get this functionality up and going
  getWatchListHtml() {
    let symbol = './assets/plus-icon.png';
    let word = 'Add';
    if (this.saved) {
      symbol = './assets/minus-icon.png';
      word = 'Remove';
    }
    return `
      <button class="watch-list-btn flex" data-watch-list-btn="${this.id}">
        <img src=${symbol} alt="plus symbol"> 
        ${word} to watchlist
      </button> 
    `;
  }
}

export default Movie;
