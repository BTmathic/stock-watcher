import React from 'react';
import StockChart from './StockChart'

export default (props) => (
  <div className='stock__details' id='details'>
    <h2>Stock Details ({props.data[0].name})</h2>
    <StockChart
      data={props.data}
      stockData={props.stockData}
      colours={[props.colour]}
      navbarLeft={props.navbarLeft}
      navbarWidth={props.navbarWidth}
    />
    <h3>{`Latest Data for ${props.data[0].name} (${props.stockData[0].lastUpdated})`}</h3>
    <div className='stock__details-container'>
      <div className='stock__detail'>
        {`Open: $${props.stockData[0].recentValues[0].open.slice(0, -2)}`}
      </div>
      <div className='stock__detail'>
        {`High: $${props.stockData[0].recentValues[0].high.slice(0, -2)}`}
      </div>
      <div className='stock__detail'>
        {`Low: $${props.stockData[0].recentValues[0].low.slice(0, -2)}`}
      </div>
      <div className='stock__detail'>
        {`Close: $${props.stockData[0].recentValues[0].close.slice(0, -2)}`}
      </div>
      <div className='stock__detail'>
        {`Volume: ${props.stockData[0].recentValues[0].volume}`}
      </div>
    </div>
    {/*
    <div>Form/button to select which stock to view, only allow one</div>
    */}
  </div>
);