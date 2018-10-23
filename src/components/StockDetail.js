import React from 'react';

export default class StockDetail extends React.Component {
  getChange = (value, prevValue) => {
    const change = Math.round(100 * (value - prevValue)) / 100
    return change < 0 ? change : '+' + change;
  };
  
  render() {
    const detailLowerCase = this.props.detail.toLowerCase();
    const values = this.props.values[0];
    const prevDayValues = this.props.values[1];
    const prevWeekValues = this.props.values[6]
    const dayChange = this.getChange(values[detailLowerCase], prevDayValues[detailLowerCase]);
    const weekChange = this.getChange(values[detailLowerCase], prevWeekValues[detailLowerCase]);
    return (
      <div className='stock__detail'>
        {this.props.detail}: {'$' + values[detailLowerCase].slice(0,-2)}
        <span style={{ color: dayChange > 0 ? 'green' : 'red'}}>
          <span>{dayChange}</span>
          <span>{`(${Math.round(100*(dayChange / prevDayValues[detailLowerCase] * 100)) / 100})%`}</span>
        </span>
        <span style={{ color: weekChange > 0 ? 'green' : 'red' }}>
          <span>{weekChange}</span>
          <span>{`(${Math.round(100 * (weekChange / prevWeekValues[detailLowerCase] * 100)) / 100}%)`}</span>
        </span>
      </div>
    );
  }
}