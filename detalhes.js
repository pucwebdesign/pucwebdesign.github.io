const fetchLatestMovies = async (queryParameter) => {
  const getNewMovies = await fetch(
    `https://api.themoviedb.org/3/movie/${queryParameter}?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR&page=1`,
    { mode: "cors" }
  );

  var post = await getNewMovies.json();
  return post;
};

const getUrlParameter = async () => {
  const movieParam = window.location.search.split("=");
  const movieInformation = await fetchLatestMovies(movieParam[1]);
  console.log("MI", movieInformation);
};
