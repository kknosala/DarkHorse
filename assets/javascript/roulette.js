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

// database.ref("/reviews/genres/horror/Pandorum/0").set({
//  0: 4,
//  1: "Great movie, very spooky, I woudln't beable to handle that situation!"
// });

// database.ref("/reviews/genres/horror/Last Shift/0").set({
//  0: 3,
//  1: "Poor people! Ending suprised me!"
// });

// database.ref("/reviews/genres/horror/Terrifier/0").set({
//  0: 5,
//  1: "My new favorite horror movie!"
// });

// database.ref("/reviews/genres/horror/Stitches/0").set({
//  0: 4,
//  1: "OMG! WHAT A CREEPY CLOWN!"
// });

// database.ref("/reviews/genres/horror/The Babadook/0").set({
//  0: 5,
//  1: "This is my type of horror movie! Doesn't rely on jump scares to scare the crap out of you"
// });
// database.ref("/reviews/genres/horror/Get Out/0").set({
//  0: 4,
//  1: "My favorite horror director!"
// });

// database.ref("/reviews/genres/horror/28 Weeks Later/0").set({
//  0: 5,
//  1: "Favorite zombie movie!"
// });
// database.ref("/reviews/genres/horror/The Devil's Rejects/0").set({
//  0: 4,
//  1: "this movie opened up a whole new list of movies I need to watch, loved it!"
// });


// database.ref("/reviews/genres/comedy/Tucker and Dale vs Evil/0").set({
//     0: 5,
//     1: "What a great movie! Great idea, tackling a movie from such a unique perspective"
// });

// database.ref("/reviews/genres/comedy/God Bless America/0").set({
//     0: 3,
//     1: "Loved it"
// });

// database.ref("/reviews/genres/comedy/What We Do in the Shadows/0").set({
//     0: 5,
//     1: "Awesome! 5/5 - there's also a tv show based off this movie, going to start that now too!"
// });

// database.ref("/reviews/genres/comedy/Cooties/0").set({
//     0: 1,
//     1: "Meh"
// });

// database.ref("/reviews/genres/comedy/John Dies at the End/0").set({
//     0: 5,
//     1: "will watch this again.. and again"
// });
// database.ref("/reviews/genres/comedy/The Voices/0").set({
//     0: 4,
//     1: "Great!"
// });

// database.ref("/reviews/genres/comedy/The House Bunny/0").set({
//     0: 5,
//     1: "If you liked Mean Girls, you'll love this!"
// });
// database.ref("/reviews/genres/comedy/Sex Drive/0").set({
//     0: 2,
//     1: "weird"
// });
// database.ref("/reviews/genres/comedy/Burn After Reading/0").set({
//     0: 4,
//     1: "this movie opened up a whole new list of movies I need to watch, loved it!"
// });


// database.ref("/movies/genres/action").set({
//     0: "Ninja Assassin",
//     1: "13 Assassins",
//     3: "Headhunters",
//     4: "Outlander",
//     5: "Killing Gunther",
//     6: "Hardcore Henry",
//     7: "The Osiris Child",
// })
// horror roulette
var last_genre = ""
var child_name = ""

function roulette_horror() {
    database.ref("/movies/genres/horror").on("value", function (snapshot) {
        //creates the random number to grab from the DB
        let movie_list_length = snapshot.val().length
        const roulette_choice = Math.floor(Math.random() * (movie_list_length))

        //runs ajax call to look up the movie
        //runs utelly search for locations and name
        utelly(snapshot.val()[roulette_choice])
        omdb(snapshot.val()[roulette_choice])
        reviews_horror(snapshot.val()[roulette_choice])
    })
}

function roulette_comedy() {
    database.ref("/movies/genres/comedy").on("value", function (snapshot) {
        //creates the random number to grab from the DB
        let movie_list_length = snapshot.val().length
        const roulette_choice = Math.floor(Math.random() * (movie_list_length))

        //runs ajax call to look up the movie
        //runs utelly search for locations and name
        utelly(snapshot.val()[roulette_choice])
        omdb(snapshot.val()[roulette_choice])
    })
}

function roulette_action() {
    database.ref("/movies/genres/action").on("value", function (snapshot) {
        //creates the random number to grab from the DB
        let movie_list_length = snapshot.val().length
        const roulette_choice = Math.floor(Math.random() * (movie_list_length))

        //runs ajax call to look up the movie
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
        $(".display_show_name").empty();
        $(".display_show_streams").empty();
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
        //* PLOT
        $(".display_show_plot").empty();
        $(".display_show_plot").append(response.Plot)
        //* POSTER
        $(".display_show_poster").empty();
        $(".display_show_poster").append($("<img>").attr("src", response.Poster))
        //* YEAR
        roulette_year = response.Year
        roulette_rated = response.Rated
        roulette_actors = response.Actors
        $(".display_show_actors").empty();
        $(".display_show_actors").append($("<p>").text(response.Actors))
    });
}


function reviews_horror(x) {
    database.ref(`/reviews/genres/horror/${x}`).on("value", function (snapshot) {
        last_genre = '/reviews/genres/horror/'
        child_name = snapshot.numChildren()
        // displays reviews
        $(".display_reviews").empty();
        for (i = 0; i < snapshot.numChildren(); i++) {
            let stars = snapshot.val()[i][0];
            let comment = snapshot.val()[i][1];
            let newDiv = $("<div>").addClass("review")
            let starDiv = $("<div>").addClass("stars").attr("id", `${stars}stars`).text(`${stars} / 5`)
            let commentDiv = $("<div>").addClass("comment").text(comment)
            newDiv.append(starDiv, commentDiv)
            $(".display_reviews").append(newDiv);

        }

        // * review input
        $(".sumbit_review").empty();
        var newForm = $("<form class='col s12' onSubmit='reviewsub()'>")
        var rowDiv = $("<div class='row'>")

        var starInput = $("<div class='input-field col s2' id='selector_stars'>")
        var starSelector = $("<select>")
        for (i = 1; i < 6; i++) {
            starSelector.append($(`<option value=${i}>`).text(i))
        }
        var starLabel = $("<label>").text("stars")
        starInput.append(starSelector, starLabel)

        var commentInput = $("<div class='input-field col s8'>")
        var comment_input = $("<input type='text' class='comment_input'>").attr('id', x)
        var comment_label = $(`<label for=${x}>`).text("comment")
        commentInput.append(comment_input, comment_label)


        //        <button class="btn btn-large btn-register waves-effect waves-light" type="submit" name="action">Register
        // <i class="material-icons right">done</i>
        //    </button>
        var review_button_div = $("<div class='col s1'>")
        var review_button = $("<button class='waves-effect waves-light btn btn black  btn-large' type='submit' name='action'>").attr("id", "review_button")
        var review_b = $("<i class='material-icons left'>").text("add_circle_outline")
        review_button.append(review_b)
        review_button_div.append(review_button)

        rowDiv.append(starInput, commentInput, review_button_div)
        newForm.append(rowDiv)
        $(".sumbit_review").append(newForm)
        $('select').formSelect();
    })

};

function reviewsub() {
    event.preventDefault();
    let rating = $("#selector_stars option:selected").val();
    let comment = $(".comment_input").val();
    let show = $(".comment_input").attr("id")
    $(".comment_input").val('')

    database.ref(`${last_genre}${show}`).child(child_name).set({
        0: rating,
        1: comment
    })
    // console.log(`${last_genre}${show}`)

}

roulette_horror();
// selection function
$(document).ready(function () {
    $('select').formSelect();

    $("#search_roulette").click(function () {
        term = $("#selector_genre option:selected").val()
        console.log(term)

        if (term === "horror") {
            roulette_horror();
        } else if (term === "action") {
            roulette_action();
        } else if (term === "comedy") {
            roulette_comedy();
        }

    })

});