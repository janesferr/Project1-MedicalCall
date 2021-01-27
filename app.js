var APIKey = "b1abf55b8712a810d9a06418c51f1338";

var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&user_key=" + APIKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log("queryURL", queryURL);
    console.log(response);
})