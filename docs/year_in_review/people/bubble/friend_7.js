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

	d3.select("body").selectAll("p")
    	.data(values)
    	.enter()
    	.append("p")
	.text(function(d) {return d;});
*/


var w = 960,
    h = 500,
    fill = d3.scale.category10(),
    nodes = csv.map(Object);
    foci = [{x: 150, y: 150}, {x: 350, y: 250}, {x: 700, y: 400}];

vis = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .size([w, h])
    .start();

var node = vis.selectAll("circle.node")
    .data(csv)
    .enter().append("g")
	.attr("class", "node")
	.call(force.drag);

node.append("svg:circle")
    .attr("r", function(d) { return (+d.Scale + 3); })
    .style("fill", function(d, i) { return fill(+d.Bin_Gender); })
    .style("stroke", function(d, i) { return d3.rgb(fill(+d.Bin_Gender)).darker(2); })
    .style("stroke-width", 1.5);
//	.call(force.drag);

var label = node.append("text")
	.attr("dx",12)
	.attr("dy", ".35em")
	.text(function(d) {return d.Label;});

vis.style("opacity", 1e-6)
  .transition()
    .duration(1000)
    .style("opacity", 1);

force.on("tick", function(e) {

//if(
  var k = 6 * e.alpha;
  nodes.forEach(function(o) {
	o.x += +o.Loc ? k : -k;
  });


  /*node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });*/

	node.attr('transform', function(o) { return 'translate(' + o.x + ',' + o.y + ')'; });

});

});

