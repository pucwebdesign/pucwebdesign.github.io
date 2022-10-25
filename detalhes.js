const fetchLatestMovies = async (queryParameter) => {
  const getNewMovies = await fetch(
    `https://api.themoviedb.org/3/movie/${queryParameter}?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR&page=1`,
    { mode: "cors" }
  );

  var post = await getNewMovies.json();
  return post;
};

const formatDate = (dateToFormat) => {
  const data = new Date(dateToFormat);

  const dataFormatada =
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();

  return dataFormatada;
};

const getUrlParameter = async () => {
  const movieParam = window.location.search.split("=");
  const movieInformation = await fetchLatestMovies(movieParam[1]);
  console.log("MI", movieInformation);
  //Div principal
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("responsive__image");
  //img
  const mainImg = document.createElement("img");
  mainImg.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500/${movieInformation.poster_path}`
  );
  mainImg.setAttribute("alt", `${movieInformation.title}`);
  //div info
  const mainDivInfo = document.createElement("div");
  mainDivInfo.classList.add("responsive__image__information");
  //title
  const mainTitle = document.createElement("h2");
  mainTitle.innerHTML = movieInformation.title;
  //description
  const mainDescription = document.createElement("p");
  mainDescription.innerHTML = movieInformation.overview;
  //date
  const mainDate = document.createElement("span");
  mainDate.innerHTML = formatDate(movieInformation.release_date);

  mainDivInfo.append(mainTitle, mainDescription, mainDate);
  mainDiv.append(mainImg, mainDivInfo);

  const container = document.getElementById("main__container");
  container.append(mainDiv);
};