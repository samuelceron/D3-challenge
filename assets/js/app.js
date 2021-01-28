
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

//Import Data
d3.csv("assets/data/data.csv").then(function(data){
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(d){
      d.poverty = +d.poverty
      d.healthcare = +d.healthcare
    });
    // Step 2: Create scale functions
    // ==============================
    let xLinearScale = d3.scaleLinear()
    .domain(d3.extent([d3.min(data, d=>d.poverty) -1 ,d3.max(data, d=> d.poverty)])).nice()
    .range([0, width])

    let yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d=>d.healthcare) + 2])
    .range([height, 0])

    // Step 3: Create axis functions
    // ==============================
    let xAxis = d3.axisBottom(xLinearScale).ticks((d3.max(data, d=> d.poverty) -d3.min(data, d=>d.poverty)) / 2 )
    let yAxis = d3.axisLeft(yLinearScale)

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)

    chartGroup.append("g")
    .call(yAxis)

    // Step 5: Create Circles
    // ==============================
    let circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d=> yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "black")
        .attr("opacity", ".8");

    // Create text tags inside circles
    let text = chartGroup.append("text")
        .selectAll("tspan")
        .style("font-family", "Sans-serif")
        .data(data)
        .enter()
        .append("tspan")
        .attr("x", d => xLinearScale(d.poverty - 0.12))
        .attr("y", d => yLinearScale(d.healthcare - 0.20))
        .attr("font-size", "10")
        .attr("fill","orange")
        .text(d=> d.abbr)

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healtchare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In poverty (%)");
    
    //   Handle error
    }).catch(function(error) {
    console.log(error);
  });

