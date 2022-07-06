const getNoResultsHtml = () => {
  return `
    <p class="no-result"> 
      Unable to find what you’re looking for. Please try another search.
    </p>
  `;
};

const getSearchDefaultHtml = () => {
  return `
    <div class="place-holder-content flex">
      <img src="./assets/film-icon.png" alt="film icon">
      <p id="add-movies" class="add-movies">Start exploring</p>
    </div>
    `;
};

const getWatchListDefaultHtml = () => {
  return `
    <div class="place-holder-content flex">
      <p class="place-holder-text">
        Your watchlist is looking a little empty...
      </p>
      <button
        id="empty-watch-btn"
        class="watch-list-btn flex"
        data-page="watch">
        <img src="../assets/plus-icon.png" alt="plus symbol" />
        Add Movies
      </button>
    </div>
  `;
};

const displaySearchResults = async (placement, results) => {
  placement.innerHTML = '';
  const movies = await results;
  if (movies) {
    for (let i of movies) {
      placement.insertAdjacentHTML('beforeend', i.getCardHtml('plus'));
    }
    return;
  }
  placement.innerHTML = getNoResultsHtml();
};

const pageTransition = (() => {
  const searchBarEl = document.getElementById('search-bar');

  const pageValues = (pageName) => {
    if (pageName === 'find') {
      return {
        title: 'Find your film',
        navBtn: 'My Watchlist',
      };
    }
    return {
      title: 'My Watchlist',
      navBtn: 'Search for movies',
    };
  };

  const fade = (element, inOut, time) => {
    element.style.transition = `opacity ${time}ms`;
    if (inOut === 'in') {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
      return;
    }
    element.classList.remove('fade-in');
    element.classList.add('fade-out');
  };

  const populateWatchList = (watchList) => {
    let watchListHtml = '';
    for (let i of watchList) {
      watchListHtml += i.getCardHtml('minus');
    }
    return watchListHtml;
  };

  const flipPage = (mainContent, element, pageName, watchList, time) => {
    const title = document.getElementById('title');
    const navBtn = document.getElementById('navigation-btn');
    let defaultHtml;
    let tempName = pageName;
    if (tempName === 'find') {
      tempName = 'watch';
      defaultHtml = getWatchListDefaultHtml();
    } else {
      tempName = 'find';
      defaultHtml = getSearchDefaultHtml();
    }
    const tempValues = pageValues(tempName);

    // fade out the old page
    fade(element, 'out', time);

    // fade in the new page
    setTimeout(() => {
      title.textContent = tempValues.title;
      navBtn.textContent = tempValues.navBtn;
      mainContent.innerHTML = defaultHtml;
      if (tempName === 'watch') {
        searchBarEl.classList.add('hidden');
        if (watchList.length !== 0) {
          mainContent.innerHTML = populateWatchList(watchList);
        }
      } else {
        searchBarEl.classList.remove('hidden');
      }
      fade(element, 'in', time);
    }, time);
  };

  return { flipPage };
})();

export {
  pageTransition,
  getNoResultsHtml,
  displaySearchResults,
  getSearchDefaultHtml,
  getWatchListDefaultHtml,
};
