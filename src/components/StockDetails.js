import React from 'react';
import StockChart from './StockChart';
import StockDetail from './StockDetail';

export default class StockDetails extends React.Component {
  render() {
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
        <h3>{`Latest Data for ${this.props.stock[0].name} (${this.props.stockData[0].lastUpdated})`}</h3>
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
            {`Volume: ${this.props.stockData[0].recentValues[0].volume}`}
          </div>
        </div>
        <p>Click any stock below to view its details.</p>
      </div>
    );
  }
}