      /*function detectBrowser() {
        var useragent = navigator.userAgent;
        var mapdiv = document.getElementById("map_canvas");
        var mapOverlayDiv = document.getElementById("map_canvasOverlay");

        if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
          mapdiv.style.width = '100%';
          mapdiv.style.height = '100%';
          mapOverlayDiv.style.width = '100%';
          mapOverlayDiv.style.height = '100%';
        } else {
          mapdiv.style.width = '1200px';
          mapdiv.style.height = '800px';
          mapOverlayDiv.style.width = '1200px';
          mapOverlayDiv.style.height = '800px';
        }
      }*/

      var map;
          var markersArray = [];
          var markersArray_wAllen = [];
          var markersArray_sLee = [];
          var homeLatLng = new google.maps.LatLng(40.696476, -73.992462);
          var sLeeLatLng1 = new google.maps.LatLng(40.695478, -73.991472);
          var sLeeLatLng2 = new google.maps.LatLng(40.697486, -73.992861);
          var sLeeLatLng3 = new google.maps.LatLng(40.694469, -73.991469);
          var viewSpikeLee = false;
          var geocoder;
          var infowindow = new google.maps.InfoWindow();
          var marker;  

      function initialize() {
          geocoder = new google.maps.Geocoder();
          // var latlng = new google.maps.LatLng(40.730885,-73.997383);
          var latlng = new google.maps.LatLng(-34.397, 150.644);
          var mapOptions = {
            zoom: 8,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

        // Get Films.xml
        $.ajax({
            type: "GET",
          url: "Films.xml",
          dataType: "xml",
          success: function(xml) {
            console.log('success');

            // List film names
            $(xml).find('Film').each(function(){
              var title = $(this).find('Cell').eq(0).text();
              var filmYear = $(this).find('Cell').eq(1).text();
              var lng = $(this).find('Cell').eq(9).text();
              var lat = $(this).find('Cell').eq(10).text();
              var filmBoroughStr = $(this).find('Cell').eq(11).text();
              var filmBorough = $.trim(filmBoroughStr);
              if( filmBorough == "Manhattan" || filmBorough == "manhattan"){
                //$('<span></span>').html('<a href="#">' +title+ '</a>').appendTo('.filmNames');
                
                $('<span></span>').html('<a href="#" data-lon="'+lng+'" data-lat="'+lat+'" data-title="'+title+'" data-borough="'+filmBorough+'" data-year="'+filmYear+'">' +title+ '</a>').appendTo('.filmNames');
              }
            });
          }
        }); // End Get Films.xml

        $('.filmNames span a').live("click", function(){ 
          //plot point of film
          thisLat = parseInt($.trim($(this).attr('data-lat')));
          thisLng = parseInt($.trim($(this).attr('data-lng')));
          thisYear = parseInt($(this).attr('data-year'));
          thisTitle = $(this).attr('data-title');
          thisBorough = $(this).attr('data-borough');
		  
		  codeLatLng();
        }); // end 'click' .filmNames span a


          

          function codeLatLng() {
            /*var input = document.getElementById("latlng").value;
            var latlngStr = input.split(",",2);
            var lat = parseFloat(latlngStr[0]);
            var lng = parseFloat(latlngStr[1]);*/
			alert("This Title: " + thisTitle);
            var latlng = new google.maps.LatLng(thisLat, thisLng);
			//var latlng = new google.maps.LatLng(40.696476, -73.992462);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
					alert("Success!!");
                  map.setZoom(17);
                  marker = new google.maps.Marker({
                      position: latlng,
                      map: map
                  });
                  infowindow.setContent(results[1].formatted_address);
                  infowindow.open(map, marker);
                }
              } else {
                alert("Geocoder failed due to: " + status);
              }
            });
          }
        var styleDark = [
            {"featureType": "road.local", "stylers": [{ "visibility": "on" }, { "color": "#8a8280" }]},
            {"featureType": "water", "stylers": [{ "color": "#405c80" }, { "saturation": -78 },{ "lightness": 4 }]},
            {"elementType": "labels.text.fill", "stylers": [{ "color": "#808080" }, { "lightness": 69 }, { "saturation": 11 }, { "gamma": 2.29 }]},
            {"featureType": "poi", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }]},
            {"featureType": "landscape.man_made", "stylers": [{ "color": "#b37d80" }, { "saturation": -100 }, { "lightness": -64 }]},
            {"featureType": "road.highway", "stylers": [{ "color": "#a76380" }, { "saturation": -100 }, { "lightness": -47 }]},
            {"elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "gamma": 1.6 }, { "color": "#e27f79" }, { "saturation": 61 }, { "lightness": -57 }]},
            {"featureType": "road.arterial", "stylers": [{ "saturation": -8 }, { "gamma": 1.13 }, { "color": "#788080" }, { "lightness": -68 }]},
            {"featureType": "poi", "stylers": [{ "color": "#997f80" }, { "saturation": -49 }, { "lightness": -100 }]},
            {"elementType": "labels.text.fill", "stylers": [{ "color": "#808080" }, { "saturation": -39 }, { "lightness": 51 }]}
            ]

        // Set Map Style
        map.setOptions({styles: styleDark}); 
    }

     

     
      
