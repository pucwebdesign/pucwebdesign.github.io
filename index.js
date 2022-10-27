/**
 * This async function searches and returns to us movies based on the parameters we set
 * @param {*} queryParameter The dinamic parameter that will be used to search the TMDB API
 * @returns {object} Object containing movie or movies information
 */
const fetchLatestMovies = async (queryParameter) => {
  const getNewMovies = await fetch(
    `https://api.themoviedb.org/3/movie/${queryParameter}?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR&page=1`,
    { mode: "cors" }
  );

  const post = await getNewMovies.json();
  return post;
};

/**
 * Javascript function for changing the video when selected
 * @param {*} videoId The container unique id
 */
const changeVideo = (videoId) => {
  // DESELECT SELECTED BUTTON
  const deselectButton = document.getElementsByClassName(
    "latest__movies__list__item__selected"
  );
  deselectButton[0]?.classList.remove("latest__movies__list__item__selected");

  // SELECT NEW BUTTON
  const selectButton = document.getElementById(`item${videoId}`);
  selectButton.classList.add("latest__movies__list__item__selected");

  // RENDER OTHER VIDEO
  const iframeElement = document.getElementById("main__movie__trailer");
  iframeElement.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  iframeElement.pause();
};

/**
 * Format date to a PT_BR format
 * @param {Date} dateToFormat
 * @returns {String} date in the br format
 */
const formatDate = (dateToFormat) => {
  const data = new Date(dateToFormat);
  const dataFormatada =
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
  return dataFormatada;
};

/**
 * Function for rendering the popular movies fetched from TMDB API
 * And inserts directly on the DOM
 * @param {*} popularList List of movies that are popular on TMBD
 */
const renderPopularMovies = (popularList) => {
  for (let i = 0; i < popularList.results.length; i++) {
    // GET REFERENCE DIV
    const popularDiv = document.getElementById("popular__movie");

    // ADD MOVIE POSTER TO DIV
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("relative__pos");
    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500/${popularList.results[i]?.poster_path}`;
    movieDiv.append(moviePoster);

    // ADD ANOTHER DIV WITH MORE MOVIE INFORMATION
    const gridMovieInfo = document.createElement("div");
    gridMovieInfo.classList.add("grid__movie__information");

    // ADD TITLE AND REVIEW TO DIV
    const movieName = document.createElement("h3");
    movieName.innerHTML = `${popularList.results[i]?.title}`;
    const movieVoteAverage = document.createElement("h3");
    movieVoteAverage.innerHTML = `${popularList.results[i]?.vote_average}`;
    gridMovieInfo.append(movieName, movieVoteAverage);

    // ADD MOVIE DATE
    const movieDate = document.createElement("span");
    movieDate.innerHTML = `${formatDate(
      new Date(popularList.results[i]?.release_date)
    )}`;

    gridMovieInfo.append(movieDate);

    movieDiv.append(gridMovieInfo);

    const divShadow = document.createElement("div");
    divShadow.classList.add("responsive__video__shadow");
    movieDiv.append(divShadow);

    // LINK TO DETAILS PAGE
    const anchorToAnotherPage = document.createElement("a");
    anchorToAnotherPage.setAttribute(
      "href",
      `/detalhes.html?movie=${popularList.results[i]?.id}`
    );

    anchorToAnotherPage.append(movieDiv);
    // ADD ANOTHER DIV TO THE REFERENCE
    popularDiv.append(anchorToAnotherPage);
  }
};

/**
 * Render Latest movies from TMBD API
 */
const renderAllMovies = async () => {
  const pageLoaded = document.getElementById("page__loaded");
  pageLoaded.classList.add("hidden");

  // We use the same function to get popular and new movies
  const getNewMovies = await fetchLatestMovies("now_playing");
  const getPopular = await fetchLatestMovies("popular");

  renderPopularMovies(getPopular);

  const mainGrid = document.createElement("div");
  mainGrid.classList.add("latest__movies__grid");

  const videoContainer = document.getElementById("latest__movies__trailers");
  const videoTrailerArray = [];

  for (let i = 0; i < getNewMovies?.results?.length; i++) {
    if (i == 0 || i == 1) {
      const firstTrailer = await fetchLatestMovies(
        `${getNewMovies?.results[i].id}/videos`
      );

      // We had to remove this key manually since it's not working
      if (firstTrailer?.results[i]?.key !== "InhVSLbZU9w") {
        const iframe = document.createElement("iframe");
        iframe.setAttribute("id", "main__movie__trailer");
        iframe.setAttribute("allowfullscreen", "true");
        iframe.setAttribute("allow", "autoplay");
        iframe.src = `https://www.youtube.com/embed/${firstTrailer?.results[0]?.key}`;
        videoContainer.append(iframe);
      }
    }

    const trailersFromEachMovie = await fetchLatestMovies(
      `${getNewMovies?.results[i].id}/videos`
    );

    if (trailersFromEachMovie?.results) {
      for (let x = 0; x < trailersFromEachMovie?.results?.length; x++) {
        // We had to remove this key manually since it's not working
        if (trailersFromEachMovie?.results[x]?.key === "InhVSLbZU9w") break;

        if (trailersFromEachMovie?.results[x]?.site === "YouTube") {
          videoTrailerObject = {
            ...getNewMovies?.results[i],
            youtubeKey: trailersFromEachMovie?.results[x]?.key,
          };
          videoTrailerArray.push(videoTrailerObject);
          break;
          // We use this break above, because after we fetch the first source
          // the rest of the payload is useless, so for performance reasons
          // we "break" it
        }
      }
    }
  }

  const latestMoviesList = document.createElement("div");
  latestMoviesList.setAttribute("id", "latest__movies__list");

  for (let i = 0; i < videoTrailerArray?.length; i++) {
    const latestMoviesListItem = document.createElement("div");

    if (i == 0) {
      latestMoviesListItem.classList.add(
        "latest__movies__list__item__selected"
      );
    }

    latestMoviesListItem.onclick = () =>
      changeVideo(videoTrailerArray[i]?.youtubeKey);

    const latestMoviesListItemImage = document.createElement("img");
    latestMoviesListItemImage.src = `https://img.youtube.com/vi/${videoTrailerArray[i].youtubeKey}/0.jpg`;
    const latestMoviesListItemTitle = document.createElement("p");
    latestMoviesListItemTitle.innerHTML = videoTrailerArray[i]?.title;
    latestMoviesListItem.append(latestMoviesListItemImage);
    latestMoviesListItem.append(latestMoviesListItemTitle);
    latestMoviesListItem.classList.add("latest__movies__list__item");
    latestMoviesListItem.setAttribute(
      "id",
      `item${videoTrailerArray[i]?.youtubeKey}`
    );
    latestMoviesList.appendChild(latestMoviesListItem);
  }

  videoContainer.append(latestMoviesList);

  // REMOVE LOADING WHEN THE PAGE IS LOADED
  const pageLoader = document.getElementById("page__loader");
  pageLoader.classList.add("hidden");

  pageLoaded.classList.remove("hidden");
  pageLoaded.classList.add("not__hidden");
};

$("#popular__movie").mousemove(function (event) {
  //Check if we're a desktop
  if (window.matchMedia("(min-width: 767px)").matches) {
    const x = event.clientX;
    const left = $("#popular__movie").scrollLeft();
    const leftContainer = $("#popular__movie");

    if (x > leftContainer.width() - 20) {
      $("#popular__movie").scrollLeft(left + 200);
    } else if (x < 200) {
      $("#popular__movie").scrollLeft(left - 200);
    }
  }
});
