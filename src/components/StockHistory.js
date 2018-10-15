import React from 'react';
import StockTicket from './StockTicket';

export default class StockHistory extends React.Component {

  deleteStock = () => {

  }

  render() {
    return (
      <div className='content-container'>
        <div className='stock__viewing-history' id='viewing-history'>
          <h2>Stock Watching History</h2>
          <div className='stocks__watching'>
            {
              this.props.stocks.length === 0 ? (
                <div className='stocks__stock'>
                  <span>Enter a ticker to begin</span>
                </div>
              ) : (
                  this.props.stocks.map((stock, index) => {
                    const stockData = this.props.stockData.filter((stockData) => stockData.name === stock.name)[0];
                    if (stockData === undefined) {
                      return (<div></div>)
                    } else {
                      return <StockTicket
                        key={stock.name}
                        //removeStock={this.state.removeStock}
                        ticker={stock.name}
                        //colour={colours[index % colours.length]}
                        stockData={stockData}
                        deleteStock={this.deleteStock}
                      />;
                    }
                  })
                )
            }
          </div>

          {/*
          <div>List of tickets for all stocks viewed before (to allow easy reload above)</div>
          <div>Give option to add to chart, or option to load into individual section above</div>
          <div>Give option to delete stock from history</div>
          */}
        </div>
      </div>
    );
  }
}