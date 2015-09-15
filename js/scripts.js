function Theater(name, address, movies) {
  this.name = name;
  this.address = address;
  this.movies = movies;
}

function Movie(title, rating, trailer, times) {
  this.title = title;
  this.rating = rating;
  this.trailer = trailer;
  this.times = times;
}

$(document).ready(function() {
  $("form#movie-request").submit(function(event) {
    event.preventDefault();
    var zip = $('input#zip').val();
    var results;
    $.ajax({
      url: "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fgoogle.com%2Fmovies%3Fnear%3D" + zip + "'%20and%20xpath%3D'%2F%2Fdiv%5Bcontains(%40class%2C%22movie_results%22)%5D'&format=json&diagnostics=true&callback=",
      success: function(data) {
        var theaters = [];
        var usableData = data.query.results.div.div;
        usableData.forEach(function(theater) {
          var theaterName = theater.div[0].h2.a.content;
          var theaterAddress = theater.div[0].div.content;
          var movies = [];
          var movieList = [];

          if (theater.div[1].div[0] !== undefined) {
            movieList = theater.div[1].div[0].div.concat(theater.div[1].div[1].div);
          } else {
            var movie = theater.div[1].div.div;
            movieList.push(movie);
          }

          movieList.forEach(function(movie){
            var movieName = movie.div[0].a.content;
            var movieRating = movie.span.content;
            movieRating = movieRating.substring(0, movieRating.length - 5);

            if (movie.span.a[0] === undefined) {
              var movieTrailer = "";
            } else {
              var movieTrailer = movie.span.a[0].href;
            }

            var movieTimes = [];
            if (movie.div[1].span[0] === undefined) {
              movieTimes.push(movie.div[1].span.content)
            } else {
              movie.div[1].span.forEach(function(time) {
                movieTimes.push(time.content);
              })
            }

            var newMovie = new Movie(movieName, movieRating, movieTrailer, movieTimes.join(', '));
            movies.push(newMovie);
          })

          var newTheater = new Theater(theaterName, theaterAddress, movies);
          theaters.push(newTheater);
        })

        console.log(theaters);
      }
    })

    $("#movieform").hide();
    $("#newsearch").show();
  })

  $("#newsearch .button").click(function() {
    $("#movieform").toggle();
    $("#newsearch").toggle();
  })
})
