$(function() {
  /*var soundControls = $('.soundControls');
	
	soundControls.animate({
		opacity: 1
	},600);*/
	
/*    var mainFlashInterval=self.setInterval(function(){mainFlashAnim()},10);
	var flashState = 1;
	function mainFlashAnim(){
		if (flashState == 1){

			$('.mainFlash').animate({'opacity': '0.5'},100);

		}else{
			$('.mainFlash').animate({'opacity': '1'},100);
		}		
		flashState *= -1;		
	}*/	

	/*$('.visualize').on('click', function(){
		//console.log('close');
		$('#boroughVisual').fadeIn(600);
	});

	$('.visClose').on('click', function(){
		//console.log('close');
		$('#boroughVisual').fadeOut(600);
	});
	*/

  $('.mainImg img').hover(function(){
        $(this).animate({
          'opacity': 0.8
        },500);
        $('.mainDesc').animate({
          'opacity': 1
        },500);
  },function(){
        $(this).animate({
          'opacity': 1
        },500);
        $('.mainDesc').animate({
          'opacity': 0.8
        },500);
  })
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
	
	
	/*	function getFilmInfo(){
		// Get Films.xml
		manTotal60 = 0;
		manTotal70 = 0;
		manTotal80 = 0;
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
			  if( (filmBorough == "Manhattan" || filmBorough == "manhattan")&& (filmYear < 1970)){                manTotal60++;
			  }	
			  if( (filmBorough == "Manhattan" || filmBorough == "manhattan")&& (filmYear >= 1970 && filmYear <1980)){                manTotal70++;
			  }	
			  if( (filmBorough == "Manhattan" || filmBorough == "manhattan")&& (filmYear >= 1980 && filmYear <1990)){                manTotal80++;
			  }			  
			});
		  }			  		  
		});// End Get Films.xml		   
	}
	getFilmInfo();*/
	
	
	
});   // End doc ready







/* **********************  Google Maps Code ***************************** */

	      var map;
          var markersArray = [];
          var homeLatLng = new google.maps.LatLng(40.696476, -73.992462);
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

     

          function codeLatLng() {
            var latlng = new google.maps.LatLng(thisLat, thisLng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
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

    /* **********************  End Google Maps Code ***************************** */ 