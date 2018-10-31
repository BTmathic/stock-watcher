import React from 'react';

export default class DashboardNavbar extends React.Component {
  state = {
    navbarActive: 'topTop',
    navbarPrev: 'topTop'
  }

  handleScroll = () => {
    let navbarActive = '';
    if (window.scrollY < this.props.topWatching - 250) {
      navbarActive = 'topTop';
    } else if (window.scrollY < this.props.topDetails - 250) {
      navbarActive = 'topWatching';
    } else if (window.scrollY < this.props.topHistory - 250) {
      navbarActive = 'topDetails';
    } else if (window.scrollY < this.props.topInformation - 250) {
      navbarActive = 'topHistory';
    } else if (window.scrollY < this.props.topQuestions - 450) {
      navbarActive = 'topInformation';
    } else {
      navbarActive = 'topQuestions';
    }
    if (this.state.navbarActive !== navbarActive) {
      this.setState((prevState) => ({
        navbarActive,
        navbarPrevious: prevState.navbarActive
      }));
    }
  }

  resize = () => {
    this.props.setPosition(this.navbar.offsetLeft, this.navbar.offsetWidth);
  }
  
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.resize);
    this.props.setPosition(this.navbar.offsetLeft, this.navbar.offsetWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.resize);
  };

  render() {
    const navbarActive = this.state.navbarActive.split('top')[1].toLowerCase();
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