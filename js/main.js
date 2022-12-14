$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  //   axios.get('http://www.omdbapi.com?s='+searchText)

  //   axios.get('http://www.omdbapi.com&apikey=thewdb'+searchText)
  // axios.get('http://www.omdbapi.com?s='+ searchText+'&apikey=thewdb')

  // axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=f52faaa9')
  axios
    .get("http://www.omdbapi.com/?s=" + searchText + "&apikey=5b705cbe")
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
        
    <div class="col-md-3">
    <div class ="well text-center">
    <img src="${movie.Poster}" >
     <h5>${movie.Title}</h5>
     <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
    </div>
    </div>
    `;
      });

      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

// function getMovieByID(imdbID) {
//   axios
//     .get("http://imdb-api.com/en/API/Title/k_ast87zde/${movie.imdbID}")
//     .then((res) => {
//       // let imdbID = res.data;
//       console.log(res);
//     });
// }

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  console.log(movieId);
  axios
    .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=5b705cbe")
    .then((response) => {
      console.log(response);
      let movie = response.data; // movie.data
      console.log(movie);
      let output = `
   <div class="row">
   <div class="col-md-4">
    <img src="${movie.Poster}" class="thumbnail">
   </div>
   <div class="col-md-8">
    <h2>${movie.Title}</h2>
    <ul class="list-group">
    <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
    <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
    <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
    <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
    <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
    <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
    <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
    </ul>
   </div>
   </div>
   <div class="row">
    <div class="well">
     <h3>Plot</h3>
     ${movie.Plot}
     <hr>
    
     <a href="http://imdb.com/title/${movie.imdbID}" target ="_blank" class="btn btn-danger">View IMDB</a>
     
     <a href="index.html" class="btn btn-default">Go Back To Search</a>
    </div>
   </div>
   `;
      axios
        .get(`http://imdb.com/Title/k_ast87zde/${movie.imdbID}`)
        .then((res) => {
          // let imdbID = res.data;
          console.log(res);
        });
      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
