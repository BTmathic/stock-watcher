import React from 'react';
import { connect } from 'react-redux';
import Questions from './Questions';
import StockChart from './StockChart';
import StockTicket from './StockTicket';
import StockDetails from './StockDetails';
import StockHistory from './StockHistory';
import DashboardNavbar from './DashboardNavbar';
import StockInformation from './StockInformation';
import { startAddStockData } from '../actions/stockData';
import { startAddStock, startEditStock, startRemoveStock } from '../actions/stocks';

class DashboardPage extends React.Component {
  state = {
    dataUpTo: '',
    detailsStock: this.props.stocks[0].name,
    err: '',
    hover: '',
    navbarLeft: 0,
    navbarWidth: 0,
    newStock: '',
    portfolio: [],
    removeStock: ''
  }

  deleteStock = (ticker, history) => {
    this.setState(() => ({ removeStock: ticker }));
    if (history) {
      this.props.startRemoveStock(this.props.stocks.filter((stock) => stock.name === ticker)[0].id, false);
      const oldPortfolio = this.state.portfolio;
      const portfolio = oldPortfolio.filter((stock) => stock.name !== ticker);
      this.setState(() => ({
        err: '',
        portfolio,
        removeStock: ''
      }));
      if (portfolio.length === 0) {
        this.setState(() => ({ dataUpTo: '' }));
      }
    } else {
      this.props.startEditStock(this.props.stocks.filter((stock) => stock.name === ticker)[0].id, false);
      const portfolio = this.state.portfolio;
      for (let i=0; i < portfolio.length; i++) {
        if (portfolio[i].name === ticker) {
          portfolio[i].watching = false;
        }
      }
      this.setState(() => ({ portfolio }));
    }
  }

  handleInput = (e) => {
    const newStock = e.target.value;
    this.setState(() => ({ newStock }));
  }

  loadStockToDisplay = (newStock) => {
    const portfolioStock = { name: newStock.name, watching: true };
    this.props.startAddStock(portfolioStock);
    const portfolio = this.state.portfolio;
    portfolio.push(portfolioStock);
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
    const portfolio = this.state.portfolio;
    if (portfolio.filter((stock) => stock.name === this.state.newStock.toUpperCase()).length === 0) {
      const stockData = this.props.stockData.filter((stock) => stock.name === this.state.newStock.toUpperCase());
      if (stockData.length === 0) {
        fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.newStock}&apikey=${process.env.API_KEY}`)
          .then((resp) => resp.json())
          .then((json) => {
            const metaData = json['Meta Data'];
            if (!!metaData) {
              const name = metaData['2. Symbol'].toUpperCase();
              const lastUpdated = metaData['3. Last Refreshed'].split(' ')[0];
              const values = json['Time Series (Daily)'];
              const dailyValues = Object.keys(values).map((date) => ({
                date,
                open: values[date]['1. open'],
                high: values[date]['2. high'],
                low: values[date]['3. low'],
                close: values[date]['4. close'],
                volume: values[date]['5. volume']
              }));
              const closingValues = dailyValues.map((value) => ({
                date: value.date,
                price: value.close
              }));
              let recentValues = [];
              for (let i = 0; i < 7; i++) {
                recentValues.push(dailyValues[i]);
              };
              const newStock = { 
                name, 
                lastUpdated, 
                closingValues,
                recentValues
              };
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
      if (this.state.portfolio.filter((stock) => !stock.watching && stock.name === this.state.newStock.toUpperCase()).length > 0) {
        this.props.startEditStock(this.props.stocks.filter((stock) => stock.name === this.state.newStock.toUpperCase())[0].id, true);
        for (let i=0; i < portfolio.length; i++) {
          if (portfolio[i].name === this.state.newStock.toUpperCase()) {
            portfolio[i].watching = true;
          }
        }
        this.setState(() => ({
          err: '',
          newStock: '',
          portfolio
        }));
      } else {
        this.setState(() => ({ err: 'Stock already added' }));
      }
    }
  }

  componentWillMount() {
    const portfolio = this.props.stocks.map((stock) => ({name: stock.name, watching: stock.watching}));
    if (portfolio.length > 0) {
      const dataUpTo = this.props.stockData[0].lastUpdated;
      this.setState(() => ({
        dataUpTo,
        portfolio,
        stockData: this.props.stockData
      }));
    }
  }

  render() {
    const colours = ['orange', 'yellow', 'red', 'steelblue', 'green', 'pink', 'blue', 'black', 'lightblue', 'lightgrey', 'lightgreen'];
    let colourIndex = -1;
    return (
      <div className='main-page'>
        <div className='content-container'>
          <DashboardNavbar setPosition={(left, width) => this.setState(() => ({ navbarLeft: left, navbarWidth: width }))} />
          <div className='stocks'>
            <StockChart
              data={this.state.portfolio.filter((stock) => stock.watching)}
              stockData={this.props.stockData}
              colours={colours}
              navbarLeft={this.state.navbarLeft}
              navbarWidth={this.state.navbarWidth}
            />
              <div className='stocks__watching' id='watching'>
                {
                  this.state.portfolio.length === 0 ? (
                    <div className='stocks__stock'>
                      <span>Enter a ticker to begin</span>
                    </div>
                  ) : (
                    this.state.portfolio.map((stock) => {
                      if (stock.watching) {
                        colourIndex++;
                        const stockData = this.props.stockData.filter((stockData) => stockData.name === stock.name)[0];
                        if (stockData === undefined) {
                          return (<div></div>);
                        } else {
                          return <StockTicket
                            key={stock.name}
                            removeStock={this.state.removeStock}
                            ticker={stock.name}
                            colour={colours[colourIndex % colours.length]}
                            stockData={stockData}
                            deleteStock={this.deleteStock}
                            history={false}
                          />;
                        }
                      }
                    })
                  )
                }
              </div>
              <div className='stocks__watching-add'>
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
            <StockDetails
              colour={colours[0]}
              stock={this.state.portfolio.filter((stock) => stock.name === this.state.detailsStock)}
              navbarLeft={this.state.navbarLeft}
              navbarWidth={this.state.navbarWidth}
              stockData={this.props.stockData.filter((stock) => stock.name === this.state.detailsStock)}
            />
            <StockHistory
              deleteStock={this.deleteStock}
              stocks={this.state.portfolio}
              stockData={this.props.stockData}
              handleTicketClick={(detailsStock) => this.setState(() => ({ detailsStock }))}
            />
            <StockInformation />
            <Questions />
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
  startAddStock: (stock) => dispatch(startAddStock(stock)),
  startEditStock: (id, watching) => dispatch(startEditStock(id, watching)),
  startAddStockData: (stock) => dispatch(startAddStockData(stock)),
  startRemoveStock: (stock) => dispatch(startRemoveStock(stock))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);