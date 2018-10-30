import React from 'react';

export default class DashboardNavbar extends React.Component {
  resize = () => {
    this.props.setPosition(this.navbar.offsetLeft, this.navbar.offsetWidth);
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.props.setPosition(this.navbar.offsetLeft, this.navbar.offsetWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  };

  render() {
    const navbarActive = this.props.navbarActive.split('top')[1].toLowerCase();
    return (
      <nav id='navbar' ref={(navbar) => this.navbar = navbar}>
        <a href='#top'><div className={navbarActive === 'top' ? 'navbarActive' : ''}>View Stock Data</div></a>
        <a href='#watching'><div className={navbarActive === 'watching' ? 'navbarActive' : ''}>Displayed Stocks</div></a>
        <a href='#details'><div className={navbarActive === 'details' ? 'navbarActive' : ''}>Stock Details</div></a>
        <a href='#history'><div className={navbarActive === 'history' ? 'navbarActive' : ''}>Stock View History</div></a>
        <a href='#information'><div className={navbarActive === 'information' ? 'navbarActive' : ''}>Information</div></a>
        <a href='#questions'><div className={navbarActive === 'questions' ? 'navbarActive' : ''}>Questions</div></a>
      </nav>
    );
  }
}