import React from 'react';
import { connect } from 'react-redux';
import { startAddStock } from '../actions/stocks';

class DashboardPage extends React.Component {
  state = {
    newStock: '',
    stocks: []
  }

  handleInput = (e) => {
    const newStock = e.target.value;
    this.setState(() => ({ newStock }));
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
          const name = metaData['2. Symbol'];
          const lastUpdated = metaData['3. Last Refreshed'];
          const values = json['Weekly Time Series'];
          const closingValues = Object.keys(values).map((date) => ({
            date,
            price: values[date]['4. close']
          }));
          const newStock = { name, lastUpdated, closingValues };
          this.props.startAddStock(newStock);
          const stocks = this.state.stocks;
          stocks.push(newStock);
          this.setState(() => ({
            stocks: stocks
          }));
        } else {
          // let the user know no stock with their submitted ticker was found
        }
      });
  }

  render() {
    return (
      <div>
        <div className='stocks'>
          <div className='stocks__chart'>Chart</div>
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
                      <div className='stocks__stock-ticker'>{stock.name.toUpperCase()}</div>
                      <div className='stocks__stock-info'>Last Updated: {stock.lastUpdated}</div>
                    </div>
                  );
                })
              )
            }
            <div className='stocks__stock stocks__add-stock' onClick={() => console.log(this.state.stocks)}>
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
  startAddStock: (stock) => dispatch(startAddStock(stock))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);