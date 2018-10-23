import React from 'react';

export default class DashboardNavbar extends React.Component {
  resize = () => {
    this.props.setPosition(this.navbar.offsetLeft, this.navbar.offsetWidth);
    this.forceUpdate();
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.props.setPosition(this.navbar.offsetLeft, this.navbar.offsetWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  };

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