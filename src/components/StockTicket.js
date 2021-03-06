import React from 'react';

export default class StockTicker extends React.Component {
  state = {
    opacity: 1
  }

  handleClick = (e) => {
    if (this.props.history) {
      this.props.handleTicketClick(this.props.ticker);
    }
  }

  handleFade = (e) => {
    for (let i=1; i < 11; i++) {
      setTimeout(() => {
        this.setState(() => ({ opacity: (10 - i)/10 }));
      }, 30*i);
    }
  }

  handleValueChange = (current, previousClose) => {
    const change = (current - previousClose).toFixed(2);
    return (change > 0 ? '+' : '') + change;
  }

  handleValueChangePercent = (current, previousClose) => {
    const change = (100*(current - previousClose) / previousClose).toFixed(2);
    return (change > 0 ? '+' : '') + change;
  }
  
  render() {
    const currentClose = this.props.stockData.recentValues[0].close;
    const prevClose = this.props.stockData.recentValues[1].close;
    return (
      <div
        className={[this.props.removeStock === this.props.ticker ? 'stocks__stock stocks--removal-animation' : 'stocks__stock',
          this.props.history ? 'stocks__stock-hover' : ''].join(' ')}
        key={this.props.ticker}
        onClick={this.handleClick}
        style={{ borderLeft: 0.7 + `rem solid ${this.props.colour}`, opacity: this.state.opacity }}>
        <div className='stocks__stock-ticker'>
          {this.props.ticker}
          <span style={{ color: this.handleValueChange(currentClose, prevClose) >= 0 ? 'green' : 'red' }}>
            {' ' + this.handleValueChange(currentClose, prevClose) + 
            ' (' + (this.handleValueChangePercent(currentClose, prevClose)) + '%)'}</span>
        </div>
        <div>
          <div className='stocks__stock-info'>
            <p>Latest value: {'$' + this.props.stockData.closingValues[0].price.slice(0, -2)}</p>
            <div className={this.props.history ? '' : 'hidden'}>
              <p>Previous close: {'$' + this.props.stockData.closingValues[1].price.slice(0, -2)}</p>
              <p>Open: {'$' + this.props.stockData.recentValues[0].open.slice(0, -2)}</p>
              <p>Low: {'$' + this.props.stockData.recentValues[0].low.slice(0, -2)}</p>
              <p>High: {'$' + this.props.stockData.recentValues[0].high.slice(0, -2)}</p>
            </div>
            <p>Volume: {this.props.stockData.recentValues[0].volume}</p>
          </div>
          <div className='stocks__delete-stock'
            onClick={(e) => {
              e.stopPropagation(); // prevent loading data into details component with history ticket click
              this.handleFade(e);
              setTimeout(() => this.props.deleteStock(e, this.props.ticker, this.props.history), 350);
            }}
          >x</div>
        </div>
      </div>
    );
  }
}