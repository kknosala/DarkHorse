$(document).ready(function(){


    $('#submit-search').click(function(){

        event.preventDefault();

        var title = $('#title-input').val().trim();
        var actor = $('#actor-input').val().trim();
        var year = $('#year-input').val().trim();
        var genre = $('#search-genre').val();
        var queryURL = "https://www.omdbapi.com/?t=" + title + "&apikey=trilogy";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response)
        })
    })










})