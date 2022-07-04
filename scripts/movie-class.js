class Movie {
  constructor(
    title,
    ratings,
    runTime,
    genre,
    description,
    poster,
    id,
  ) {
    this.title = title;
    this.rating = ratings;
    this.runTime = runTime;
    this.genre = genre;
    this.description = description;
    this.poster = poster;
    this.id = id;
  }
  getCardHtml(symbol) {
    return `
      <div class="card flex" data-card-id="${this.id}">
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
                ${this.getWatchListHtml(symbol)}
            </div>
          </div>
          <div class="description">${this.description}</div>
        </div>
        <img class="movie-img" src="${this.poster}" alt="movie poster" />
      </div>
    `;
  }

  // todo get this functionality up and going
  getWatchListHtml(symbol) {
    let symbolIcon = './assets/plus-icon.png';
    let word = 'add';
    if (symbol === 'minus') {
      symbolIcon = './assets/minus-icon.png';
      word = 'remove';
    }
    return `
      <button
        class="watch-list-btn flex"
        data-action="${word}"
        data-watch-list-btn-id="${this.id}"
      >
        <img src="${symbolIcon}" alt="plus symbol" />
        ${word} to watchlist
      </button>
    `;
  }
}

export default Movie;
