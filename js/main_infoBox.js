/*!
* Project - Object Info
*/

  var city = (function ($) {
    // Variables - Variables available throughout the scope of this object
    // -------------------------------------------------------------------
    var svg = d3.select("svg"),
	 	// set up initial data for each decade
		sixties = [{id: "bronx", value: 10},{id: "brooklyn", value: 90},{id: "queens", value: 60},{id: "manhattan", value: 173},{id: "statenIsland", value: 3}],
		seventies = [{id: "bronx", value: 20},{id: "brooklyn", value: 120},{id: "queens", value: 80},{id: "manhattan", value: 143},{id: "statenIsland", value: 10}],
		eighties = [{id: "bronx", value: 50},{id: "brooklyn", value: 10},{id: "queens", value: 70},{id: "manhattan", value: 123},{id: "statenIsland", value: 5}],
		ninties = [{id: "bronx", value: 20},{id: "brooklyn", value: 50},{id: "queens", value: 20},{id: "manhattan", value: 113},{id: "statenIsland", value: 2}],
		twoThous = [{id: "bronx", value: 70},{id: "brooklyn", value: 70},{id: "queens", value: 90},{id: "manhattan", value: 73},{id: "statenIsland", value: 6}],
		
		// set up initial bars with sixties data
		bars = svg.selectAll("rect")
		.data(sixties)
		.enter()
		.append("rect")
		.attr({
		  width: 40,
		  height: function(v,i) {
			return v.value;
		  },
		  transform: function(v,i) {
			var x =  i * 60 + 100;
			var y = 100;
			return "translate(" + [x, y] + ")";
		  }
		})
		.classed("bars", true);
    
    
    
    // Init - Anything you want to happen onLoad (usually event bindings)
    // -------------------------------------------------------------------
    var init = function () {
      clickDecade();	  
	   /* **********************  Overlay Code ***************************** */
		/*$('#guranteeBtn').click(function(e){
			e.preventDefault();		
			$('div#overlay_lightbox').removeClass('overlayModalBkgd');
			$('div#overlay_background').fadeIn(400); 
			$('div#overlay_lightbox').fadeIn(400);
		});*/
		
		$('#closeBox, #closeButton').click(function(e){
			e.preventDefault();                                                     
			$('div#overlay_lightbox').fadeOut(400);
			$('div#overlay_background').fadeOut(400);
			$('div#overlay_lightbox').addClass('overlayModalBkgd');
		});
		
		
		
		$(window).resize(function() {
		  if ($(window).width() >= 768){
			return;
		  }
			$('.mToggle, .mToggleItem').hover(
			function(){$('.mToggleItem').show();},
			function(){$('.mToggleItem').hide();});		  
		});


		
		$('.sceneInfo').each(function( index ) {
		  var thisWidth = 100 * index,
		  	  start = 	  thisWidth +100,
		      $this =     $(this);
		   
		  if(index == 3){
			 $this.css({'clip':'rect(0px, 800px, 500px,'+ start +'px)'});
		  }else{			
			 $this.css({'clip':'rect(0px, '+ thisWidth +', 500px, '+ thisWidth +'100px)'}); 
		  }		  
		 
		});
    /* **********************  End Overlay Code ***************************** */     
    };
    
    // FUNCTIONS
    // ===================================================================
    
    // Public Example - Example public function
    // -------------------------------------------------------------------
    var clickDecade = function(){
		d3.selectAll('button.decadeBtn')
				.on("click", function() {
					var currentDecadeName = $(this).attr('data-decade'),
						index = $(this).index(),
						decadeArr = [sixties, seventies, eighties, ninties, twoThous];						
						
					switch (currentDecadeName)
					{
					case 'sixties':
					  console.log('currentDecadeName: '+ currentDecadeName);
					  
					  break;
					case 'seventies':
					  console.log('currentDecadeName: '+ currentDecadeName);
					  break;
					case 'eighties':
					  console.log('currentDecadeName: '+ currentDecadeName);
					  break;
					case 'ninties':
					  console.log('currentDecadeName: '+ currentDecadeName);
					  break;
					case 'twoThous':
					  console.log('currentDecadeName: '+ currentDecadeName);
					  break;					
					}
					console.log('index: '+ index);
					console.log('decadeArr[index]: '+ decadeArr[index]);
				  	
				  	svg.selectAll("rect.bars")
					.data(decadeArr[index], function(d) { return d.id })
					.transition()
					.duration(1499)
					.ease("bounce")
					.attr({
					  height: function(d,i) {
					  return d.value;
					  }
					});
				})
			}
    // Private Example - Example private function that's not exposed
    // -------------------------------------------------------------------
    var getCurrDec = function (currentDecadeName){
						var currentData = currentDecadeName;
						console.log('current data in currentDecade function: '+ currentData[0].value);
						console.log('current data in currentDecadeName function: '+ currentDecadeName[0].value);
						return currentData;
					}
    
    
    
    
    
    // CLEANUP
    // ===================================================================

    // Return - Which variables and objects to make available publicly
    // -------------------------------------------------------------------
    return {
      init              : init	  
    };
  })(jQuery);


$(document).ready(function () {    city.init();    });



/* **********************  Google Maps Code ***************************** */

	      var directionDisplay;
		  var directionsService = new google.maps.DirectionsService();
		  var map;
		  var currentFilmArr = [];
          var markersArray = [];
          var geocoder;
          var infowindow = new google.maps.InfoWindow();
          var marker;  

      function initialize() {
          geocoder = new google.maps.Geocoder();
		  directionsDisplay = new google.maps.DirectionsRenderer();
          var latlng = new google.maps.LatLng(40.730885, -73.997383);
		  //var latlng = new google.maps.LatLng(-34.397, 150.644);
          //var myloc = new google.maps.LatLng(41.850033, -87.6500523);
		  var mylocAddr = 'brooklyn, ny';          
          var mapOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		  //moreInfoBtn = $('.imbdInfo');
		  directionsDisplay.setMap(map);
		 // google.maps.event.addDomListener(moreInfoBtn, 'click', showAlert);		  
			
        var filmInfo = [];
		function getFilmInfo(){
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
		   
		}
		getFilmInfo();		 
		
		$('.filmNames span a').live("click", parseLink); // end 'click' .filmNames span a
		
		function parseLink(){
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
			  var imdb_img = $(this).attr('poster');
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
		}
		
          function codeLatLng() {
			console.log('in codeLatLng');  
            var latlng = new google.maps.LatLng(thisLat, thisLng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                  map.setZoom(17);
                 /* marker = new google.maps.Marker({
                      position: latlng,
                      map: map,
					  visible: true
                  });
				  var markerOptions = {
					    disableAutoPan: false
						,maxWidth: 0
						,pixelOffset: new google.maps.Size(-140, 0)
						,zIndex: null
						,boxStyle: { 
						  background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat"
						  ,opacity: 0.75
						  ,width: "280px"
						 }
						,closeBoxMargin: "10px 2px 2px 2px"
						,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
						,infoBoxClearance: new google.maps.Size(1, 1)
						,isHidden: false
						,pane: "floatPane"
						,enableEventPropagation: false
				};
				  map.setCenter(latlng);
				  infowindow.setContent('<p class="infoItem">Title: '+thisTitle+'</p><p class="infoItem">Borough: '+thisBorough+'</p><p class="infoItem">Year: '+thisYear+'</p><button class="getDir mapInfoBtn" data-lat="'+thisLat+'" data-lng="'+thisLng+'">Get Directions</button><button class="imdbInfo mapInfoBtn">More Info</button><div class="overlayContent userLoc"><label for="start">Start</label><input type="text" name="start" id="start" value="brooklyn, ny"><button class="userLocation">Go</button></div>');
                  infowindow.setOptions(markerOptions);
				  infowindow.open(map, marker);*/
				  
				  var marker = new google.maps.Marker({
						 map: map,
						 draggable: true,
						 position: latlng,
						 visible: true
						});
								
						var boxText = document.createElement("div");
						boxText.style.cssText = "border: 1px solid #666; margin-top: 0px; background: rgba(0,0,0,0.6; padding: 5px;";
						boxText.innerHTML = '<p class=\"infoItem\">Title: '+thisTitle+'</p><p class=\"infoItem\">Borough: '+thisBorough+'</p><p class=\"infoItem\">Year: '+thisYear+'</p><button class="getDir mapInfoBtn" data-lat="'+thisLat+'" data-lng="'+thisLng+'">Get Directions</button><span class="imdbInfo mapInfoBtn">More Info</span><div class="overlayContent userLoc"><label for="start">Start</label><input type="text" name="start" id="start" value="brooklyn, ny"><button class="userLocation">Go</button></div>';
								
						var myOptions = {
								 content: boxText
								,disableAutoPan: false
								,maxWidth: 0
								,pixelOffset: new google.maps.Size(-140, 0)
								,zIndex: null
								,boxStyle: { 
								  background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat"
								  ,width: "auto"
								  ,height: "auto"
								 }
								,closeBoxMargin: "10px 2px 2px 2px"
								,closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif"
								,infoBoxClearance: new google.maps.Size(1, 1)
								,isHidden: false
								,pane: "floatPane"
								,enableEventPropagation: false
						};
				
						var ib = new InfoBox(myOptions);
						ib.open(map, marker);
                }
              } else {
                alert("Geocoder failed due to: " + status);
              }
            });
          }     	  
		  
		  
		   function calcRoute() {			    
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
						handleNoGeolocation(true);
					  });
					} else {
					  // Browser doesn't support Geolocation
					  handleNoGeolocation(false);
					}
				}	
				    
			  
			  
			 function handleNoGeolocation(errorFlag) {
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
					  }
			  
			  function showDir(start, end){
				  var request = {
					origin:start,
					destination:end,
					travelMode: google.maps.DirectionsTravelMode.DRIVING
				};
				directionsService.route(request, function(response, status) {
				  if (status == google.maps.DirectionsStatus.OK) {
					  console.log('directions okay');
					directionsDisplay.setDirections(response);
				  }
				});
			  }	
		  
		  
		  function getUserLoc(){
			  userLoc = null;
			  $('.overlayContent.userLoc').fadeIn(600);	
			  $('.userLocation').live("click", function(){
				  userLoc = $(this).siblings('input').attr('value');
				  console.log('go clicked');
				  console.log('location: '+ userLoc);
				  /*var xyz = $(this).siblings('input').attr('value');				  
				  return xyz;*/
			  });
			  return userLoc;
			  
			  /*return userLoc;*/		  
		  }
		
		  //$('.getDir').live("click", calcRoute); 
		  //$('.infoBox').on('click','.getDir', calcRoute); 
		  $('.getDir').live('click',calcRoute);
		  //$('.imdbInfo').live("click", showIMDB); 
		  
		  	$('.imdbInfo').live('click', function(){
				console.log('close');
				$('.overlayContent.imdbContent').fadeIn(600);
			});
		
			$('.visClose').live('click', function(){
				//console.log('close');
				$('.overlayContent.imdbContent').fadeOut(600);
			});		
		
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
	google.maps.event.addDomListener(window, 'load', initialize);
	
    /* **********************  End Google Maps Code ***************************** */ 