import React from 'react';

const amazonLogo = require('../../public/Images/amazon-logo.jpg');
const ibmLogo = require('../../public/Images/IBM-logo.png');
const tdLogo = require('../../public/Images/TD-logo.svg');
const axpLogo = require('../../public/Images/AMEX.png');
const tslaLogo = require('../../public/Images/Tesla.svg');
const nflxLogo = require('../../public/Images/Netflix.png');
const fbLogo = require('../../public/Images/Facebook.png');

export default () => (
  <div className='stock-icons'>
    <div className='stock-icons--overlay'>
      <div className='stock-icons__logos'>
        <div className='stock-icons__logo'>
          <div className='logo-padding'>
            <img src='/Images/AMEX.png' />
          </div>
          <img src={amazonLogo} />
          <div>AMZN</div>
        </div>
        <div className='stock-icons__logo'>
          <div className='logo-padding'>
            <img src='/Images/AMEX.png' />
          </div>
          <img src={ibmLogo} />
          <div>IBM</div>
        </div>
        {/* <div className='stock-icons__logo'>
          <div className='logo-padding'>
            <img src='/Images/AMEX.png' />
          </div>
          <img src={tdLogo} />
          <div>TD</div>
        </div>*/}
        <div className='stock-icons__logo'>
          <div className='logo-padding'>
            <img src='/Images/AMEX.png' />
          </div>
          <img src={axpLogo} />
          <div>AXP</div>
        </div>
        <div className='stock-icons__logo'>
          <div className='logo-padding'>
            <img src='/Images/AMEX.png' />
          </div>
          <img src={tslaLogo} />
          <div>TSLA</div>
        </div>
        <div className='stock-icons__logo'>
          <div className='logo-padding'>
            <img src='/Images/AMEX.png' />
          </div>
          <img src={nflxLogo} />
          <div>NFLX</div>
        </div>
        <div className='stock-icons__logo'>
          <div className='logo-padding'>
            <img src='/Images/AMEX.png' />
          </div>
          <img src={fbLogo} />
          <div>FB</div>
        </div>
      </div>
    </div>
    <div className='stock-icons--side-panel'></div>
  </div>
);