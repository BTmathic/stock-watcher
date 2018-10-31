import React from 'react';

export default class StockDetail extends React.Component {
  getChange = (value, prevValue) => {
    const change = (value - prevValue).toFixed(2);
    return change < 0 ? change : '+' + change;
  };
  
  render() {
    const detailLowerCase = this.props.detail.toLowerCase();
    const values = this.props.values[0];
    const prevDayValues = this.props.values[1];
    const prevWeekValues = this.props.values[6]
    const dayChange = this.getChange(values[detailLowerCase], prevDayValues[detailLowerCase]);
    const weekChange = this.getChange(values[detailLowerCase], prevWeekValues[detailLowerCase]);
    const dayChangePercent = (dayChange / prevDayValues[detailLowerCase] * 100).toFixed(2);
    const weekChangePercent = (weekChange / prevWeekValues[detailLowerCase] * 100).toFixed(2);
    return (
      <div className='stock__detail'>
        {this.props.detail}: {'$' + values[detailLowerCase].slice(0,-2)}
        <span style={{ color: dayChange > 0 ? 'green' : 'red'}}>
          <span>{dayChange}</span>
          <span>{dayChangePercent < 0 ? dayChangePercent : '+' + dayChangePercent}%</span>
        </span>
        <span style={{ color: weekChange > 0 ? 'green' : 'red' }}>
          <span>{weekChange}</span>
          <span>{weekChangePercent < 0 ? weekChangePercent : '+' + weekChangePercent}%</span>
        </span>
      </div>
    );
  }
}