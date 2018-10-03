import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class StockChart extends React.Component {
  render() {
    const div = new ReactFauxDOM.Element('div');
    let stockMax;
    const rawData = this.props.data;
    const smallestDataSetSize = d3.min(rawData.map((stock) => stock.closingValues.length));
    const restrictingDataSet = rawData.filter((stock) => stock.closingValues.length === smallestDataSetSize)[0];
    const stockLines = [];
    const parseTime = d3.timeParse('%Y-%m-%d');
    const margin = {top: 20, right: 40, bottom: 70, left: 40}
    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom - 75*2; // -75 for header and for bottom stock info
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const xAxis = d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat('%b %d, %Y'));
    const yAxis = d3.axisLeft(y).ticks(5);

    // Get prelimiary data to set up chart
    // fix these to only use valid dates
    stockMax = d3.max(rawData.map((stock) => d3.max(stock.closingValues.map((d) => parseInt(d.price)))));
    
    // Fromat data into a JSON format that can be used with D3
    const data = { stocks: []};
    for (let i = smallestDataSetSize - 1; i > -1; i--) {
      const date = restrictingDataSet.closingValues[i].date;
      data.stocks.push({
        'date': date
      });
      rawData.map((stock) => {
        const stockData = stock.closingValues.filter((stockData) => stockData.date === date);
        data.stocks[data.stocks.length - 1][stock.name] = parseFloat(stockData[0].price);
      });
    }

    // Draw the plot
    let svg = d3.select(div).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.bottom + margin.top)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain(d3.extent(data.stocks, (d) => parseTime(d.date)));
    y.domain([0, stockMax*11/10]);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-1rem')
        .attr('dy', '-.2rem')
        .attr('transform', 'rotate(-65)');
    
    svg.append('g')
      .call(yAxis);

    const valueline = d3.line()
      .x((d) => x(d.date))
      .y((d) => y(d['GOOG']));

    data.stocks.forEach((d) => {
      d.date = parseTime(d.date);
      d['GOOG'] = +d['GOOG'];
    });

    rawData.map((stock) => {
      data.stocks.map((stockData) => {
        const stockLine = d3.line()
          .x((d) => x(d.date))
          .y((d) => y(d[stock.name]));
        stockLines.push(stockLine);
      })
    });

    const colours = ['steelblue', 'red', 'green', 'blue', 'pink', 'yellow'];

    stockLines.forEach((stockLine) => {
      let stockColour;
        stockColour = colours[stockLines.indexOf(stockLine)%6];
      svg.append('path')
        .datum(data.stocks)
        .attr('class', 'line')
        .attr('stroke', stockColour)
        .attr('d', stockLine);
    });

    return div.toReact();
  }
}