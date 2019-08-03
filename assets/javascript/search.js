$(document).ready(function(){

    // function when search button is pressed.
    $('#submit-search').click(function(){
        // prevents page reload
        event.preventDefault();
        // grabs info from search. May need to get rid of actor pull as omdb does not allow that search.
        var title = $('#title-input').val().trim();
        var actor = $('#actor-input').val().trim();
        var year = $('#year-input').val().trim();
        var type = $('#search-type').val();
        // URL used in ajax call
        var queryURL = "https://www.omdbapi.com/?apikey=trilogy&t=" + title + "&y=" + year + "&type=" + type;
        // ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            // creates new div with a class and puts the poster from the call in.
            var posterDiv = $('<div>').addClass('movie-poster');
            var posterImg = $('<img>').attr('src', response.Poster);
            posterDiv.append(posterImg);
            // creates a new div for all of the movie info and adds text.
            var movieInfo = $('<div>').addClass('movie-info');
            var infoText = $('<p>').text(response.Title);
            infoText.append('<p> Actors: ' + response.Actors);
            infoText.append('<p>Genre: ' + response.Genre);
            infoText.append('<p>Rated: ' + response.Rated);
            infoText.append('<p>Relased: ' + response.Released);
            movieInfo.append(infoText);
            // creates new div and adds plot
            var plot = $('<div>').text(response.Plot);
            
            // adds all the above into the movie-display div on search.html
            $('#movie-display').append(posterDiv, movieInfo, plot);
        })

        const term = title;
        const country = `us`;
        $.ajax({
            url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${term}&country=${country}`,
            type: "GET",
            headers: {
                "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                "x-rapidapi-key": "a938304903msh75973e6bdae1c2fp1808eejsnb0c393a11c6b"
            }
        }).then(function (response) {
            console.log(response);
            var locationsArray = response.results[0].locations
            var whereDiv = $('<div>').addClass('where-to-watch')

            for(i = 0; i < locationsArray.length; i++){
                console.log(locationsArray[i]);
                var link = $('<a>').attr({href:locationsArray[i].url, target:'blank'});
                var watchImage = $('<img>').attr({src:locationsArray[i].icon, alt:locationsArray[i].display_name}).addClass('stream-link')
                link.append(watchImage);
                whereDiv.append(link);
            }
            $('#link-display').append(whereDiv);
        });
        })










})