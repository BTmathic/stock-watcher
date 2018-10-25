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
            <Information visible={true}
              question={'What is a Stock Market?'}
              answer={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
            />
            <Information question={'Stock hours, trading and pre-market/post-market'} answer={'Dunno'} />
            <Information question={'Volume, both buy and sell count'} answer={'Dunno'} />
            <Information question={'What makes stock values go up and down?'} answer={'Dunno'} />
            <Information question={'When is the best time to buy and sell?'} answer={'Dunno'} />
            <Information question={'Types of stocks: common, preferred and share classes'} answer={'Dunno'} />
            <Information question={'Types of stocks: Growth, dividend (yield), new issues and defensive.'} answer={'Dunno'} />
            <Information question={'Index Funds: Why Warren Buffett says they are the best way to boost retirement savings.'} answer={'Dunno'} />
          </div>
      </div>
    );
  }
}