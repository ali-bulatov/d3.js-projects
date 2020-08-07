import { scaleOrdinal } from "d3";

const colorScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["#c1dd1d", "yellow"]);
const radiusScale = scaleOrdinal()
  .domain(["apple", "lemon"])
  .range(["50", "25"]);

export const fruitBowl = (selection, props) => {
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
