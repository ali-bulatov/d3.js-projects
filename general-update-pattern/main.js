import { select, range } from "d3";
import { fruitBowl } from "./fruitBowl";

const svg = select("svg");

// STATE MANUPULATION LOGIC
const makeFruit = (type) => ({ type });
const fruits = range(5).map(() => makeFruit("apple"));

// RENDERING LOGIC
const render = () => {
  fruitBowl(svg, { fruits, height: +svg.attr("height") });
};

render();

setTimeout(() => {
  // remove last element of array
  fruits.pop();
  render();
}, 1500);

setTimeout(() => {
  // replace array element
  fruits[2].type = "lemon";
  render();
}, 3000);
