import { scaleOrdinal } from "d3";

const colorScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c1dd1d", "yellow"]);

const radiusScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["50", "25"]);

const xPosition = (d, i) => i * 120 + 60;

export const fruitBowl = (selection, props) => {
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
