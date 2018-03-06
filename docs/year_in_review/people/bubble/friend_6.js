var w = 1000;
var h = 100;

var dataset = [ 5, 10, 15, 20, 25 ];
var nodes = [];
var values = [];
var genders = [];
var names = [];
var locations = [];
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


d3.csv("friend_commas.csv",function(csv) {

/*	vis = d3.select("#chart")
	.append("svg:svg")
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
            return d.Scale;
	});
*/
	csv.forEach(function(d,i) {
	values.push(+d.Scale);
	values[i].name = d.Label;
	});

	csv.forEach(function(d) {
	genders.push(+d.Bin_Gender);
	});

	csv.forEach(function(d) {
	names.push(d.Label);
	});

	csv.forEach(function(d){
	locations.push(+d.Loc);
	});

/*	d3.select("body").selectAll("p")
    	.data(values)
    	.enter()
    	.append("p")
	.text(function(d) {return d;});
*/


var w = 960,
    h = 500,
    fill = d3.scale.category10(),
    nodes = values.map(Object);
    foci = [{x: 150, y: 150}, {x: 350, y: 250}, {x: 700, y: 400}];

vis = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .size([w, h])
//    .charge(-70)
    .start();

var node = vis.selectAll("circle.node")
    .data(nodes)
    .enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", function(d) { return d+5; })
	.attr("weight", function(d) { return d; })
    .style("fill", function(d, i) { return fill(genders[i] & 3); })//i & 3); })
    .style("stroke", function(d, i) { return d3.rgb(fill(i & 3)).darker(2); })
    .style("stroke-width", 1.5)
    .call(force.drag);

vis.style("opacity", 1e-6)
  .transition()
    .duration(1000)
    .style("opacity", 1);

force.on("tick", function(e) {

  var k = 6 * e.alpha;
  nodes.forEach(function(o, i) {
//    o.y += i & 1 ? k : -k;
//    o.x += i & 2 ? k : -k;
	o.x += locations[i] ? k : -k;
  });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
});

});

