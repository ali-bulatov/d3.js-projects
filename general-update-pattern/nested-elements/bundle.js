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

  const fruitBowl = (selection, props) => {
    const { fruits, height } = props;

    const bowl = selection
      .selectAll("rect")
      .append("center")
      .data([null])
      .enter()
      .append("rect")
      .attr("y", 110)
      .attr("width", 600)
      .attr("height", 300)
      .attr("rx", 50);

    const groups = selection.selectAll("g").data(fruits);
    const groupsEnter = groups.enter().append("g");
    groupsEnter
      .merge(groups)
      .attr("transform", (d, i) => `translate(${i * 120 + 60},${height / 2})`);
    groups.exit().remove();

    groupsEnter
      .append("circle")
      .merge(groups.select("circle"))
      .attr("r", (d) => radiusScale(d.type))
      .attr("fill", (d) => colorScale(d.type));

    groupsEnter
      .append("text")
      .merge(groups.select("text"))
      .text((d) => d.type)
      .attr("y", 120);
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
