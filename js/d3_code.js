var data = [32, 57, 112, 2],
        dataEnter = data.concat(293),
        dataExit = data.slice(0, 2),
        w = 360,
        h = 180,
        x = d3.scale.ordinal().domain([57, 32, 112,2]).rangePoints([0, w], 1),
        y = d3.scale.ordinal().domain(data).rangePoints([0, h], 2);


(function() {  //SEF

  $(function() {  // Doc Ready
    var svg = d3.select("#map_canvasOverlay").append("svg")
        .attr("width", w)
        .attr("height", h);

    d3.select("svg").append("defs");

    svg.selectAll(".little")
        .data(data)
      .enter().append("circle")
        .attr("class", "little")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 12);

    d3.select("#map_canvasOverlay button").on("click", function() {
      svg.selectAll(".select").remove();

      svg.selectAll(".select")
          .data(data)
        .enter().append("circle")
          .attr("class", "select")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 60)
          .style("fill", "none")
          .style("stroke", "red")
          .style("stroke-opacity", 1e-6)
          .style("stroke-width", 3)
        .transition()
          .duration(750)
          .attr("r", 12)
          .style("stroke-opacity", 1);

    });
    d3.select("svg").append("defs");
    //d3.selectAll(".filmNames span").style("left", 400);

    var svgBorough = d3.select("#boroughVisual").append("svg")
        .attr("width", 800)
        .attr("height", 600);

    //var mhtPath = d3.select("#boroughVisual").

    var currentPath = d3.selectAll("#nycVector path");
    var currentFill = currentPath.attr('stroke');

    

    /*currentPath.on("click", function() {
      console.log('path clicked');            
    }).style('fill', currentFill).style("stroke-width", 3);*/

    



   /* svgBorough.append("svg:path")
            .attr("d","M1319 2020.5l-1 2v5.333c0 0 0.667 5,0 7.5s1 3.834 1 3.834s-0.824 4.667-0.579 6.5s4.746 6.166 6.412 7.333s5.833 7.666 6.833 11.333s4 6 5.5 6.5s1.167 7.834 1.167 7.834l-49.5 58.333 l-1.833 2l-0.833 1.167l-2-1.167c0 0-5 5.499-6 8.166c0 0-4.333-0.833-6.5 3.667c0 0-3.667 0.501-6.333,5.667
  c0 0-9.333 15.167-11.167 15c0 0-9-6.833-2.5-8c0 0 5.166 1.666 9.333-5.334c0 0 6.167-8.167-4.5-9.5c0 0-6.382 1.668-7.191 6.834 l-0.976 5.166l-15.167 10.835l-3.667 2.165c0 0-8.333 5.334-8.833 5.334s-1.5 0-1.5 0l-6 4.666c0 0-4.5-3.834-11.333 4l-6.167 8.834
  c0 0-1.667 0.832-3.667-1.334l-1.5-2.333l-9.833 1.333l-3.5 6.5c0 0-3 0.5-3.833 2.667s-3.167 3.167-4.667 3s-3.5 0.833-3.5 0.833s-10.5 0.5-15.167 5.5s0 0.667 0 0.667s-4.5-1.5-5.833 0.5s-4 0.001-4.333-1.333s-1.333-2.667-1.333-2.667l-4.333-7v-3.5
  c0 0 2.167-2.667 3-6S1138 2190 1138 2190l3.833-2.667l3.667-2.5c0 0 7.86-1.177 3-3c-1.333-0.5-1.333-0.5-1.333-0.5s1-4.833-1-5.333l2.5-8.5c0 0-0.167-5.333-4.5-6.5l0.833-2l-1.333-6l-1.667-0.334l4.333-6l1.667 1l5.333-4.166l0.5-3.834l8.167-4
  l10.667 1c0 0 4.5-1.333 6.167-7.833s1.833-13.166 5-14.666s6.167 5.166 9-7.834l4.333 1.834c0 0 1 2.334 4.667 0.5c0 0 3.667 0.167 4.667 4.5s0.833-0.167 0.833-0.167l4.667 2.667l2.333 5.166l2.167 2.5l2.333-0.833l6.667-1.167c0 0 3-3.5 7-2.833
  s0.167-0.712 0.167-0.712s-10.5 4.711-13.667 3.045l-2.167 0.834l-2.833-4.656l-2-2.511l-5-3l-1.833-3.5l4.333 0.167l2.667-3.667 l1.667 2.167l-4-10.167l5.167-1.5l-3.5-0.167l1.667-1.666l4-2.5c0 0-3-1.166-4.5 0.5c0 0-6-1.166 1.167-5.5l-0.5-0.834
  c0 0-5.833 1-3 8.167l-1.167 1.667c0 0-3.667 2.055-0.167 5.333c0 0 2.833 6.501-1.667 6.167l-4.5 0.333l-3.833 1.667l-2.833-3.167 l-7.167-1.5c0,0-3.166-0.999-4.333,0.167l1.833-5.834c0 0-1.667-6.832,3-10.666s3.667-5.334 3.667-5.334l1.167-6.5l-1.333-6l2.5-9
  l-0.5-3.833l-2.333-0.167c0 0-2.667 1-3.167-4.5s0-12 0-12s0.5-5 4.5-8s2.167-1.833 2.167-1.833l-0.167-1.334h1.167l7.833-8.166c0 0 13.333-6 24.167 4.333c0 0 5.167 7 22.167-0.5c0 0 6.333-3.667 11.333 1c0 0 12.833 2.536 17-6.565c0 0 5.167-2.897 12.5 0
  c0 0 9.833-1.602,11-3.602C1303.167 2015.166 1314.167 2010.667 1319 2020.5z")
            .style("stroke-width", 2)
            .style("stroke", "steelblue")
            .style("fill", "none");*/
  }); //End Doc Ready

})();  //End SEF