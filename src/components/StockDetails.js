import React from 'react';
import StockChart from './StockChart';
import StockDetail from './StockDetail';

export default class StockDetails extends React.Component {
  state = {
    highest: 0,
    highestDate: '',
    lowest: 0,
    lowestDate: ''
  }
  
  getExtrema = () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    const values = this.props.stockData[0].closingValues
    let lowest = values[0].price;
    let lowestDate = '';
    let highest = 0;
    let highestDate = '';
    for (let i=0; i < values.length; i++) {
      const price = values[i].price;
      const date = values[i].date;
      if (price > highest) {
        highest = price;
        highestDate = date;
      }
      if (price < lowest) {
        lowest = price;
        lowestDate = date;
      }
    }
    this.setState(() => ({
      highest: highest.slice(0,-2),
      highestDate: new Date(highestDate).toLocaleDateString('en-US', options),
      lowest: lowest.slice(0,-2),
      lowestDate: new Date(lowestDate).toLocaleDateString('en-US', options)
    }));
  }

  componentDidMount() {
    this.getExtrema();
  }

  render() {
    const options = { month: 'long', day: 'numeric' }
    const lastUpdated = new Date(this.props.stockData[0].lastUpdated).toLocaleDateString('en-US', options);
    return (
      <div className='stock__details' id='details'>
        <h2>Stock Details ({this.props.stock[0].name})</h2>
        <StockChart
          data={this.props.stock}
          stockData={this.props.stockData}
          colours={[this.props.colour]}
          navbarLeft={this.props.navbarLeft}
          navbarWidth={this.props.navbarWidth}
        />
        <h3>{`Latest Data for ${this.props.stock[0].name} (${lastUpdated})`}</h3>
        <div className='stock__details-container'>
          <div className='stock__details-info stock__detail'>
            <div>Value</div>
            <div>1-day</div>
            <div>7-day</div>
          </div>
          {['Open', 'High', 'Low', 'Close'].map((detail) =>
            <StockDetail values={this.props.stockData[0].recentValues} detail={detail} key={detail} />
          )}
          <div className='stock__detail'>
            <div>{`Volume: ${this.props.stockData[0].recentValues[0].volume}`}</div>
            <div>{`Lowest in last 100 days: $${this.state.lowest} on ${this.state.lowestDate}`}</div>
            <div>{`Highest in last 100 days: $${this.state.highest} on ${this.state.highestDate}`}</div>
          </div>
        </div>
        <p>Click any stock below to view its details.</p>
      </div>
    );
  }
}