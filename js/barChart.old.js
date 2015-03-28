(function($){
/*		function getFilmInfo(){
		// Get Films.xml
		manTotal60 = 0;
		manTotal70 = 0;
		manTotal80 = 0;
		filmData = $.ajax({
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
			  
		  		  
					});// End Get Films.xml		   
				}				
		})
		getFilmInfo();*/
		

				
				
			var svg = d3.select("svg");			  

			var sixties = [
			  {id: "bronx", value: 100},
			  {id: "brooklyn", value: 40},
			  {id: "queens", value: 60},
			  {id: "manhattan", value: 73},
			  {id: "statenIsland", value: 33}
			];
			
			var seventies = [
			   {id: "queens", value: 42},
			  {id: "bronx", value: 171},
			  {id: "brooklyn", value: 129},
			  {id: "manhattan", value: 88},
			  {id: "statenIsland", value: 120}			  
			];
			
			xArr = [0,60,120,180,240];
			yArr = [];
			
			var bars = svg.selectAll("rect")
				.data(sixties)
				.enter()
				.append("rect")
				.attr({
				  width: 40,
				  height: function(d,i) {
					return d.value;
				  },
				  transform: function(d,i) {
					var x =  i * 60 + 100;
					var y = 100;
					return "translate(" + [x, y] + ")";
				  }
				})
				.classed("bars", true);
				
				
				
			/*svg.selectAll("rect")
				.data(seventies)
				.append("svg:text")
				.attr("x", function(datum, index) { return xArr[index] + 20; })
				.attr("y", function(datum) { return 20; })
				.attr("dx", - 20)
				.attr("dy", "1.2em")
				.attr("text-anchor", "middle")
				.text(function(datum) { return datum.id;})
				.attr("fill", "red"); */
				 
			
			d3.selectAll('button.decadeBtn')
				.on("click", function() {
					var currentDecadeName = $(this).attr('data-decade');
					console.log('currentDecadeName: '+ currentDecadeName);

					function currentDecade(currentDecadeName){
						var currentData = currentDecadeName;
						console.log('current data in currentDecade function: '+ currentData);
						console.log('current data in currentDecadeName function: '+ currentDecadeName);
						return currentData;
					}
					console.log('currentDecade: '+ currentDecade);
				  svg.selectAll("rect.bars")
					.data(currentDecade(seventies), function(d) { return d.id })
					.transition()
					//.delay(1000)
					.duration(1499)
					//.ease("linear")
					//.ease("cubic")
					.ease("bounce")
					.attr({
					  height: function(d,i) {
					  return d.value;
					  }
					})			
				})
})(jQuery);