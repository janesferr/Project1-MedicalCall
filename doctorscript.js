
    // var state = $(".input-group-field").val();
    var queryUrl = "http://www.whateverorigin.org/get?url=http://www.communitybenefitinsight.org/api/get_hospitals.php?state=NC"
        $.ajax({
            url: queryUrl,
            method: "GET",
            crossDomain: true,
            dataType: 'jsonp',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function(response) {
            // console.log(JSON.parse(response.contents));
            $("button").on( "click", function() {
                $(".populate-field").html(response.contents);
              });
        })