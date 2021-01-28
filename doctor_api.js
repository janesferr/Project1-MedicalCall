const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://workable.p.rapidapi.com/%7BAPIKEY%7D/jobs?phase=published",
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "dc5fd21f53msh7bbcea559296c30p115f8ejsn62f1e1426758",
		"x-rapidapi-host": "workable.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});