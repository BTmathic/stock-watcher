import React from 'react';
import { connect } from 'react-redux';
import StockChart from './StockChart';
import { startAddStock, startRemoveStock } from '../actions/stocks';

class DashboardPage extends React.Component {
  state = {
    newStock: '',
    stocks: []
  }

  handleInput = (e) => {
    const newStock = e.target.value;
    this.setState(() => ({ newStock }));
  }

  deleteStock = (ticker) => {
    this.props.startRemoveStock(this.props.stocks.filter((stock) => stock.name === ticker)[0].id);
    const oldStocks = this.state.stocks;
    const stocks = oldStocks.filter((stock) => stock.name !== ticker);
    this.setState(() => ({ stocks }));
  }

  loadStockData = (newStock) => {
    // add something to make sure stock is not already loaded
    this.props.startAddStock(newStock);
    const stocks = this.state.stocks;
    stocks.push(newStock);
    this.setState(() => ({
      stocks: stocks
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    // Fetch weekly stock data for stock with ticker this.state.newStock
    // If the fetch is successful, data is returned as an object with keys
    // 'Meta Data' for the meta data, and 'Weekly Time Series' for the data
    // If the fetch is not successful an error message is returned by the call
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${this.state.newStock}&apikey=${process.env.API_KEY}`)
      .then((resp) => resp.json())
      .then((json) => {
        const metaData = json['Meta Data'];
        if (!!metaData) {
          const name = metaData['2. Symbol'].toUpperCase();
          const lastUpdated = metaData['3. Last Refreshed'];
          const values = json['Weekly Time Series'];
          const closingValues = Object.keys(values).map((date) => ({
            date,
            price: values[date]['4. close']
          }));
          const newStock = { name, lastUpdated, closingValues };
          this.loadStockData(newStock);
        } else {
          const noStock = { name: `No stock with ticker ${this.state.newStock.toUpperCase()} found`, lastUpdated: '', closingValues: []}
          this.loadStockData(noStock);
        }
    });
  }

  render() {
    return (
      <div>
        <div className='stocks'>
          <StockChart data={this.props.stocks} />
          <div className='stocks__watching'>
            {
              this.props.stocks.length === 0 ? (
                <div className='stocks__stock'>
                  <span>Enter a ticker to begin</span>
                </div>
              ) : (
                this.props.stocks.map((stock) => {
                  return (
                    <div className='stocks__stock' key={stock.name}>
                      <div className='stocks__stock-ticker'>{stock.name}</div>
                      {
                        stock.lastUpdated === '' ? <div></div> :
                        <div>
                          <div className='stocks__stock-info'>Last Updated: {stock.lastUpdated}</div>
                          <div className='stocks__delete-stock' onClick={() => this.deleteStock(stock.name)}>x</div>
                        </div>
                      }
                    </div>
                  );
                })
              )
            }
            <div className='stocks__stock stocks__add-stock'>
              <form className='form' onSubmit={this.onSubmit}>
                <input 
                  name='newStock'
                  type='text'
                  placeholder='stock tag'
                  autoFocus
                  value={this.state.newStock}
                  onChange={this.handleInput}
                  required
                />
                <input type='submit' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  stocks: state.stocks
});

const mapDispatchToProps = (dispatch) => ({
  startAddStock: (stock) => dispatch(startAddStock(stock)),
  startRemoveStock: (ticker) => dispatch(startRemoveStock(ticker))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);