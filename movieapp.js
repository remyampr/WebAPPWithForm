// Movie app
// ------------------------

function movieApp(userName) {
  document.getElementById("container-signup").style.display = "none";
  document.getElementById("container-login").style.display = "none";
  document.getElementById("movie-app-container").style.display = "block";

  //
  movieAppContainer.style.display = "block";
  const nameBox = document.getElementById("logged-username");
  nameBox.innerHTML = "";
  const appUser = document.createElement("h3");
  appUser.classList.add("user-name");

  appUser.textContent = userName;
  nameBox.appendChild(appUser);
  // to display full movies on home
  getFullMovies();
}

const inputGroup = document.getElementById("input-group");
const inputBox = document.getElementById("input-box");
const searchButton = document.getElementById("search-button");
const resultContainer = document.getElementById("result-container");
const homeMovieContainer = document.getElementById("home-movie-container");
const homeMovieContainerRow = document.getElementById(
  "home-movie-container-row"
);
const movieAppContainer = document.getElementById("movie-app-container");
//  api key from https://www.omdbapi.com/
let apikey = "ffcefe9e";
// starting from page1 in api
let currentPage = 1;
// for getting all movies contains  "hero"
const searchMovieKey = "hero";

async function getFullMovies() {
  movieAppContainer.style.display = "block";
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apikey}&s=${searchMovieKey}&page=${currentPage}`
    );
    console.log("Response :", response);
    const moviesList = await response.json();
    console.log("moviesList: ", moviesList);
    console.log(moviesList.Search);

    if (moviesList.Response === "True") {
      displayMovieCards(moviesList.Search);
      currentPage++;
    } else {
      console.error("Error fetching movies:", data.Error);
    }
  } catch (error) {
    console.log("Error occured : ", error);
  }
}

// whem home Logo clicked
function displayHome() {
  resultContainer.textContent = "";
  homeMovieContainerRow.textContent = "";
  currentPage = 1;
  homeMovieContainer.style.display = "block";

  getFullMovies();
}
function displayMovieCards(movies) {
  // iterate through array and append it to home
  movies.forEach((element) => {
    let src = element.Poster;
    let movieCardCol = document.createElement("div");
    movieCardCol.classList.add(
      "col-12",
      "col-sm-6",
      "col-md-4",
      "col-lg-3",
      "movie-card-col"
    );
    movieCardCol.innerHTML = ` <div class="card movie-container-card">
                <img src=${src} class="card-img-top" alt="${element.Title}poster"
                />
                <div class="card-body">
                  <a
                    href="#"
                    class="link-info link-underline-info link-underline-opacity-10 link-opacity-50-hover"
                    id="movie-${element.Title}"
                    >See more</a
                  >
                </div>
              </div>`;

    homeMovieContainerRow.appendChild(movieCardCol);

    // when clicke on seemore link set an event listner so it can direct to display that movie detail using function  getSearchedMovie(moviename)
    const linkSeeMore = document.getElementById(`movie-${element.Title}`);
    linkSeeMore.addEventListener("click", (event) => {
      event.preventDefault();

      console.log("movie search frome home , Movie name :", element.Title);
      getSearchedMovie(element.Title);
    });

    // to fetch more movies when window screen end
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        getFullMovies();
      }
    });
  });
}

// get data from https://www.omdbapi.com/ api with title(movie name)
async function getSearchedMovie(movieName) {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apikey}&t=${movieName}`
    );
    console.log("Response :", response);
    const data = await response.json();
    console.log("Data: ", data);
    // Once fetch data call function to show the dtails on dom
    showMovieDetails(data);
  } catch {
    console.log("Error occured : ", error);
  }
}

//  when click on search button
function searchMovie() {
  let movieName = inputBox.value;
  console.log("Inside searchMovie function: Input movieName :", movieName);
  // if there is no input
  if (!movieName) {
    alert("Enter a movie name !");
    resultContainer.textContent = "";
    console.log("error msg");
  }
  // if there is data entered on input box  call getSearchedMovie() to fetch api
  else {
    homeMovieContainer.style.display = "none";
    getSearchedMovie(movieName);
  }
}
function showMovieDetails(data) {
  homeMovieContainer.style.display = "none";
  let src = data.Poster;
  console.log(src);
  console.log("Inside showMovieDetails function Movie name: ", data.Title);
  // if the entered data is not found
  if (data.Title === undefined) {
    resultContainer.innerHTML = " <h1>Sorry !!! Movie not found!!!</h1>";
    inputBox.value = "";
    return;
  }

  //   dta contains particular movie details will add to result containeer
  resultContainer.innerHTML = `      <div class="card mb-3 " style="max-width: 900px;">
          <div class="row g-0 p-2">
            <div class="col-md-4 col-sm-12 ">
              <img src=${src} alt=${data.Title}"movie-Poster" class="movie-poster" >
            </div>
            <div class="col-md-8 movie-content">
              <div class="card-body movie-card">
                <h5 class="card-title text-center movie-title">Movie : ${data.Title}</h5>
                <p >Rating:${data.Ratings[0].Value} <br> Release Year : ${data.Year} <br> Genre : ${data.Genre} <br>Director : ${data.Director} <br>
                  Actors : ${data.Actors}
                  <br>
                  Language : ${data.Language}
                  <br>
                  Country : ${data.Country}
                </p>
                <p class="card-text ms-5">Plot : ${data.Plot}</p>
                
              </div>
            </div>
          </div>
        </div>`;
  inputBox.value = "";
}
function logoutUser() {
  document.getElementById("logged-username").textContent = "";
  document.getElementById("movie-app-container").style.display = "none";
  document.getElementById("container-login").style.display = "block";
}
