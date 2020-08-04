import {
  select,
  csv,
  scaleLinear,
  axisBottom,
  axisLeft,
  scaleTime,
  area,
  curveBasis,
  max,
  extent,
  format,
} from "d3";

// SVG PARAMETERS
const svg = select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// RENDER THE VISUALISATION
const render = (data) => {
  // VISUALISATION PARAMETERS
  const xValue = (d) => d.year;
  const xLabel = "Time";

  const yValue = (d) => d.population;
  const yLabel = "Population";

  const margin = { top: 50, right: 50, bottom: 70, left: 100 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 6;
  const title = "World Population";

  // CREATE X AXIS
  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth]);

  // CREATE Y AXIS
  const yScale = scaleLinear()
    .domain([0, max(data, yValue)])
    .range([innerHeight, 0])
    .nice();

  // GROUP WITH PROPER MARGINS
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // CONFIGURE X AXIS
  const xAxis = axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(15)
    .ticks(7);
  const xAxisG = g
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(0,${innerHeight})`);
  xAxisG.select(".domain").remove();
  xAxisG
    .append("text")
    .attr("y", 50)
    .attr("x", innerWidth / 2)
    .attr("fill", "black")
    .attr("class", "axis-label")
    .text(xLabel);

  // CONFIGURE Y AXIS
  const yAxisTickFormat = (number) => format(".1s")(number).replace("G", "B");

  const yAxis = axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(15)
    .tickFormat(yAxisTickFormat);
  const yAxisG = g.append("g").call(yAxis);
  yAxisG.selectAll(".domain").remove();
  yAxisG
    .append("text")
    .attr("y", -50)
    .attr("x", -innerHeight / 2)
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("transform", `rotate(-90)`)
    .attr("class", "axis-label")
    .text(yLabel);

  // CREATE AREA CHART
  const areaGenerator = area()
    .x((d) => xScale(xValue(d)))
    .y0(innerHeight)
    .y1((d) => yScale(yValue(d)))
    .curve(curveBasis);
  g.append("path").attr("d", areaGenerator(data)).attr("class", "line-path");

  // APPEND GRAPH TITLE
  g.append("text")
    .attr("y", -10)
    .attr("x", innerWidth / 2)
    .attr("text-anchor", "middle")
    .attr("class", "title")
    .text(title);
};

// LOAD AND PREPROCESS DATA
csv("data.csv").then((data) => {
  data.forEach((d) => {
    d.year = new Date(d.year);
    d.population = +d.population;
  });
  render(data);
});
