const fetchLatestMovies = async (queryParameter) => {
    const getNewMovies = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=en-US&query=${queryParameter}&page=1&include_adult=false`,
      { mode: "cors" }
    );
  
    const post = await getNewMovies.json();
    return post;
  };

const pesquisarFilmes = async () => {
    console.log("aqui");
    const inputValue = document.getElementById("input__outline").value;
    console.log("input value", inputValue);
    const movie = await fetchLatestMovies(inputValue);
    console.log("movie", movie);
}

