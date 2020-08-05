import { scaleOrdinal } from "d3";

const colorScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c1dd1d", "yellow"]);

const radiusScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["50", "25"]);

export const fruitBowl = (selection, props) => {
  const { fruits, height } = props;
  // selectAll.data is when you create the D3 data join: arr of data and elements(DOM), enter->update(dom and data)->exit(dom without data)
  const circles = selection
    // select elements
    .selectAll("circle")
    // set up data part
    .data(fruits);

  // data elements with no dom elements
  circles
    .enter()
    // append dom to each data entry
    .append("circle")
    .attr("cx", (d, i) => i * 120 + 60)
    .attr("cy", height / 2)
    // MERGE enter update selection
    .merge(circles)
    .attr("r", (d) => radiusScale(d.type))
    .attr("fill", (d) => colorScale(d.type));

  // remove everything from the exit selection from the DOM
  circles.exit().remove();
};
