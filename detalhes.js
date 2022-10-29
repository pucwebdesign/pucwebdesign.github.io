const fetchLatestMovies = async (queryParameter) => {
  const getNewMovies = await fetch(
    `https://api.themoviedb.org/3/movie/${queryParameter}?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=pt-BR&page=1`,
    { mode: "cors" }
  );

  const getHomepage = await fetch(
    `https://api.themoviedb.org/3/movie/${queryParameter}?api_key=58a6af7c57bd237d8c8b737a26bdd1ce&language=en-US&page=1`,
    { mode: "cors" }
  );

  const post = await getNewMovies.json();
  const homepage = await getHomepage.json();
  let validHome = `https://www.themoviedb.org/movie/${queryParameter}`;

  if (homepage?.homepage) {
    validHome = homepage?.homepage;
  }

  return { post, validHome };
};

const formatDate = (dateToFormat) => {
  const data = new Date(dateToFormat);

  const dataFormatada =
    data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();

  return dataFormatada;
};

const getUrlParameter = async () => {
  const movieParam = window.location.search.split("=");
  const { post: movieInformation, validHome } = await fetchLatestMovies(
    movieParam[1]
  );
  //Div principal
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("responsive__image");
  //Img
  const mainImg = document.createElement("img");
  mainImg.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500/${movieInformation.poster_path}`
  );
  mainImg.setAttribute("alt", `${movieInformation.title}`);
  //Div info
  const mainDivInfo = document.createElement("div");
  mainDivInfo.classList.add("responsive__image__information");
  //Title
  const mainTitle = document.createElement("h2");
  mainTitle.innerHTML = movieInformation.title;
  //Description
  const mainDescription = document.createElement("p");
  mainDescription.innerHTML = movieInformation.overview;
  //Date
  const mainDate = document.createElement("span");
  mainDate.innerHTML = formatDate(movieInformation.release_date);
  //Original homepage
  const mainHomePageLink = document.createElement("a");
  mainHomePageLink.href = validHome;
  mainHomePageLink.setAttribute("target", "_blank");

  const mainHomePageText = document.createElement("span");
  mainHomePageText.innerHTML = "Acesse o site oficial";

  mainHomePageLink.append(mainHomePageText);

  mainDivInfo.append(mainTitle, mainDescription, mainDate, mainHomePageLink);
  mainDiv.append(mainImg, mainDivInfo);

  const container = document.getElementById("main__container");
  container.append(mainDiv);
};
