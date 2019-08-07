$(document).ready(function() {
  // function when search button is pressed.
  $("#submit-search").click(function() {
    // prevents page reload
    event.preventDefault();
    // removes current movie info
    $("#movies").empty();
    // grabs info from search.
    var search = $("#title-input")
      .val()
      .trim();
    var year = $("#year-input")
      .val()
      .trim();
    // URL used in ajax call
    var queryURL =
      "https://www.omdbapi.com/?apikey=trilogy&s=" + search + "&y=" + year;
    // ajax call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // checks to see if a result is found
      if (response.Response === "False") {
        // if no result found, inform user to try again.
        var nothingFound = $("<p>")
          .addClass("nothing-found")
          .text("No Results Found. Please Redefine Your Search and Try Again.");
        $("#movies").append(nothingFound);
      } else {
        // takes the titles and imdb numbers of each result and adds them to arrays for the next call
        var idArray = [];
        var titleArray = [];
        for (i = 0; i < response.Search.length; i++) {
          if (
            response.Search[i].Type === "movie" ||
            response.Search[i].Type === "series"
          ) {
            idArray.push(response.Search[i].imdbID);
            titleArray.push(response.Search[i].Title);
          }
        }
        //uses the ids found and searches for each one indiviudally to get more detailed information
        for (i = 0; i < idArray.length; i++) {
          var movieId = idArray[i];
          var movieURL =
            "https://www.omdbapi.com/?apikey=trilogy&i=" +
            movieId +
            "&plot=full";

          $.ajax({
            url: movieURL,
            method: "GET"
          }).then(function(individualResponse) {
            // creates an individual container for each movie
            var movieContainer = $("<div>").addClass("movie-container");
            // div for movie information
            var movieDisplay = $("<div>").addClass("movie-display");
            // div for streaming locations
            var whereDiv = $("<div>").addClass("where-to-watch");
            // creates new div with a class and puts the poster from the call in.
            var posterDiv = $("<div>").addClass("movie-poster");
            // if there is not a poster, display the placeholder image. Otherwise, display poster image
            if (individualResponse.Poster === "N/A") {
              var posterImg = $("<img>").attr({
                src: "assets\\images\\noimagefound.jpg",
                alt: "No Image Found"
              });
            } else {
              var posterImg = $("<img>").attr({
                src: individualResponse.Poster,
                alt: individualResponse.Title
              });
            }
            // append poster image to poster Div
            posterDiv.append(posterImg);
            // creates a new div for all of the movie info and adds text.
            var movieInfo = $("<div>").addClass("movie-info");
            var infoText = $("<p>").text(individualResponse.Title);
            infoText.append("<p> Actors: " + individualResponse.Actors);
            infoText.append("<p>Genre: " + individualResponse.Genre);
            infoText.append("<p>Rated: " + individualResponse.Rated);
            infoText.append("<p>Relased: " + individualResponse.Released);
            movieInfo.append(infoText);
            // creates new div and adds plot
            var plot = $("<div>").text("Plot:");
            plot.append("<p>" + individualResponse.Plot).addClass("plot-info");

            // adds all the above into the movie-display div on search.html
            movieDisplay.append(posterDiv, movieInfo, plot);

            // Searches for streaming options from utelly by the title
            const term = individualResponse.Title;

            const country = `us`;
            $.ajax({
              url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${term}&country=${country}`,
              type: "GET",
              headers: {
                "x-rapidapi-host":
                  "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                "x-rapidapi-key":
                  "a938304903msh75973e6bdae1c2fp1808eejsnb0c393a11c6b"
              }
            }).then(function(linkResponse) {
              // if steaming services are found, display them on the page.
              if (linkResponse.results[0]) {
                var locationsArray = linkResponse.results[0].locations;
                for (i = 0; i < locationsArray.length; i++) {
                  var link = $("<a>").attr({
                    href: locationsArray[i].url,
                    target: "blank"
                  });
                  var watchImage = $("<img>")
                    .attr({
                      src: locationsArray[i].icon,
                      alt: locationsArray[i].display_name
                    })
                    .addClass("stream-link");
                  link.append(watchImage);
                  whereDiv.append(link);
                }
                // if no streaming services are found, display the below message
              } else {
                var noLink = $("<p>").text("No Streaming Services Found");
                whereDiv.append(noLink);
              }
            });
            // add the movie info into the movie container
            movieContainer.append(movieDisplay);
            // add streaming info to the movie container
            movieContainer.append(whereDiv);
            // add the movie contianer to the main html div
            $("#movies").append(movieContainer);
          });
        }
      }
    });
  });
});
