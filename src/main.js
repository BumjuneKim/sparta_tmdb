const getTopRatedMovies = async (searchWord) => {
  const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'your key'
    }
  };

  const response = await fetch(url, options);
  if (response.status !== 200) {
    throw new Error('APi call Error!!!')
  }

  const successResult = await response.json()
  const topRatedMovies = successResult.results
  if (searchWord) {
    return topRatedMovies.filter((movie) => movie.title.includes(searchWord))
  }

  return topRatedMovies
};

function renderMovieCard(movieList) {
  const cardList = document.querySelector("#card-list");

  cardList.innerHTML = movieList.map((movie) => {
    return `<li class="movie-card" id=${movie.id}>
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
              <h3 class="movie-title">${movie.title}</h3>
              <p>${movie.overview}</p>
              <p>Rating: ${movie.vote_average}</p>
          </li>`
  }).join('')
}

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.querySelector("#search-form");
  form.addEventListener("click", async function() {
    const searchWord = document.querySelector("#search-input").value;
    const topRatedMovies = await getTopRatedMovies(searchWord)
    renderMovieCard(topRatedMovies)
  })

  const topRatedMovies = await getTopRatedMovies()
  renderMovieCard(topRatedMovies)
})
