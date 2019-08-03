$(document).ready(function(){

    // function when search button is pressed.
    $('#submit-search').click(function(){
        // prevents page reload
        event.preventDefault();
        // removes current movie info
        $('#movies').empty();
        // grabs info from search. May need to get rid of actor pull as omdb does not allow that search.
        var search = $('#title-input').val().trim();
        var year = $('#year-input').val().trim();
        var type = $('#search-type').val();
        // URL used in ajax call
        var queryURL = "https://www.omdbapi.com/?apikey=trilogy&s=" + search + "&y=" + year;
        // ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
     
            var linkDisplay = $('<div>').addClass('link-display');
            var idArray = [];
            var titleArray = [];
                for(i = 0; i < response.Search.length; i++){
                   
                    if(response.Search[i].Type === 'movie' || response.Search[i].Type === 'series'){
                   
                        idArray.push(response.Search[i].imdbID);
                        titleArray.push(response.Search[i].Title);
                    }
                }
               
                for(i = 0; i < idArray.length; i++){
                    var movieId = idArray[i];
                    var movieURL = "https://www.omdbapi.com/?apikey=trilogy&i=" + movieId;

                    $.ajax({
                        url: movieURL,
                        method: "GET"
                    }).then(function(individualResponse){
                        var movieContainer = $('<div>').addClass('movie-container');
                        var movieDisplay = $('<div>').addClass('movie-display');
                        var whereDiv = $('<div>').addClass('where-to-watch')
                        // creates new div with a class and puts the poster from the call in.
                        var posterDiv = $('<div>').addClass('movie-poster');
                        var posterImg = $('<img>').attr('src', individualResponse.Poster);
                        posterDiv.append(posterImg);
                        // creates a new div for all of the movie info and adds text.
                        var movieInfo = $('<div>').addClass('movie-info');
                        var infoText = $('<p>').text(individualResponse.Title);
                        infoText.append('<p> Actors: ' + individualResponse.Actors);
                        infoText.append('<p>Genre: ' + individualResponse.Genre);
                        infoText.append('<p>Rated: ' + individualResponse.Rated);
                        infoText.append('<p>Relased: ' + individualResponse.Released);
                        movieInfo.append(infoText);
                        // creates new div and adds plot
                        var plot = $('<div>').text(individualResponse.Plot).addClass('plot-info');
                        
                        // adds all the above into the movie-display div on search.html
                        movieDisplay.append(posterDiv, movieInfo, plot);
                        // $(`#${movieId}`).append(movieDisplay)

                        const term = individualResponse.Title;
                    
                        const country = `us`;
                        $.ajax({
                            url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${term}&country=${country}`,
                            type: "GET",
                            headers: {
                                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                                "x-rapidapi-key": "a938304903msh75973e6bdae1c2fp1808eejsnb0c393a11c6b"
                            }
                        }).then(function (linkResponse) {
                            console.log(linkResponse);
                            var locationsArray = linkResponse.results[0].locations

                            for(i = 0; i < locationsArray.length; i++){
                           
                                var link = $('<a>').attr({href:locationsArray[i].url, target:'blank'});
                                var watchImage = $('<img>').attr({src:locationsArray[i].icon, alt:locationsArray[i].display_name}).addClass('stream-link')
                                link.append(watchImage);
                                whereDiv.append(link);
                            }
                        });
                        movieContainer.append(movieDisplay);
                        movieContainer.append(whereDiv);
                        $('#movies').append(movieContainer);
                    })
                }
        })

    })








})