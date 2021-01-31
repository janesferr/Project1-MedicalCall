// things to do
// 1. Set an id attribute to the hospital search i.e. <input id="hospital_search_state">
// 2. Set a name and id attribute to the button that will search for hospitals
// 3. Add a click handler to the hospital search button that will take the TEXT from the search input as an input to the function.
//   3a. The function will make an $.ajax() call using a queryUrl that incorporates the input from the state
//   3b. Add a 'then()' to the $.ajax() that parses the response.contents to JSON.
//   3c. Loops through each hospital in hospitals using a forEach() print the details of each hospital as a card.

function click_hospitalSearch(event) {

  var state = $("#hospital_search_state").val();
  console.log("the user wants us to search for", state);

  // construct query
  var queryUrl = 'api/hospitals/' + state + '.json';
  console.log("(fingers crossed) going to request", queryUrl);

  $.ajax({
    url: queryUrl,
    method: "GET",
    crossDomain: true,
    // dataType: 'jsonp',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
  }).then(function (hospitals) {
    
    console.log("we found", hospitals.length, "hospital(s) in the great state of", state);
    $("#discoverer").html(
      `Discover Our Hospitals in ${state} with total number of hospitals as ${hospitals.length}`
    );
    renderHospitalCards(hospitals);
    updateMap(hospitals, state, 5);
  });
}

function renderHospitalCards(hospitals) {
  $("#hospital_row").empty();

  hospitals.forEach((hospital) => {
    $("#hospital_row").append(
      `<article class="six columns">
                <div class="panel">
                    <h3>${hospital.name}</h3>
                  <p class="hospital-name"> Hospital Name: ${hospital.name}</p>
                  <p class="hospital-address"> Street Address: ${hospital.street_address}</p>
                  <p class="state"> State: ${hospital.state}</p>
                  <p class="bed-count"> Bed count: ${hospital.hospital_bed_count}</p>

                  <a href="#" class="button secondary small radius">Learn More &raquo;</a>
                </div>
          </article>`
    );
  });
}

$("#hospital_search").on("click", click_hospitalSearch);

function updateMap(hospitals, state, limit) {

  //navigate to the state
  geocoder.geocode({ address: state }, (results, status) => {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
    } else {
      alert(
        "Geocode was not successful for the following reason: " + status
      );
    }
  });

  // add markers for the first 5 hospitals in the list.
  for (let index = 0; index < limit; index++) {
    const hospital = hospitals[index];
    const address = hospital.street_address + ", " + hospital.city + ", " + hospital.state + " " + hospital.zip_code;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        map.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      } else {
        alert(
          "Geocode was not successful for the following reason: " + status
        );
      }
    });
  }
}

var map = null;
var geocoder = null;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 40.554, lng: -91.037 },
  });
  
  geocoder = new google.maps.Geocoder();
}
    