import React from 'react';
import Information from './Information';

export default class StockInformation extends React.Component {
  state = {
    openInfo: 1,
    prevOpenInfo: 0
  }

  render() {
    return (
      <div className='stock__information' id='information'>
        <h2>Information about Stocks and Index Funds</h2>
        <p>DISCLAIMER: Talk to an expert (for example, at your local financial institution) before diving into the stock market. All the information here is preliminary overview intended to help get you introduced to the ideas and concepts and (as explained below) the stock markets are complex so this cannot be taken as a complete guide to how to navigate the markets successfully.</p>
        <div className='information'>
          <Information visible={true} onPageUpdate={this.props.onPageUpdate}
            question={'What is a Stock Market?'}
            answer={"The stock market refers to the collection of markets and exchanges where the issuing and trading of equities or stocks of publicly held companies, bonds, and other classes of securities take place. This trade is either through formal exchanges or over-the-counter (OTC) marketplaces."}
            more={'https://www.investopedia.com/terms/s/stockmarket.asp'}
          />
          <Information onPageUpdate={this.props.onPageUpdate}
            question={'Stock hours, trading and pre-market/post-market'}
            answer={'The stock market has regular trading hours; they are open for business between 9:30 a.m. and 4:00 p.m. However, the stock market is also open for business after regular trading hours. Pre- and post-market trading sessions allow investors to trade stocks between the hours of 4:00 a.m. and 9:30 a.m. during pre-market trading, and 4:00 p.m. to 8:00 p.m. for the post-market session.'}
            more={'https://www.investopedia.com/financial-edge/1112/trading-in-the-pre--and-post-market-sessions.aspx'}
          />
          <Information onPageUpdate={this.props.onPageUpdate}
            question={'Volume, both buy and sell count'}
            answer={'Volume is one of the most basic and beneficial concepts to understand when trading stocks. Volume is defined as, “the number of shares or contracts traded in a security or an entire market during a given period of time.” What this means is that each time a person sells or buys shares of a stock, that is considered volume.'}
            more={'https://www.stocktrader.com/2006/03/21/volume-and-its-meaning/'}
          />
          <Information onPageUpdate={this.props.onPageUpdate}
            question={'What makes stock values go up and down?'}
            answer={'Stock prices change everyday by market forces, meaning that share prices change because of supply and demand. If more people want to buy a stock (demand) than sell it (supply), then the price moves up. Conversely, if more people wanted to sell a stock than buy it, there would be greater supply than demand, and the price would fall.'}
            more={'https://www.disnat.com/en/learning/trading-basics/stock-basics/what-causes-stock-prices-to-change'}
          />
          <Information onPageUpdate={this.props.onPageUpdate}
            question={'Types of stocks: common, preferred and share classes'}
            answer={'Common shares is the term that typically refers to a class of shares that holds a minimum set of rights such as the right to vote, the right to receive dividends, and the right to residual value of the assets upon liquidation. Preferred shares is the legal term that typically refers to a class of the shares that includes a fixed liquidation premium, required to be paid in priority to any payment on the common shares. Preferred shares can include many other rights, including those contained in common shares.'}
            more={'https://www.marsdd.com/mars-library/capital-structure-basics/'}
          />
          <Information onPageUpdate={this.props.onPageUpdate}
            question={'Types of stocks: Growth, dividend (yield), new issues and defensive.'}
            answer={'Growth dividend stocks are a unique type of investment that deliver strong earnings quarter after quarter -- and yet at the same time pay dividends. Growth stocks can hold the potential for greater gains than conservative selections. However, they typically also expose you to a higher level of risk -- whether or not they are dividend-paying stocks.'}
            more={'https://www.tsinetwork.ca/tag/growth-dividend-stocks/'}
          />
          <Information onPageUpdate={this.props.onPageUpdate}
            question={'Index Funds: Why Warren Buffett says they are the best way to boost retirement savings.'}
            answer={'Index funds are a form of passive investing. They hold every stock in an index such as the S&P 500, including big-name companies such as Apple, Microsoft and Google, and offer low turnover rates, so fees and taxes tend to be low as well.'}
            more={'https://www.cnbc.com/2018/01/03/why-warren-buffett-says-index-funds-are-the-best-investment.html'}
          />
        </div>
      </div>
    );
  }
}