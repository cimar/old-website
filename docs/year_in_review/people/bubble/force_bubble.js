var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-10)
    .linkDistance(10)
    .size([width, height]);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("miserables1.json", function(json) {
  force
      .nodes(json.nodes)
      .links([])//json.links)
      .start();

  var node = svg.selectAll("circle.node")
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
