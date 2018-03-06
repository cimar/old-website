var w = 1000;
var h = 100;

var dataset = [ 5, 10, 15, 20, 25 ];
var nodes = [];
var vis;
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

	vis = d3.select("#chart")
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

	nodes = circles;
	d3.select("body").selectAll("p")
    	.data(nodes)
    	.enter()
    	.append("p")
    	.text("New paragraph!")
	.text(function(d) {return d;});


//	.call(force.drag);
});


var width = 960,
    height = 500,
    fill = d3.scale.category10();

nodes = d3.range(100).map(Object);

var force = d3.layout.force()
    .charge(-10)
    .linkDistance(10)
    .size([width, height]);

var fvg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("miserables1.json", function(json) {
  force
      .nodes(nodes)//"circle"))//json.nodes)
      .links([])//json.links)
      .start();


var node = vis.selectAll("circle.node")
    .data(nodes)
  .enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 8)
    .style("fill", function(d, i) { return fill(i & 3); })
    .style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
    .style("stroke-width", 1.5)
    .call(force.drag);

var n = nodes.length;
nodes.forEach(function(d, i) {
  d.x = d.y = width / n * i;
});


/*  var node = fvg.selectAll("circle.node")
      .data(dataset)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d); })
      .call(force.drag);*/

  force.on("tick", function() {
    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});


