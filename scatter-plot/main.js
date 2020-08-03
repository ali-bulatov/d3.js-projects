import { select, csv, scaleLinear, extent, axisBottom, axisLeft } from "d3";

// SVG PARAMETERS
const svg = select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

// RENDER THE VISUALISATION
const render = (data) => {
  // VISUALISATION PARAMETERS
  const xValue = (d) => d.obesity;
  const yValue = (d) => d.diabetes;
  const margin = { top: 50, right: 50, bottom: 70, left: 140 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const circleRadius = 10;
  const title = "Obesity vs Diabetes";
  const xLabel = "Obesity";
  const yLabel = "Diabetes";

  // CREATE X AXIS
  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  // CREATE Y AXIS
  const yScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerHeight])
    .nice();

  // GROUP WITH PROPER MARGINS
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // CONFIGURE X AXIS
  const xAxis = axisBottom(xScale).tickSize(-innerHeight).tickPadding(15);
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
  const yAxis = axisLeft(yScale).tickSize(-innerWidth).tickPadding(15);
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

  // CREATE CIRCLES
  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cy", (d) => yScale(yValue(d)))
    .attr("cx", (d) => xScale(xValue(d)))
    .attr("r", circleRadius);

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
    d.depression = +d.depression;
    d.obesity = +d.obesity;
    d.cancer = +d.cancer;
    d.cardiovascular = +d.cardiovascular;
    d.stroke = +d.stroke;
    d.rehab = +d.rehab;
    d.vaccine = +d.vaccine;
    d.diabetes = +d.diabetes;
    d.diarrhea = +d.diarrhea;
  });
  render(data);
});
