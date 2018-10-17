import React from 'react';
import StockTicket from './StockTicket';
import { connect } from 'react-redux';
import { startRemoveStock } from '../actions/stocks';

class StockHistory extends React.Component {

  render() {
    return (
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
                      watching={true}
                      //removeStock={this.state.removeStock}
                      ticker={stock.name}
                      //colour={colours[index % colours.length]}
                      stockData={stockData}
                      deleteStock={this.props.deleteStock}
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
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveStock: (ticker) => dispatch(startRemoveStock(ticker))
});

export default connect(undefined, mapDispatchToProps)(StockHistory);