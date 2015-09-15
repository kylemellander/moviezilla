function ApiData(zip) {
  this.zip = zip;
  this.api_key = "ez3mx4r7skrxpe9au2y8bpgn";
  var d = new Date();
  this.startDate = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
  this.jsonp = "dataHandler";
}

function ApiAjax(zip) {
  this.url = "http://data.tmsapi.com/v1.1/movies/showings";
  this.dataType = "jsonp";
  this.data = new ApiData(zip);
}

function dataHandler(data) {
  $("#movieresults").append('<p>Found ' + data.length + ' movies showing within 5 miles of you:</p>');
  var movies = data.hits;
  $.each(data, function(index, movie) {
    var movieData = "<div class='page-header'><h3>" + movie.title
    if (movie.ratings) { movieData += ' <small>(' + movie.ratings[0].code + ')</small>'};
    movieData += '</h3></div><p>' + movie.shortDescription + '</p><p>' + movie.genres + '</p></div>';

    var theatreName = "";

    for(var key in movie.showtimes) {
      movie.showtimes[key]
    }

    movie.showtimes.forEach(function(showtime) {
      var time = new Date(showtime.dateTime);
      var hours = time.getHours() + 7;
      if (hours > 12) {
        hours -= 12;
        var ampm = "pm";
      } else {
        var ampm = "am";
      }
      if (theatreName === showtime.theatre.name) {
        movieData += '<span> ' + hours + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + ampm + '</span>'
      } else {
        movieData += '<h5>' + showtime.theatre.name + '</h5>'
        movieData += '<span>' + hours + ':' + (time.getMinutes()<10?'0':'') + time.getMinutes() + ampm + '</span>'
      }
      theatreName = showtime.theatre.name
    });

    $("#movieresults").append(movieData);
  });
}


$(document).ready(function() {
  $("form#movie-request").submit(function(event) {
    event.preventDefault();
    var zip = $('input#zip').val();
    $.ajax(new ApiAjax(zip));

    $("#movieform").hide();
    $("#newsearch").show();
  })

  $("#newsearch .button").click(function() {
    $("#movieform").toggle();
    $("#newsearch").toggle();
  })
})
