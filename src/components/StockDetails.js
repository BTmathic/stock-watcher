import React from 'react';
import { connect } from 'react-redux';

export default () => (
  <div className='content-container'>
    <div id='stock__details'>
      <h2>Stock Details</h2>
      <div>Chart single stock</div>
      <div>Title (stock data for the latest full day)</div>
      <div>Stock open for the day</div>
      <div>Stock high for the day</div>
      <div>Stock low for the day</div>
      <div>Stock close for the day</div>
      <div>Stock volume for the day</div>
      <div>Form/button to select which stock to view, only allow one</div>
    </div>
  </div>
  );