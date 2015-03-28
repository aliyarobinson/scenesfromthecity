(function($){
			
			var svg = d3.select("svg");			  
			

			var sixties = [{id: "bronx", value: 10},{id: "brooklyn", value: 90},{id: "queens", value: 60},{id: "manhattan", value: 173},{id: "statenIsland", value: 3}],
				seventies = [{id: "bronx", value: 20},{id: "brooklyn", value: 120},{id: "queens", value: 80},{id: "manhattan", value: 143},{id: "statenIsland", value: 10}],
				eighties = [{id: "bronx", value: 50},{id: "brooklyn", value: 10},{id: "queens", value: 70},{id: "manhattan", value: 123},{id: "statenIsland", value: 5}],
				ninties = [{id: "bronx", value: 20},{id: "brooklyn", value: 50},{id: "queens", value: 20},{id: "manhattan", value: 113},{id: "statenIsland", value: 2}],
				twoThous = [{id: "bronx", value: 70},{id: "brooklyn", value: 70},{id: "queens", value: 90},{id: "manhattan", value: 73},{id: "statenIsland", value: 6}];

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
					//console.log('currentDecadeName: '+ currentDecadeName);
					console.log('decadeArr[index]: '+ decadeArr[index]);
					/*console.log('sixties: '+ sixties[0].value);
					sixties= [];
					sixties.push(currentDecadeName);
					console.log('sixties: '+ sixties);					
					console.log('currentDecade: '+ currentDecade);*/
				  	
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

					function currentDecade(currentDecadeName){
						var currentData = currentDecadeName;
						console.log('current data in currentDecade function: '+ currentData[0].value);
						console.log('current data in currentDecadeName function: '+ currentDecadeName[0].value);
						return currentData;
					}			
				})
})(jQuery);