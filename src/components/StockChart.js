import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';

export default class StockChart extends React.Component {
  render() {
    const div = new ReactFauxDOM.Element('div');
    const rawData = [];
    for (let i=0; i < this.props.data.length; i++) {
      const ticker = this.props.data[i].name;
      for (let j=0; j < this.props.stockData.length; j++) {
        if (this.props.stockData[j].name === ticker) {
          rawData.push(this.props.stockData[j]);
        }
      }
    }
    const stockMax = d3.max(rawData.map((stock) => d3.max(stock.closingValues.map((d) => parseInt(d.price)))));
    const smallestDataSetSize = d3.min(rawData.map((stock) => stock.closingValues.length));
    const restrictingDataSet = rawData.filter((stock) => stock.closingValues.length === smallestDataSetSize)[0];
    const stockPoints = [];
    const colours = this.props.colours;
    const parseTime = d3.timeParse('%Y-%m-%d');
    const bisectDate = d3.bisector((d) => d.date).left;
    const margin = {top: 20, right: 40, bottom: 80, left: 40}
    const width = Math.min(768 - margin.left - margin.right, window.innerWidth - this.props.navbarWidth - 1.5*(margin.left + margin.right));
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
    for (let i = smallestDataSetSize - 1; i > 0; i--) {
      // we can smooth out the data and speed up the rendering by only picking every second-fifth data point if data sets are very large?
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
      .attr('class', 'stocks__chart')
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
      );

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

    // Add tooltip when hovering over chart, only once on page load, not every re-render
    // (e.g., when new stocks are added)
    if (this.props.data.length > 0) {
      const tooltip = d3.select('body')
        .selectAll('div.tooltip')
        .data([0]); // load arbitrary data to prevent another append on re-render
      tooltip.enter()
        .append('div')
        .attr('class', 'tooltip')
        .style('display', 'none');

      svg.append('rect')
        .attr('id', 'tooltip-overlay')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseover', () => tooltip.style('display', 'block'))
        .on('mouseout', () => tooltip.style('display', 'none'))
        .on('mousemove', mousemove.bind(this));

      function mousemove() {
        const xMarginOffset = this.props.navbarLeft + this.props.navbarWidth + margin.left;
        const x0 = x.invert(d3.event.clientX - xMarginOffset);
        const i = bisectDate(data.stocks, x0, 1);
        const d0 = data.stocks[i - 1];
        const d1 = data.stocks[i];
        const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        const tooltipData = [];
        const screenScroll = document.documentElement.scrollTop || document.body.scrollTop;
        rawData.map((stock) => tooltipData.push(`${stock.name}: ${d[stock.name]}`));
        tooltip.style('left', d3.event.clientX < width * .85 ? d3.event.clientX + 25 + 'px' : d3.event.clientX - 150 + 'px');
        tooltip.style('top', `${d3.event.clientY + screenScroll}px`);
        tooltip.html(
          d.date.toLocaleDateString('en-US', dateOptions).toString().replace(/,/g, '') + '<br/>' +
          tooltipData.map((stock, index) =>
            `<div class="tooltip__square" style="background:${colours[index % colours.length]}"></div>` +
            stock).toString().replace(/,/g, '<br/>')
        );
      }
    }

    return div.toReact();
  }
}