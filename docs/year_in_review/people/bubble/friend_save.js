var w = 1000;
var h = 100;

var dataset = [ 5, 10, 15, 20, 25 ];

/*var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);
	 
var circles = svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle");

circles.attr("cx", function(d, i) {
            return (i * 50) + 25;
	})
       .attr("cy", h/2)
       .attr("r", function(d) {
            return d;
	});*/


d3.csv("friend.csv",function(csv) {

	d3.select("body").selectAll("p")
    	.data(csv)
    	.enter()
    	.append("p")
    	.text("New paragraph!")
	.text(function(d) {return +d.num;});

	var vis = d3.select("#chart")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

	var circles = vis.selectAll("circle")
		.data(csv)
		.enter()
		.append("circle");

	circles.attr("cx", function(d, i) {
            return (i * 50) + 25;
	})
       .attr("cy", h/2)
       .attr("r", function(d) {
            return d.num;
	});

/*	.call(force.drag);

//apply force
	var force = d3.layout.force()
	.nodes(circles)
	.links([])
	.size([w,h]);
	.start();

	force.on("tick", function() {
		node.attr("cx", function(d) { return d.x; })
		    .attr("cy", function(d) { return d.y; });
	});
*/

var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-10)
    .linkDistance(10)
    .size([width, height]);

var fvg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("miserables1.json", function(json) {
  force
      .nodes(json.nodes)
      .links([])//json.links)
      .start();

  var node = fvg.selectAll("circle.node")
      .data(json.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});


});



