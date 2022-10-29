const fetchLatestMovies = async (queryParameter) => {
    const getNewMovies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&query=${queryParameter}&language=pt-BR`,
      { mode: "cors" }
    );
    const post = await getNewMovies.json();
    return post;
};

const formatDate = (dateToFormat) => {
    const data = new Date(dateToFormat);
    const dataFormatada =
        data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    return dataFormatada;
};
  
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

const pesquisarFilmes = async () => {
    const inputValue = document.getElementById("input__outline").value;
    const movie = await fetchLatestMovies(inputValue);
    console.log("movie", movie);
    renderPopularMovies(movie);
}

const moveMoviesCarousel = (pixelsToMove) => {
    const scroll = $("#popular__movie");
    const amoutOfMovement = $(scroll).left + pixelsToMove;
    scroll.animate({ scrollLeft: amoutOfMovement }, 1000);
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