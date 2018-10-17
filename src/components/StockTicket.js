import React from 'react';

export default class StockTicker extends React.Component {
  handleValueChange = (current, previousClose) => {
    const change = Math.round(100 * (current - previousClose)) / 100;
    return (change > 0 ? '+' : '') + change;
  }

  handleValueChangePercent = (current, previousClose) => {
    const change = Math.round(10000*(current-previousClose)/previousClose)/100;
    return (change > 0 ? '+' : '') + change;
  }
  
  render() {
    return (
      <div
        className={this.props.removeStock === this.props.ticker ? 'stocks__stock stocks--removal-animation' : 'stocks__stock'}
        key={this.props.ticker}
        style={{ borderLeft: 0.7 + `rem solid ${this.props.colour}` }}>
        <div className='stocks__stock-ticker'>
          {this.props.ticker}
          <span style={{ color: this.handleValueChange(this.props.stockData.recentValues[1].close, this.props.stockData.recentValues[0].close) >= 0 ? 'green' : 'red' }}>
            {' ' + this.handleValueChange(this.props.stockData.recentValues[1].close, this.props.stockData.recentValues[0].close) + 
            ' (' + (this.handleValueChangePercent(this.props.stockData.recentValues[1].close, this.props.stockData.recentValues[0].close)) + '%)'}</span>
        </div>
        <div>
          <div className='stocks__stock-info'>
            <p>Latest value: {'$' + this.props.stockData.closingValues[0].price.slice(0, -2)}</p>
            <div className={this.props.watching ? '' : 'hidden'}>
              <p>Previous close: {'$' + this.props.stockData.closingValues[1].price.slice(0, -2)}</p>
              <p>Open: {'$' + this.props.stockData.recentValues[0].open.slice(0, -2)}</p>
              <p>Low: {'$' + this.props.stockData.recentValues[0].low.slice(0, -2)}</p>
              <p>High: {'$' + this.props.stockData.recentValues[0].high.slice(0, -2)}</p>
            </div>
            <p>Volume: {this.props.stockData.recentValues[0].volume}</p>
          </div>
          <div className='stocks__delete-stock' onClick={() => this.props.deleteStock(this.props.ticker, this.props.watching)}>x</div>
        </div>
      </div>
    );
  }
}