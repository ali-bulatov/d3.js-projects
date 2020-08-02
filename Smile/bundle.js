(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('./node_modules/d3')) :
  typeof define === 'function' && define.amd ? define(['d3'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3));
}(this, (function (d3) { 'use strict';

  const svg = d3.select("svg");
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const eyeOffsetX = 100;
  const eyeOffsetY = -70;
  const eyeRadius = 50;
  const pupilRadius = 10;
  const eyebrowWidth = 100;
  const eyebrowHeight = 15;
  const eyebrowOffset = -80;

  const g = svg
    .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

  const circle = g
    .append("circle")
    .attr("r", 250)
    .attr("fill", "yellow")
    .attr("stroke", "black");
  const eyesG = g.append("g").attr("transform", `translate(0,${eyeOffsetY})`);
  const leftEye = eyesG
    .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", -eyeOffsetX);
  const rightEye = eyesG
    .append("circle")
    .attr("r", eyeRadius)
    .attr("cx", eyeOffsetX);
  const leftEyePupil = eyesG
    .append("circle")
    .attr("r", pupilRadius)
    .attr("cx", -eyeOffsetX)
    .attr("fill", "white");
  const rightEyePupil = eyesG
    .append("circle")
    .attr("r", pupilRadius)
    .attr("cx", eyeOffsetX)
    .attr("fill", "white");
  const eyebrowsG = eyesG
    .append("g")
    .attr("transform", `translate(0,${eyebrowOffset})`);
    eyebrowsG
    .transition()
    .duration(1000)
    .attr("transform", `translate(0,${eyebrowOffset - 50})`)
    .transition()
    .duration(1000)
    .attr("transform", `translate(0,${eyebrowOffset})`);
  const leftEyebrow = eyebrowsG
    .append("rect")
    .attr("x", -eyeOffsetX - eyebrowWidth / 2)
    .attr("width", eyebrowWidth)
    .attr("height", eyebrowHeight);
  const rightEyebrow = eyebrowsG
    .append("rect")
    .attr("x", eyeOffsetX - eyebrowWidth / 2)
    .attr("width", eyebrowWidth)
    .attr("height", eyebrowHeight);
  const mouth = g.append("path").attr(
    "d",
    d3.arc()({
      innerRadius: 150,
      outerRadius: 170,
      startAngle: Math.PI / 2,
      endAngle: Math.PI * (3 / 2),
    })
  );

})));
