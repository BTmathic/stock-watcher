import React from 'react';

const DashboardPage = () => (
  <div>
    <div className='stocks'>
      <div className='stocks__chart'>Chart</div>
      <div className='stocks__watching'>Stocks watched
        <div className='stocks__stock'>Stock</div>
        <div className='stocks__stock'>Stock</div>
        <div className='stocks__add-stock'>New Stock to add</div>
      </div>
    </div>
  </div>
);

export default DashboardPage;