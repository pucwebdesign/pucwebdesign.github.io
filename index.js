const fetchLatestMovies = async (queryParameter) => {
  const getNewMovies = await fetch(
    `https://api.themoviedb.org/3/movie/${queryParameter}?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR&page=1`,
    { mode: "cors" }
  );

  var post = await getNewMovies.json();
  return post;
};

const renderLatest = async () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    console.log("ISmobile");
    // https://thumbs.gfycat.com/PleasingCornyInvisiblerail-mobile.mp4
  }

  const getNewMovies = await fetchLatestMovies("now_playing");
  const getUpcomingMovies = await fetchLatestMovies("upcoming");

  console.log("getUpcoming", getUpcomingMovies);

  const mainContainer = document.getElementById("latest__movies__main");

  const mainGrid = document.createElement("div");
  mainGrid.classList.add("latest__movies__grid");

  for (let i = 0; i < getNewMovies?.results?.length; i++) {
    console.log(
      `https://image.tmdb.org/t/p/w500/${getNewMovies.results[i]?.poster_path}`
    );
    if (i == 0) {
      console.log(getNewMovies?.results);
      const mainMoviePhoto = document.getElementById("main__movie__photo");

      /*
      mainMoviePhoto.setAttribute(
        "src",
        `https://image.tmdb.org/t/p/w500/${getNewMovies.results[i]?.poster_path}`
      );
      */
    }
    /*
    console.log(getNewMovies);
    const eachMovieContainer = document.createElement("div");
    eachMovieContainer.classList.add("latest__movies__container");

    const imageElement = document.createElement("img");
    imageElement.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${getNewMovies.results[i]?.poster_path}`
    );

    const movieTitle = document.createElement("h2");
    movieTitle.classList.add("title");
    movieTitle.innerHTML = getNewMovies.results[i]?.title;

    const movieDate = document.createElement("span");
    movieDate.innerHTML = getNewMovies.results[i]?.release_date;

    const sinopsis = document.createElement("h3");
    sinopsis.innerHTML = "Sinopse";

    const description = document.createElement("p");
    description.innerHTML = getNewMovies.results[i]?.overview;

    eachMovieContainer.append(imageElement);
    eachMovieContainer.append(movieTitle);
    eachMovieContainer.append(movieDate);
    eachMovieContainer.append(sinopsis);
    eachMovieContainer.append(description);

    mainGrid.append(eachMovieContainer);
    */
  }

  mainContainer.append(mainGrid);
};
