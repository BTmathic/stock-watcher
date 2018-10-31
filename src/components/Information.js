import React from 'react';

export default class Information extends React.Component {
  state = {
    visible: this.props.visible
  };

  toggleVisible = () => {
    this.setState((prevState) => ({ visible: !prevState.visible }));
    this.props.onPageUpdate();
  }
  
  render() {
    return (
      <div>
        <span className='information__question' onClick={this.toggleVisible}>
          {this.props.question}
        </span>
        {
          this.state.visible && <div className='information__answer'>
            {this.props.answer}
            <div className='information__more'>
              {<a target='_blank' href={this.props.more}>Read more</a>}
            </div>
          </div>

        }
      </div>
    );
  };
}