$(function() {

	/* **********************  Overlay Code ***************************** */
    $('#guranteeBtn').click(function(){
                
        $('div#overlay_lightbox').removeClass('overlayModalBkgd');
        $('div#overlay_background').fadeIn(400); 
        $('div#overlay_lightbox').fadeIn(400);
                                                                        
        return false;
        });
        
        $('#closeBox, #closeButton').click(function(){                                                     
	        $('div#overlay_lightbox').fadeOut(400);
	        $('div#overlay_background').fadeOut(400);
	        $('div#overlay_lightbox').addClass('overlayModalBkgd');                                                              
	        return false;
		});
    /* **********************  End Overlay Code ***************************** */
});   // End doc ready



/* **********************  Google Maps Code ***************************** */

	      var directionDisplay;
		  var directionsService = new google.maps.DirectionsService();
		  var map;
          var homeLatLng = new google.maps.LatLng(40.696476, -73.992462);
          var geocoder;
          var infowindow = new google.maps.InfoWindow();
          var marker;  

      function initialize() {
          geocoder = new google.maps.Geocoder();
		  directionsDisplay = new google.maps.DirectionsRenderer();
          var latlng = new google.maps.LatLng(40.730885, -73.997383);
		  
          var myloc = new google.maps.LatLng(41.850033, -87.6500523);
         
          var mapOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: true,
		    mapTypeControlOptions: {
			  style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			  position: google.maps.ControlPosition.BOTTOM_LEFT
		    }
          }
          map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		  directionsDisplay.setMap(map);	  
			
       
			// Get Films.xml
			$.ajax({
				type: "GET",
			  url: "Films.xml",
			  dataType: "xml",
			  success: function(xml) {
				// List film names in DOM
				$(xml).find('Film').each(function(){
				  var title = $(this).find('Cell').eq(0).text();
				  var filmYear = $(this).find('Cell').eq(1).text();
				  var lng = $(this).find('Cell').eq(10).text();
				  var lat = $(this).find('Cell').eq(9).text();
				  var filmBoroughStr = $(this).find('Cell').eq(11).text();
				  var filmBorough = $.trim(filmBoroughStr);				  
				  if( filmBorough == "Manhattan" || filmBorough == "manhattan"){                
					$('<span></span>').html('<a href="#" data-lng="'+lng+'" data-lat="'+lat+'" data-title="'+title+'" data-borough="'+filmBorough+'" data-year="'+filmYear+'">' +title+ '</a>').appendTo('.filmNames');
				  }
				  
				});
			  }			  
			});// End Get Films.xml
		   
		
		
		var titleVar = "Working Girl";
		// Get imdb
        $.ajax({
            type: "GET",
          /*url: "http://www.omdbapi.com/?t=Working Girl&r=xml",*/
		  url: "http://www.omdbapi.com/?t="+titleVar+"&r=xml",
          dataType: "xml",
          success: function(xmlIMDB) {
            // Get IMDB info
            $(xmlIMDB).find('movie').each(function(){
              var imdb_title = $(this).attr('title');
              var imdb_filmYear = $(this).attr('year');
              var imdb_plot = $(this).attr('plot');
              var imdb_rating = $(this).attr('imdbRating');
			  var imdb_votes = $(this).attr('imdbVotes');
			  $('.overlayContent .title').html(imdb_title);
			  $('.overlayContent .year .value').html(imdb_filmYear);
			  console.log('imdb_title: '+imdb_title);
			  console.log('imdb_plot: '+imdb_plot);
            });
          }
        }); // End Get imdb

        $('.filmNames span a').live("click", function(){ 
          //plot point of film
          thisLat = parseFloat($.trim($(this).attr('data-lat')));
          thisLng = parseFloat($.trim($(this).attr('data-lng')));
          thisYear = parseInt($(this).attr('data-year'));
          thisTitle = $(this).attr('data-title');
          thisBorough = $(this).attr('data-borough');
		  
		  codeLatLng();
        }); // end 'click' .filmNames span a

          function codeLatLng() {
			console.log('in codeLatLng');  
            var latlng = new google.maps.LatLng(thisLat, thisLng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  map.setZoom(17);
                  marker = new google.maps.Marker({
                      position: latlng,
                      map: map
                  });
				  infowindow.setContent('<p class="infoItem">Title: '+thisTitle+'</p><p class="infoItem">Borough: '+thisBorough+'</p><p class="infoItem">Year: '+thisYear+'</p><button class="getDir mapInfoBtn">Get Directions</button><button class="imdbInfo mapInfoBtn">More Info</button>');
                  infowindow.open(map, marker);
                }
              } else {
                alert("Geocoder failed due to: " + status);
              }
            });
          }     	  
		  
		  
		   function calcRoute() {
			var start = latlng;
			var end = myloc;
			var request = {
				origin:start,
				destination:end,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
			  if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			  }
			});
		  }
		  

		  $('.getDir').live("click", calcRoute); 
		  //$('.imdbInfo').live("click", showIMDB); 
		  
		  	$('.imdbInfo').live('click', function(){
				console.log('close');
				$('.overlayContent').fadeIn(600);
			});
		
			$('.visClose').live('click', function(){
				//console.log('close');
				$('.overlayContent').fadeOut(600);
			});		
		
		var styleDark = [
            {"featureType": "road.local", "stylers": [{ "visibility": "on" }, { "color": "#8a8280" }]},
            {"featureType": "water", "stylers": [{ "color": "#1B1E24" }, { "saturation": -60 },{ "lightness": 13 }]},
            {"elementType": "labels.text.fill", "stylers": [{ "color": "#808080" }, { "lightness": 69 }, { "saturation": 11 }, { "gamma": 2.29 }]},
			{"elementType": "labels.text.stroke", "stylers": [ { "visibility": "off" } ]},
            {"featureType": "poi", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }]},
            {"featureType": "landscape.man_made", "stylers": [{ "color": "#b37d80" }, { "saturation": -100 }, { "lightness": -64 }]},
            {"featureType": "road.highway", "stylers": [{ "color": "#a76380" }, { "saturation": -100 }, { "lightness": -47 }]},
			{"featureType": "poi", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ]},
            {"featureType": "road.arterial", "stylers": [{ "saturation": -8 }, { "gamma": 1.13 }, { "color": "#788080" }, { "lightness": -68 }]},
            {"featureType": "poi", "stylers": [{ "color": "#997f80" }, { "saturation": -49 }, { "lightness": -100 }]},
            {"elementType": "labels.text.fill", "stylers": [{ "color": "#808080" }, { "saturation": -39 }, { "lightness": 51 }]}
            ]

        // Set Map Style
        map.setOptions({styles: styleDark}); 
    }
	google.maps.event.addDomListener(window, 'load', initialize);
	
    /* **********************  End Google Maps Code ***************************** */ 
	
	//$('.imbdInfo').click(function(){console.log('more clicked')});