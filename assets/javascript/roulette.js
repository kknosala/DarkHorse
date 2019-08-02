//! ---- FIRE BASE DATABASE ---- //
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBefl1X1g4OHGfCk-IJxfRG-4xLDaktf0w",
    authDomain: "darkhorse-d5e95.firebaseapp.com",
    databaseURL: "https://darkhorse-d5e95.firebaseio.com",
    projectId: "darkhorse-d5e95",
    storageBucket: "",
    messagingSenderId: "1014522188477",
    appId: "1:1014522188477:web:f8d22f043a0ffa55"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

//! ----                      ---- //

var roulette_name = null;
var roulette_year = null;
var roulette_runTime = null;
var roulette_poster = null;
var roulette_plot = null;
var response_locations = {}
var roulette_actors = null;

// database.ref("/movies/genres/horror").set({
//     0: "Pandorum",
//     1: "Last Shift",
//     2: "Terrifier",
//     3: "Stitches",
//     4: "The Babadook",
//     5: "Pandorum",
//     6: "Get Out",
//     7: "28 Weeks Later",
//     8: "The Rite",
//     9: "The Devil's Rejects"
// })

// horror roulette
function roulette_horror() {
    database.ref("/movies/genres/horror").on("value", function (snapshot) {
        //creates the random number to grab from the DB
        let movie_list_length = snapshot.val().length
        const roulette_choice = Math.floor(Math.random() * (movie_list_length))

        //runs ajax call to look up the movie
        console.log("seraching: " + snapshot.val()[roulette_choice])

        //runs utelly search for locations and name
        utelly(snapshot.val()[roulette_choice])
        omdb(snapshot.val()[roulette_choice])
    })
}

function utelly(x) {
    const term = x;
    $.ajax({
        url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${term}`,
        type: "GET",
        headers: {
            "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "x-rapidapi-key": "a938304903msh75973e6bdae1c2fp1808eejsnb0c393a11c6b"
        }
    }).then(function (response) {
        console.log(response.results[0]);
        let response_object = response.results[0]
        roulette_name = response_object.name

        for (i = 0; i < response_object.locations.length; i++) {
            let response_locations_display_name = response_object.locations[i].display_name
            let response_locations_url = response_object.locations[i].url
            response_locations.response_locations_display_name = response_locations_url
        }
    });
}

function omdb(x) {
    $.ajax({
        url: `https://www.omdbapi.com/?t=${x}&y=&plot=short&apikey=trilogy`,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        roulette_plot = response.Plot
        roulette_poster = response.Poster
        roulette_year = response.Year
        roulette_runTime = response.Runtime

    });
}


function print() {

}
roulette_horror();