(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('d3')) :
  typeof define === 'function' && define.amd ? define(['d3'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3));
}(this, (function (d3) { 'use strict';

  const colorScale = d3.scaleOrdinal()
    .domain(["apple", "lemon"])
    .range(["#c1dd1d", "yellow"]);

  const radiusScale = d3.scaleOrdinal()
    .domain(["apple", "lemon"])
    .range(["50", "25"]);

  const xPosition = (d, i) => i * 120 + 60;

  const fruitBowl = (selection, props) => {
    const { fruits, height } = props;
    // selectAll.data is when you create the D3 data join: arr of data and elements(DOM), enter->update(dom and data)->exit(dom without data)
    const circles = selection
      // select elements
      .selectAll("circle")
      // set up data part
      .data(fruits, (d) => d.id);

    // data elements with no dom elements
    circles
      .enter()
      // append dom to each data entry
      .append("circle")
      .attr("cx", xPosition)
      .attr("cy", height / 2)
      .attr("r", 0)
      // MERGE enter update selection
      .merge(circles)
      // ADD animated transition
      .transition()
      .duration(1000)
      .attr("cx", xPosition)
      .attr("r", (d) => radiusScale(d.type))
      .attr("fill", (d) => colorScale(d.type));

    // remove everything from the exit selection from the DOM
    circles.exit().transition().duration(1000).attr("r", 0).remove();
  };

  const svg = d3.select("svg");

  // STATE MANUPULATION LOGIC
  const makeFruit = (type) => ({ type, id: Math.random() });
  let fruits = d3.range(5).map(() => makeFruit("apple"));

  // RENDERING LOGIC
  const render = () => {
    fruitBowl(svg, { fruits, height: +svg.attr("height") });
  };

  render();

  setTimeout(() => {
    // remove last element of array
    fruits.pop();
    render();
  }, 5000);

  setTimeout(() => {
    // replace array element
    fruits[2].type = "lemon";
    render();
  }, 6000);

  setTimeout(() => {
    // remove last element of array
    fruits = fruits.filter((d, i) => i !== 1);
    render();
  }, 7000);

})));
