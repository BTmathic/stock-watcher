import React from 'react';

export default class DashboardNavbar extends React.Component {
  componentDidMount() {
    this.props.setPosition(this.navbar.offsetLeft, this.navbar.offsetWidth);
  }

  render() {
    return (
      <nav id='navbar' ref={(navbar) => this.navbar = navbar}>
        <a href='#top'><div>View Stock Data</div></a>
        <a href='#watching'><div>Displayed Stocks</div></a>
        <a href='#details'><div>Stock Details</div></a>
        <a href='#viewing-history'><div>Stock View History</div></a>
        <a href='#information'><div>Information</div></a>
        <a href='#questions'><div>Questions</div></a>
      </nav>
    );
  }
}