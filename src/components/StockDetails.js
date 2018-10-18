import React from 'react';
import StockChart from './StockChart'

export default (props) => (
  <div className='stock__details' id='details'>
    <h2>Stock Details ({props.data[0].name})</h2>
    <StockChart
      data={props.data}
      stockData={props.stockData}
      colours={[props.colour]}
      navbarWidth={props.navbarWidth}
    />
    {/*
    <div>Chart single stock</div>
    <div>Title (stock data for the latest full day)</div>
    <div>Stock open for the day</div>
    <div>Stock high for the day</div>
    <div>Stock low for the day</div>
    <div>Stock close for the day</div>
    <div>Stock volume for the day</div>
    <div>Form/button to select which stock to view, only allow one</div>
    */}
  </div>
);