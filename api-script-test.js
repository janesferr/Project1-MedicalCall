var queryUrl =
  // "http://www.whateverorigin.org/get?url=http://www.communitybenefitinsight.org/api/get_hospitals.php?state=NC";
  "http://www.whateverorigin.org/get?url=http://www.communitybenefitinsight.org/api/get_hospitals.php?zip_code";
$.ajax({
  url: queryUrl,
  method: "GET",
  crossDomain: true,
  dataType: "jsonp",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
}).then(function (response) {
  console.log(JSON.parse(response.contents));

  //  <input type="submit" class="button secondary" value="Search"
  $(".button").on("click", function () {
    var state = "NY";
    // <input class="input-group-field" type="search" />
    // var searchInput = $(".input-group-field").val();
    // <p class="populate-field">
    $(".populate-field").text(JSON.parse(response.contents[0]));
  });
  //   ARRAY FILTER
  //   const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
  // const result = words.filter(word => word.length > 6);
  // console.log(result);
  // expected output: Array ["exuberant", "destruction", "present"]
  const zipcodeArray = [response.contents.zip_code];
});
