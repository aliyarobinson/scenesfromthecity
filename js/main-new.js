var SC = {};

(function($){ // SEF
	var filmInfo;

	SC = {

		filmInfo: [],

		init: function(){

			$( window ).resize(function() {

			});

			// var films = SC.getFilms();
			SC.getFilms();
			// console.log('films: ', films);
			console.log('filmInfo: ', SC.filmInfo);




			/*******************************************/
			/*    Item Title                           */
			/*******************************************/
			

			/*******************************************/
			/*    Product Detail - Back                */
			/*******************************************/
			

		},

		buildFilmList: function(filmList) {
			console.log('buildFilmList ');
			for (i = 0; i < filmList.length; i++) { 
			console.log('buildFilmList for item');

				var filmItemTmpl = $('#filmItemTmpl').html(),
					item = Mustache.render(filmItemTmpl, filmList[i]);
				// var item = ('<option/>', {'value': filmList[i].imdbID});
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

					console.log('filmInfo: ', SC.filmInfo);

			  	},
			  	error : function(){console.log('error in parsing omdb info.');}	  
				
			});// End Get Films.xml

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
