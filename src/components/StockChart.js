import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class StockChart extends React.Component {
  render() {
    let startingDate;
    let stockMaximums;
    let stockMinimums;
    let stockMin;
    let stockMax;
    let largestDataSet = { closingValues: [] };
    const rawData = this.props.data;
    const stockLines = [];
    const margin = {top: 20, right: 40, bottom: 70, left: 40}
    const width = window.innerWidth - margin.left - margin.right;
    const height = window.innerHeight - margin.top - margin.bottom - 75*2; // -75 for header and for bottom stock info
    const parseTime = d3.timeParse('%d-%b-%y');
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const xAxis = d3.axisBottom(x).ticks(8).tickFormat(d3.timeFormat('%b %d, %Y'));
    const yAxis = d3.axisLeft().scale(y).ticks(5);
    const div = new ReactFauxDOM.Element('div');

    // Get prelimiary data to set up chart
    rawData.map((d) => {
      if (d.closingValues.length > largestDataSet.closingValues.length) {
        startingDate = d.closingValues[d.closingValues.length - 1].date;
        largestDataSet = d;
      }
    });
    stockMaximums = rawData.map((stock) => d3.max(stock.closingValues.map((d) => parseInt(d.price))));
    stockMinimums = rawData.map((stock) => d3.min(stock.closingValues.map((d) => parseInt(d.price))));
    stockMax = d3.max(stockMaximums);
    stockMin = d3.min(stockMinimums);
    
    // Fromat data into a JSON format that can be used with D3
    const data = { stocks: []};
    for (let i = largestDataSet.closingValues.length - 1; i > -1; i--) {
      const date = largestDataSet.closingValues[i].date;
      data.stocks.push({
        'date': date
      });
      rawData.map((stock) => {
        const stockData = stock.closingValues.filter((stockData) => stockData.date === date);
        if (stockData.length > 0) {
          data.stocks[data.stocks.length - 1][stock.name] = stockData[0].price;
        }
      });
    }

    // Draw the plot
    let svg = d3.select(div).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.bottom + margin.top)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain([new Date(startingDate),new Date()]);
    y.domain([stockMin*9/10, stockMax*11/10]);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)
      .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-0.8rem')
        .attr('dy', '.15rem')
        .attr('transform', 'rotate(-65)');
    
    svg.append('g')
      .call(yAxis);

    rawData.map((stock) => {
      data.stocks.map((stockData) => {
        const stockLine = d3.line()
          .x((d) => x(d.Date))
          .y((d) => y(d[stock]));
        stockLines.push(stockLine);
      })
    });

    stockLines.forEach((stockLine) => {
      svg.append('path')
        .data([data])
        .style('stroke', 'red')
        .attr('d', stockLine);
    });

    return div.toReact();
  }
}