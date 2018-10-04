import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class StockChart extends React.Component {
  render() {
    const div = new ReactFauxDOM.Element('div');
    const rawData = this.props.data;
    const stockMax = d3.max(rawData.map((stock) => d3.max(stock.closingValues.map((d) => parseInt(d.price)))));
    const smallestDataSetSize = d3.min(rawData.map((stock) => stock.closingValues.length));
    const restrictingDataSet = rawData.filter((stock) => stock.closingValues.length === smallestDataSetSize)[0];
    const stockPoints = [];
    const colours = ['steelblue', 'yellow', 'red', 'orange', 'green', 'pink', 'blue', 'grey'];
    const parseTime = d3.timeParse('%Y-%m-%d');
    const bisectDate = d3.bisector((d) => d.date).left;
    const margin = {top: 20, right: 40, bottom: 70, left: 40}
    const width = Math.min(1000-margin.left-margin.right, window.innerWidth - 2*(margin.left + margin.right)); // one margin for the chart padding, one for the margin outside the chart
    const height = Math.max(320, window.innerHeight - margin.top - margin.bottom - 75*2); // -75 for header and for bottom stock info, minimum for landscape view on mobile devices
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const xAxisTicks = 10;
    const yAxisTicks = 5;
    const xAxis = d3.axisBottom(x).ticks(xAxisTicks).tickFormat(d3.timeFormat('%b %d, %Y'));
    const yAxis = d3.axisLeft(y).ticks(yAxisTicks);

    // Style the div for the chart before working on building it with D3
    div.style.setProperty('display', 'flex');
    div.style.setProperty('justify-content', 'space-around');
    
    // Fromat data into a JSON format that can be used with D3
    const data = { stocks: []};
    // change this to go over all of the data and set all non-existant data to 0, then multicolor the line and make it transparent (for the tooltip, check for price of 0 for exception)
    for (let i = smallestDataSetSize - 1; i > 4; i-=5) {
      // we smooth the data and speed up the rendering by only picking every fifth data point
      const date = restrictingDataSet.closingValues[i].date;
      data.stocks.push({
        'date': date
      });
      rawData.map((stock) => {
        const stockData = stock.closingValues.filter((stockData) => stockData.date === date);
        data.stocks[data.stocks.length - 1][stock.name] = parseFloat(stockData[0].price);
      });
    }

    // Make grid lines for the y-axis so data is easier to read
    const make_y_gridlines = () => d3.axisLeft(y).ticks(yAxisTicks);

    // Make the line chart and load data to display
    let svg = d3.select(div).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.bottom + margin.top)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain(d3.extent(data.stocks, (d) => parseTime(d.date)));
    y.domain([0, stockMax*11/10]);

    svg.append('g')
      .attr('class', 'grid')
      .call(make_y_gridlines()
        .tickSize(-width)
        .tickFormat('')
      )

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .attr('class', 'chart--axis')
      .call(xAxis)
      .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-1rem')
        .attr('dy', '-.2rem')
        .attr('transform', 'rotate(-65)');
    
    svg.append('g')
      .attr('class', 'chart--axis')
      .call(yAxis);

    data.stocks.forEach((d) => {
      d.date = parseTime(d.date);
    });

    rawData.map((stock, index) => {
      data.stocks.map(() => {
        const stockPoint = d3.line()
          .x((d) => x(d.date))
          .y((d) => y(d[stock.name]));
        stockPoints.push([stockPoint, colours[index%colours.length]]);
      });
    });

    stockPoints.map((stockPoint) => {
      svg.append('path')
        .datum(data.stocks)
        .attr('class', 'line')
        .attr('stroke', stockPoint[1])
        .attr('d', stockPoint[0]);
    });

    // Add tooltip on hover, displaying all stock prices at a hovered date
    const tooltip = svg.append('g')
      .attr('class', 'tooltip')
      .style('display', 'none');

    tooltip.append('line')
      .attr('class', 'tooltip__line')
      .attr('y1', 0)
      .attr('y2', height);

    tooltip.append('circle')
      .attr('r', 5);

    tooltip.append('text')
      .attr('x', 15)
      .attr('dy', '0.3rem')

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'rgba(0,0,0,0.5)')
      .attr('pointer-events', 'all')
      .on('mouseover', () => tooltip.style('display', null))
      .on('mouseout', () => tooltip.style('display', 'none'))
      .on('mousemove', mousemove)

    function invertTimePosition(xPos) {
      const domain = x.domain();
      const range = x.range();
      const domainPoints = data.stocks.map((d) => d.date);
      const rangePoints = d3.range(range[0], range[1], data.stocks.length/smallestDataSetSize);
      //console.log('dur', domainPoints.length);
      console.log(rangePoints.length, smallestDataSetSize);
      //console.log(xPos, d3.bisect(rangePoints, xPos), domainPoints.length);
      //console.log(range[0], domainPoints[d3.bisect(rangePoints, xPos)-1], range[1]);
      return domain[d3.bisect(rangePoints, xPos) - 1];
    }

    function mousemove() {
      const x0 = x(invertTimePosition(d3.event.clientX));
      const i = bisectDate(data.stocks, x0, 1);
      const d0 = data.stocks[i-1];
      console.log(d0);
      const d1 = data.stocks[i];
      const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
      
      tooltip.attr('transform', `translate(x(d.date), y(${height}))`)
      tooltip.select('text').text(() => 'stock values')
      tooltip.select('tooltip__line').attr('y2', height - y(height))
    }

    return div.toReact();
  }
}