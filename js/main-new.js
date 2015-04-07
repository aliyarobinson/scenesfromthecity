var SC = {};

(function($){ // SEF
	var filmInfo
	, map
	, marker;

	SC = {

		filmInfo: [],
		markerArray: [],
		styleDark: [
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
        ],

		init: function(){
			$( window ).resize(function() {
			});

			var callbacks = $.Callbacks();
			/*******************************************/
			/*    Load Map                             */
			/*******************************************/
			callbacks.add( SC.showMap );

			/*******************************************/
			/*    Load Films                           */
			/*******************************************/
			callbacks.add( SC.getFilms );

			/*******************************************/
			/*    Call Functions in order              */
			/*******************************************/
			callbacks.fire();
			SC.bindEvents();
			

		},

		showMap: function(){
			  var mapOptions = {
			    zoom: 12,
			    center: new google.maps.LatLng(40.730885, -73.997383),
			    styles: SC.styleDark
			  };
			  map = new google.maps.Map(document.getElementById('map-canvas'),
			      mapOptions);

		},

		addMarker: function(location) {
			var marker = new google.maps.Marker({
			    position: location,
			    map: map
			});
			SC.markerArray.push(marker);
			marker.setMap(map);
		},

		setMarker: function(location) {
			SC.markerArray[i].setMap(map);
		},

		addMarkers: function(filmList) {
			for (i = 0; i < filmList.length; i++) { 
				var markerTitle = filmList[i].title
				, markerLat = filmList[i].lat
				, markerLng = filmList[i].lng
				, markerLatlng = new google.maps.LatLng(markerLat, markerLng);

				SC.addMarker(markerLatlng);
			}

		},

		buildFilmList: function(filmList) {
			for (i = 0; i < filmList.length; i++) { 
				var filmItemTmpl = $('#filmItemTmpl').html(),
					item = Mustache.render(filmItemTmpl, filmList[i]);
				$('.filmNames select').append(item);
			}
		},

		getFilms: function() {
			$.ajax({
				type: "GET",
			  	url: "Films.xml",
			  	dataType: "xml",
			  	success: function(xml) {
					var filmsData = $(xml).find('Film');

					for (i = 0; i < filmsData.length; i++) { 
					  var el = filmsData[i]
					  , titleStr = $(el).find('Cell').eq(0).text()
					  , title = $.trim(titleStr)
					  , filmYearStr = $(el).find('Cell').eq(1).text()
					  , filmYear = $.trim(filmYearStr)
					  , lngStr = $(el).find('Cell').eq(10).text()
					  , lng = $.trim(lngStr)
					  , latStr = $(el).find('Cell').eq(9).text()
					  , lat = $.trim(latStr)
					  , filmBoroughStr = $(el).find('Cell').eq(11).text()
					  , filmBorough = $.trim(filmBoroughStr)
					  , imdbURLStr = $(el).find('Cell').eq(15).text()
					  , imdbStrArry = imdbURLStr.split('/')
					  , imdbStr = imdbStrArry[imdbStrArry.length - 2]
					  , id = $.trim(imdbStr);
					  
					  SC.filmInfo.push(
						  {
						  	"title": title,
						  	"filmYear": filmYear,
						  	"lng": lng,
						  	"lat": lat,
						  	"filmBorough": filmBorough,
						  	"imdbURL": imdbURLStr,
						  	"imdbId": id
						  }
					  );
					}
					SC.buildFilmList(SC.filmInfo);
					SC.addMarkers(SC.filmInfo);
					console.log('markerArray: ', SC.markerArray);

			  	},
			  	error : function(){console.log('error in parsing omdb info.');}	  
				
			});// End Get Films.xml

		},

		bindEvents: function(){
			$( ".filmNames select" )
			  .change(function () {

			    var str = "",
			    	idVal = "",
			    	markerIdx,
			    	filmLoc = "";

			    $( "select option:selected" ).each(function() {
			      str += $( this ).text() + " ";
			      idVal = $(this).val();
			      markerIdx = $(this).index();

			      var mLat = SC.markerArray[markerIdx].position.D
			      	, mLng = SC.markerArray[markerIdx].position.k;

			      filmLoc = new google.maps.LatLng(mLat, mLng);
			      console.log('filmLoc: ', filmLoc);

			      SC.clearMarkers();
			      SC.addMarker(filmLoc);
			    });
			    console.log( str );
			    console.log( idVal );
			    console.log( markerIdx );
			  })
			  .change();
			  
		},

		clearMarkers: function() {
			console.log('clearMarkers');
		  SC.setAllMap(null);
		},

		setAllMap: function(map) {
			console.log('setAllMap: ', map);

		  for (var i = 0; i < SC.markerArray.length; i++) {
		    SC.markerArray[i].setMap(map);
		  }
		},

		scrollTo: function(elem){
			$('html,body').animate({                                                             
	        	scrollTop: $(elem).offset().top
	        }, 1000);
		}
	}

})(jQuery); // End SEF


$(function() {
	SC.init();
});
