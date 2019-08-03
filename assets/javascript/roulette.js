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

// database.ref("/movies/genres/comedy").set({
//     0: "Tucker and Dale vs Evil",
//     1: "God Bless America",
//     2: "What We Do in the Shadows",
//     3: "The Voices",
//     4: "Cooties",
//     5: "John Dies at the End",
//     6: "The House Bunny",
//     7: "Sex Drive",
//     8: "Burn After Reading"
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
        // console.log(response.results[0]);
        let response_object = response.results[0]
        roulette_name = response_object.name
        $(".display_show_name").append("<span>").text(roulette_name)
        for (i = 0; i < response_object.locations.length; i++) {
            //* locations buttons for where to watch
            let response_locations_display_name = response_object.locations[i].display_name
            let response_locations_url = response_object.locations[i].url
            let response_locations_icon = response_object.locations[i].icon

            if (!response_locations_display_name.includes("Horror Channel")) {
                let new_location_link = $("<a>").attr("href", response_locations_url).attr("target", "_blank")
                let new_location_img = $("<img>").attr("src", response_locations_icon).addClass("steam-link").attr("alt", response_locations_display_name)
                new_location_link.append(new_location_img);
                $(".display_show_streams").append(new_location_link)
            }
        }
    });
}

function omdb(x) {
    $.ajax({
        url: `https://www.omdbapi.com/?t=${x}&y=&plot=full&apikey=trilogy`,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //* PLOT
        $(".display_show_plot").append(response.Plot)
        //* POSTER
        $(".display_show_poster").append($("<img>").attr("src", response.Poster))
        //* YEAR
        roulette_year = response.Year
        roulette_rated = response.Rated
        roulette_actors = response.Actors
        $(".display_show_actors").append($("<p>").text(response.Actors))
    });
}


function print() {
    console.log(`year: ${roulette_year}`)
    console.log(`rated: ${roulette_rated}`)
    console.log(`poster img: ${roulette_poster}`)
    console.log(`plot: ${roulette_plot}`)
    console.log(`location obj: ${response_locations}`)
    console.log(`actors: ${roulette_actors}`)
}
roulette_horror();