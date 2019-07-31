const term = `bojack`;
const country = `us`;
$.ajax({
	url: `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${term}&country=${country}`,
	type: "GET",
	headers: {
		"x-rapidapi-host":
			"utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
		"x-rapidapi-key": "a938304903msh75973e6bdae1c2fp1808eejsnb0c393a11c6b"
	}
}).then(function(repsonse) {
	console.log(repsonse);
});
