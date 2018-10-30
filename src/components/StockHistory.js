import React from 'react';
import StockTicket from './StockTicket';

export default (props) => (
  <div className='stock__history' id='history'>
    <h2>Stock Watching History</h2>
    <div className='stocks__watching'>
      {
        props.stocks.length === 0 ? (
          <div className='stocks__stock'>
            <span>Enter a ticker to begin</span>
          </div>
        ) : (
            props.stocks.map((stock) => {
              const stockData = props.stockData.filter((stockData) => stockData.name === stock.name)[0];
              if (stockData === undefined) {
                return (<div></div>)
              } else {
                return <StockTicket
                  key={stock.name}
                  history={true}
                  ticker={stock.name}
                  stockData={stockData}
                  deleteStock={props.deleteStock}
                  handleTicketClick={props.handleTicketClick}
                />;
              }
            })
          )
      }
    </div>
  </div>
);