import React from 'react';
import StockTicket from './StockTicket';
import { connect } from 'react-redux';
import { startRemoveStock } from '../actions/stocks';

const StockHistory = (props) => (
  <div className='stock__viewing-history' id='viewing-history'>
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
                />;
              }
            })
          )
      }
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startRemoveStock: (ticker) => dispatch(startRemoveStock(ticker))
});

export default connect(undefined, mapDispatchToProps)(StockHistory);