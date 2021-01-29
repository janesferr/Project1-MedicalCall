// var ApiKey = "AIzaSyDXS0MQbQDV5TGAIvkSsNESvhyGKeeQEf8";
// var queryUrl = "//maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=" + ApiKey;
// function initMap () {
//     $.ajax({
//         async: true,
//         url: queryUrl,
//         crossDomain: true,
//         dataType: 'jsonp',
//         method: "GET",
//         headers: {
//             'Access-Control-Allow-Origin': '*'
//         }
//     }).then(function (response) {
//         console.log(response);
//     });
// }

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;

function initMap() {
  const sydney = new google.maps.LatLng(-33.867, 151.195);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });
  const request = {
    location: sydney,
    radius: '500',
    type: ["hospital"],
  };
  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
}

function createMarker(place) {
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name);
    infowindow.open(map);
  });
}