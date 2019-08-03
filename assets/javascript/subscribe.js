// Firebase Configuration
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


// Initial Values
var firstName= "";
var lastName = "";
var email = "";


// Capture button click
$("#add-user").on("click", function(event) {
    event.preventDefault();
console.log("user added")

// Store and retrieve most recent user data
firstName = $("#first-name").val().trim();
lastName = $("#last-name").val().trim();
email = $("#email-address").val().trim();


// Code for the push
database.ref("/subscription").push({

    firstName: firstName,
        lastName: lastName,
        email: email, 
       

}); 
});