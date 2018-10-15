import React from 'react';

export default (props) => (
  <div
    className={props.removeStock === props.ticker.name ? 'stocks__stock stocks--removal-animation' : 'stocks__stock'}
    key={props.ticker.name}
    style={{ borderLeft: 0.7 + `rem solid ${props.colour}`}}>
    <div className='stocks__stock-ticker'>{props.ticker.name}</div>
    <div>
      <div className='stocks__stock-info'>Last Updated: {props.stockData.lastUpdated}</div>
      <div className='stocks__delete-stock' onClick={(e) => props.deleteStock(props.ticker.name)}>x</div>
    </div>
  </div>
)