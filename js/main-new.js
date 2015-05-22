var SC = {};

(function($){ // SEF
	var filmInfo
	, map
	, marker
	, infowindow = new google.maps.InfoWindow()
	, geocoder = new google.maps.Geocoder();;

	SC = {

		filmInfo: [],
		rtInfo: [],
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

        /* HEAD Started here */
        contentString: '<div id="content">'+
	      '<div id="siteNotice">'+
	      '</div>'+
	      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
	      '<div id="bodyContent">'+
	      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
	      'sandstone rock formation in the southern part of the '+
	      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
	      'south west of the nearest large town, Alice Springs; 450&#160;km '+
	      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
	      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
	      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
	      'Aboriginal people of the area. It has many springs, waterholes, '+
	      'rock caves and ancient paintings. Uluru is listed as a World '+
	      'Heritage Site.</p>'+
	      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
	      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
	      '(last visited June 22, 2009).</p>'+
	      '</div>'+
	      '</div>',

		infowindow: new google.maps.InfoWindow({
		      // content: SC.contentString
		      content: 'Content String'
		}),
		
		ibContent: 'IB Content String',

		ibOpts: {
			content: SC.ibContent
			,disableAutoPan: false
			,maxWidth: 0
			,pixelOffset: new google.maps.Size(-140, 0)
			,zIndex: null
			,boxStyle: { 
			  background: "url('tipbox.gif') no-repeat"
			  ,opacity: 0.75
			  ,width: "280px"
			 }
			,closeBoxMargin: "10px 2px 2px 2px"
			,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
			,infoBoxClearance: new google.maps.Size(1, 1)
			,isHidden: false
			,pane: "floatPane"
			,enableEventPropagation: false
		},

		ib: new InfoBox(SC.ibOpts),
/* Head ended here*/

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
			// SC.bindEvents();
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

		addMarker: function(thisFilm, location, lat, lng) {
			var loc = location,
				id = thisFilm.imdbId,
				marker = new google.maps.Marker({
				    position: location
				    , map: map
				});

			$.ajax({
				type: "GET",
			  	url: "http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?apikey=xm56ayynffqhjxmyv489hprj&type=imdb&id="+id,
			  	dataType: "jsonp",
			  	// async: false,
			  	success: function(data) {
			  		console.log('addMarker - data: ', data);
					for (i = 0; i < data.length; i++) { 
					  var el = data[i]
					  , plotStr = $(el).find('Cell').eq(0).text()
					  , plot = $.trim(titleStr)
					  , critiqueStr = $(el).find('Cell').eq(1).text()
					  , critique = $.trim(filmYearStr);

					  
					  // SC.rtInfo.push(
						 //  {
						 //  	"plot": plot,
						 //  	"critique": critique
						 //  }
					  // );
					}
				},
			  	error : function(){console.log('error in parsing rt info.');}
			});// End Get rt 
			
			var filmItemTmpl = $('#infoBoxTmpl').html(),
					item = Mustache.render(filmItemTmpl, thisFilm);


			var myOptions = {
				 content: item
				,disableAutoPan: false
				,maxWidth: 0
				,pixelOffset: new google.maps.Size(-140, 0)
				,zIndex: null
				,boxStyle: { 
				  /*background: "url('tipbox.gif') no-repeat"
				  ,*/opacity: 0.75
				  ,width: "280px"
				 }
				,closeBoxMargin: "10px 2px 2px 2px"
				,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
				,infoBoxClearance: new google.maps.Size(1, 1)
				,isHidden: false
				,pane: "floatPane"
				,enableEventPropagation: false
			};
			var ib = new InfoBox(myOptions);
			// SC.showInfoBox(marker);
			// map.set({center: location});
			// map.setCenter({lat: -34, lng: 151});


			google.maps.event.addListener(marker, 'click', function() {
			    // SC.infowindow.open(map,marker);

			    // for(i=0; i<= SC.markerArray.length; i++){
			    // 	console.log('markerArray[i]: ', SC.markerArray[i]);
			    // 	// SC.markerArray[i].setVisible(false);
			    // }

				ib.open(map, marker);
			});

			SC.markerArray.push(marker);
			// marker.setMap(map);
		},

		addNewMarker: function(location, lt, ln) {
			var loc = location,
				marker = new google.maps.Marker({
				    position: location
				    , map: map
				}),
				locObj = {lat: lt, lng: ln};
				// locObj = {lat: Number(lt), lng: Number(ln)};
			// SC.showInfoBox(marker);
			// map.set({center: loc});

			// map.setCenter({lat: 40.730885, lng: -73.997383});
			// map.setCenter(locObj);
			SC.markerArray.push(marker);
			// marker.setMap(map);
		},

		hideInfoBox: function(ibObj) {

		},

		setMarker: function(location, idx) {
			SC.markerArray[idx].setMap(map);
			// map.setCenter(location);
		},

		addMarkers: function(filmList) {
			for (i = 0; i < filmList.length; i++) { 
				var markerTitle = filmList[i].title
				, markerBorough = filmList[i].filmBorough
				, markerYear = filmList[i].filmYear
				, markerID = filmList[i].imdbId
				, markerLat = filmList[i].lat
				, markerLng = filmList[i].lng
				, markerLatlng = new google.maps.LatLng(markerLat, markerLng);

				SC.addMarker(filmList[i], markerLatlng, markerLat, markerLng);
			}
		},

		buildFilmList: function(filmList) {
			for (i = 0; i < filmList.length; i++) { 
				var filmItemTmpl = $('#filmItemTmpl').html(),
					item = Mustache.render(filmItemTmpl, filmList[i]);
				$('.filmNames select').append(item);
			}
		},

		getRTFilms: function(filmID) {
			var filmIdStr = filmID;
			$.ajax({
				type: "GET",
			  	url: "http://api.rottentomatoes.com/api/public/v1.0/movie_alias.json?apikey=xm56ayynffqhjxmyv489hprj&type=imdb&id="+filmIdStr,
			  	dataType: "jsonp",
			  	success: function(data) {
			  		console.log('getRTFilms - data: ', data);
					for (i = 0; i < data.length; i++) { 
					  var el = data[i]
					  , plotStr = $(el).find('Cell').eq(0).text()
					  , plot = $.trim(titleStr)
					  , critiqueStr = $(el).find('Cell').eq(1).text()
					  , critique = $.trim(filmYearStr);

					  
					  SC.rtInfo.push(
						  {
						  	"plot": plot,
						  	"critique": critique
						  }
					  );
					}
				},
			  	error : function(){console.log('error in parsing rt info.');}
			});// End Get rt 
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
					  , id = $.trim(imdbStr).replace('tt','');

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
					SC.bindEvents(SC.filmInfo);
					SC.buildFilmList(SC.filmInfo);
					SC.addMarkers(SC.filmInfo);
					// console.log('markerArray: ', SC.markerArray);

			  	},
			  	error : function(){console.log('error in parsing film xml info.');}	  
				
			});// End Get Films.xml
		},

		codeLatLng: function(lat, lng, content) {
			console.log('in codeLatLng');  
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  map.setZoom(17);
                  marker = new google.maps.Marker({
                      position: latlng,
                      map: map
                  });
				  map.setCenter(latlng);
				  //infowindow.setContent('<p class="infoItem">Title: '+thisTitle+'</p><p class="infoItem">Borough: '+thisBorough+'</p><p class="infoItem">Year: '+thisYear+'</p><button class="getDir mapInfoBtn" data-lat="'+thisLat+'" data-lng="'+thisLng+'">Get Directions</button><button class="imdbInfo mapInfoBtn">More Info</button><div class="overlayContent userLoc"><label for="start">Start</label><input type="text" name="start" id="start" value="brooklyn, ny"><button class="userLocation">Go</button></div>');
				  infowindow.setContent('<p class="infoItem">Title: '+thisTitle+'</p><button class="getDir mapInfoBtn" data-lat="'+thisLat+'" data-lng="'+thisLng+'">Get Directions</button><button class="imdbInfo mapInfoBtn">More Info</button><div class="overlayContent userLoc"><label for="start">Start</label><input type="text" name="start" id="start" value="brooklyn, ny"><button class="userLocation">Go</button></div>');
                  infowindow.open(map, marker);
                }
              } else {
                alert("Geocoder failed due to: " + status);
              }
            });
        }, 

		bindEvents: function(filmInfo){
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
			      SC.codeLatLng(mLat,mLng,'New Content');

			      SC.clearMarkers();
			      // SC.addMarker(filmLoc);
			      
			      // SC.addNewMarker(filmLoc, mLat, mLng);
			      // SC.setMarker(filmLoc,markerIdx);
			      
			      // SC.codeLatLng(mLat,mLng,'New Content');
			    });
			    console.log( str );
			    console.log( idVal );
			    console.log( markerIdx );
			  })
			  .change();
			
			// $().on('click', function(){

			// });  
		},

		// showInfoBox: function(marker) {
		// 	infowindow.setContent(SC.contentString);
  //           infowindow.open(map, marker);
		// },

		clearMarkers: function() {
			console.log('clearMarkers');
		  SC.setAllMap(null);
		  InfoBox.prototype.close();
		},

		setAllMap: function(map) {
			console.log('setAllMap: ', map);

		  for (var i = 0; i < SC.markerArray.length; i++) {
		    SC.markerArray[i].setMap(map);
		  }
		},

		calcRoute: function() {			    
		    //get and set user location - HTML5 geolocation
			$this = $(this);
			if(navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);		
													
				//get and set movie location
				var lat = $this.attr('data-lat');
				var lng = $this.attr('data-lng');
				var movieLoc = new google.maps.LatLng(lat, lng);					
				
				var start = pos;
				var end = movieLoc;
				var request = {
					origin:start,
					destination:end,
					travelMode: google.maps.DirectionsTravelMode.DRIVING
				};
				map.setCenter(pos);
				directionsService.route(request, function(response, status) {
				  if (status == google.maps.DirectionsStatus.OK) {
					  console.log('directions okay');
					directionsDisplay.setDirections(response);
				  }					
				});
			  }, function() {
				SC.handleNoGeolocation(true);
			  });
			} else {
			  // Browser doesn't support Geolocation
			  SC.handleNoGeolocation(false);
			}
		},

		handleNoGeolocation: function(errorFlag) {
			if (errorFlag) {
			  var content = 'Error: The Geolocation service failed.';
			} else {
			  var content = 'Error: Your browser doesn\'t support geolocation.';
			}

			var options = {
			  map: map,
			  position: new google.maps.LatLng(60, 105),
			  content: content
			};

			var infowindow = new google.maps.InfoWindow(options);
			map.setCenter(options.position);
	  	},

	  // 	showDir: function(start, end) {
			// var request = {
			// 	origin:start,
			// 	destination:end,
			// 	travelMode: google.maps.DirectionsTravelMode.DRIVING
			// };
			// directionsService.route(request, function(response, status) {
			//   if (status == google.maps.DirectionsStatus.OK) {
			// 	  console.log('directions okay');
			// 	directionsDisplay.setDirections(response);
			//   }
			// });
	  // 	},

	 //  	getUserLoc: function() {
		// 	userLoc = null;
		// 	$('.overlayContent.userLoc').fadeIn(600);	
		// 	$('.userLocation').live("click", function(){
		// 		userLoc = $(this).siblings('input').attr('value');
		// 		console.log('go clicked');
		// 		console.log('location: '+ userLoc);
		// 	});

		// 	return userLoc;
		// },	

		parseLink: function(){
		  	thisLat = parseFloat($.trim($(this).attr('data-lat')));
          	thisLng = parseFloat($.trim($(this).attr('data-lng')));
          	thisYear = parseInt($(this).attr('data-year'));
          	thisTitle = $(this).attr('data-title');
          	thisBorough = $(this).attr('data-borough');
		  
		  	// Get imdb
	        $.ajax({
	            type: "GET",
			  url: "http://www.omdbapi.com/?r=xml",
			  data:{'t':thisTitle},
	          dataType: "xml",
	          success: function(xmlIMDB, thisTitle) {
	            console.log('success');

	            // Get IMDB info
	            $(xmlIMDB).find('movie').each(function(){
	              var imdb_title = $(this).attr('title');
	              var imdb_filmYear = $(this).attr('year');
				  var imdb_director = $(this).attr('director');
	              var imdb_plot = $(this).attr('plot');
	              var imdb_rating = $(this).attr('imdbRating');
				  var imdb_votes = $(this).attr('imdbVotes');
				  //var imdb_img = $(this).attr('poster');
				  var imdb_imgURI = $(this).attr('poster');
				  var imdb_img = unescape(encodeURIComponent(imdb_imgURI));
				  $('.overlayContent .title').html(imdb_title);
				  $('.overlayContent .dir .value').html(imdb_director);
				  $('.overlayContent .rating .value').html(imdb_rating);
				  $('.overlayContent .votes .value').html(imdb_votes);
				  $('.overlayContent .plot .value').html(imdb_plot);
				  $('.overlayContent .ltSide .imdbImg').attr('src', imdb_img);
	            });
	          }
	        }); // End Get imdb

		  	codeLatLng();
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
