import React from 'react';
import { connect } from 'react-redux';
import StockChart from './StockChart';
import { startAddStockData } from '../actions/stockData';
import { startAddStock, startRemoveStock } from '../actions/stocks';

class DashboardPage extends React.Component {
  state = {
    dataUpTo: '',
    err: '',
    hover: '',
    newStock: '',
    portfolio: []
  }

  deleteStock = (ticker) => {
    setTimeout(() => { // timeout to let ticket fade out animation complete
      this.props.startRemoveStock(this.props.stocks.filter((stock) => stock.name === ticker)[0].id);
      const oldPortfolio = this.state.portfolio;
      const portfolio = oldPortfolio.filter((stock) => stock.name !== ticker);
      this.setState(() => ({
        err: '',
        portfolio
      }));
      if (portfolio.length === 0) {
        this.setState(() => ({ dataUpTo: '' }));
      }
    }, 1000);
  }

  handleInput = (e) => {
    const newStock = e.target.value;
    this.setState(() => ({ newStock }));
  }

  loadStockToDisplay = (newStock) => {
    this.props.startAddStock(newStock.name);
    const portfolio = this.state.portfolio;
    portfolio.push(newStock.name);
    this.setState(() => ({
      err: '',
      newStock: '',
      portfolio
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    // Fetch weekly stock data for stock with ticker this.state.newStock
    // If the fetch is successful, data is returned as an object with keys
    // 'Meta Data' for the meta data, and 'Weekly Time Series' for the stock data
    // If the fetch is not successful an error message is returned by the call
    //
    // As we are using a free API with a limit of 5 calls/minute, do not fetch data
    // if user is trying to add a stock already in their portfolio. Though we allow
    // refetching if user is updating old stock data
    const portfolioStocks = this.state.portfolio.concat(this.props.stocks);
    if (portfolioStocks.filter((stock) => stock.name === this.state.newStock.toUpperCase()).length === 0) {
      const stockData = this.props.stockData.filter((stock) => stock.name === this.state.newStock.toUpperCase());
      if (stockData.length === 0) {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${this.state.newStock}&apikey=${process.env.API_KEY}`)
          .then((resp) => resp.json())
          .then((json) => {
            const metaData = json['Meta Data'];
            if (!!metaData) {
              const name = metaData['2. Symbol'].toUpperCase();
              const lastUpdated = metaData['3. Last Refreshed'].split(' ')[0];
              const values = json['Weekly Time Series'];
              const closingValues = Object.keys(values).map((date) => ({
                date,
                price: values[date]['4. close']
              }));
              const newStock = { name, lastUpdated, closingValues };
              if (this.state.dataUpTo === '') {
                this.setState(() => ({ dataUpTo: newStock.lastUpdated }));
                this.props.startAddStockData(newStock);
                this.loadStockToDisplay(newStock);
              } else {
                if (lastUpdated !== this.state.dataUpTo) {
                  this.setState(() => ({ err: `Data not updated recently for ${this.state.newStock.toUpperCase()}` }));
                } else {
                  this.props.startAddStockData(newStock);
                  this.loadStockToDisplay(newStock);
                }
              }
            } else {
              this.setState(() => ({ err: `No stock with ticker ${this.state.newStock.toUpperCase()} found` }))
            }
          });
      } else {
        this.loadStockToDisplay(stockData[0]);
      }
    } else {
      this.setState(() => ({ err: 'Stock already added' }));
    }
  }

  componentDidMount() {
    const portfolio = this.props.stocks.map((stock) => stock.name);
    if (portfolio.length > 0) {
      const dataUpTo = this.props.stockData[0].lastUpdated;
      this.setState(() => ({
        dataUpTo,
        portfolio
      }));
    }
  }

  render() {
    const colours = ['steelblue', 'yellow', 'red', 'orange', 'green', 'pink', 'blue', 'black', 'lightblue', 'lightgrey', 'lightgreen'];
    return (
      <div className='main-page'>
        <div className='stocks'>
          <div className='content-container dashboard--title'>
            <h2>Stock Data</h2>
          </div>
          <StockChart data={this.props.stocks} colours={colours} />
          <div className='content-container'>
            <div className='stocks__watching'>
              {
                this.props.stocks.length === 0 ? (
                  <div className='stocks__stock'>
                    <span>Enter a ticker to begin</span>
                  </div>
                ) : (
                    this.props.stocks.map((ticker, index) => {
                      const stockData = this.props.stockData.filter((stock) => stock.name === ticker.name)[0];
                      if (stockData === undefined) {
                        return (<div></div>)
                      } else {
                        return (
                          <div
                            className={this.state.removeStock === ticker.name ? 'stocks__stock stocks--removal-animation' : 'stocks__stock'}
                            key={ticker.name}
                            style={{ borderLeft: 0.7 + `rem solid ${colours[index % colours.length]}` }}>
                            <div className='stocks__stock-ticker'>{ticker.name}</div>
                            {
                              /*stockData.lastUpdated === '' ? <div></div> :*/
                              <div>
                                <div className='stocks__stock-info'>Last Updated: {stockData.lastUpdated}</div>
                                <div className='stocks__delete-stock' onClick={(e) => this.deleteStock(ticker.name)}>x</div>
                              </div>
                            }
                          </div>
                        );
                      }
                    })
                  )
              }
            </div>
            <div className='stocks__watching'>
              <div className='stocks__stock stocks__add-stock'>
                <form onSubmit={this.onSubmit}>
                  <input
                    name='newStock'
                    className='stocks__add-stock-ticker'
                    type='text'
                    placeholder='Stock tag'
                    value={this.state.newStock}
                    onChange={this.handleInput}
                    required
                  />
                  <input type='submit' className='stocks__submit-stock-ticker' />
                </form>
              </div>
            </div>
            <div className='stock__error'>{this.state.err}</div>
          </div>
          <div className='content-container'>
            <h2>Stock Watching History</h2>
          </div>
          <div>
            {/* Add a section to follow previously searched stocks
                Also allow these to be deleted if the user wishes
                These can have a 'likes' or 'watching' count
            */}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  stockData: state.stockData,
  stocks: state.stocks
});

const mapDispatchToProps = (dispatch) => ({
  startAddStock: (name) => dispatch(startAddStock(name)),
  startAddStockData: (stock) => dispatch(startAddStockData(stock)),
  startRemoveStock: (ticker) => dispatch(startRemoveStock(ticker))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);