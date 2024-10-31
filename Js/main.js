//* API
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDQ5ZTI4NTgyODFjYTFiNzJmZjRiOTc0N2JiNDQ2NiIsIm5iZiI6MTcyODg0MTI1NC40MDY1NTQsInN1YiI6IjY3MGJmZTIwNDExMWJlNGYwMjc0YzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6f_ij7Gxn2wabnd2GlHW9yMx_FKPq1YRV8zMqaTrUB0",
  },
};
const apiUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=`;
const imagePath = `https://image.tmdb.org/t/p/w1280`;
renderMovies(apiUrl);
//* Render edecek function
async function renderMovies(url) {
  const res = await fetch(url, options);
  const data = await res.json();
  // console.log(data.results);
  showMovies(data.results);
}

//* HTML'deki verilere eriş.

const form = document.querySelector("#form");
const search = document.querySelector("#search");
const main = document.querySelector("#main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = search.value;
  if (searchValue && searchValue !== "") {
    renderMovies(searchUrl + searchValue);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = ``;

  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");
    movieElement.innerHTML = `
        <img src="${imagePath + poster_path}" alt="${title}-image" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(
      1
    )}</span>
        </div>
        <div class="overview">
          <h3>${title} <small>Overview</small></h3>
          <p>
          ${overview}
          </p>
        </div>`;
    main.appendChild(movieElement);
  });
}
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
//* Sayfa yenilendiği zaman eski haline tekrar dön.
window.addEventListener("DOMContentLoaded", () => {
  renderMovies();
});
