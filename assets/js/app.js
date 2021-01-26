
// Set CANVAS size
let svgWidth = 960;
let svgHeight = 500;
let margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
}
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
let svg = d3
.select("#scatter")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

let chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)