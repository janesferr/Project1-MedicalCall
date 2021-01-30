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
  var queryUrl =
    "http://www.whateverorigin.org/get?url=" +
    encodeURIComponent(
      "http://www.communitybenefitinsight.org/api/get_hospitals.php?state=" +
        state
    );

  console.log("(fingers crossed) going to request", queryUrl);

  $.ajax({
    url: queryUrl,
    method: "GET",
    dataType: "jsonp",
  }).then(function (response) {
    var hospitals = JSON.parse(response.contents);
    console.log(
      "we found",
      hospitals.length,
      "hospital(s) in the great state of",
      state
    );
    $("#discoverer").html(
      `Discover Our Hospitals in ${state} with total number of hospitals as ${hospitals.length}`
    );
    renderHospitalCards(hospitals);
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

function print_state_hospital_info(state) {
  var queryUrl =
    "http://www.whateverorigin.org/get?url=" +
    encodeURIComponent(
      "http://www.communitybenefitinsight.org/api/get_hospitals.php?state=" +
        state
    );

  console.log("going to request:", queryUrl);

  $.ajax({
    url: queryUrl,
    method: "GET",
    dataType: "jsonp",
  }).then(function (response) {
    var hospitals = JSON.parse(response.contents);
    console.log("we found", hospitals.length, "in the great state of", state);

    // hospitals.forEach(hospital => {
    //     console.log('Hospital Name:', hospital.name);
    //     console.log('Street Address:', hospital.street_address);
    //     console.log('Bed Count:', hospital.hospital_bed_count);
    //     console.log('--++--');
    // });
  });
}
