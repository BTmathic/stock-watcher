import React from 'react';
import Header from './Header';
import { history } from '../routers/AppRouter';

export default () => (
  <div className='main-page'>
    <Header />
    <div className='landing-display'>
      <div className='landing-display__panel'>
        <h2>Watch your portfolio with ease, follow stocks and get analytics</h2>
        <p>Quick and easy to setup, 100% free membership</p>
        <div className='landing-display--buttons'>
          <div className='landing-display--button' onClick={() => history.push('/login')}>Get Started</div>
        </div>
      </div>
      <div className='landing-display__panel'>
        <div className='landing-display--image'>
          <div className='landing-display--image-inlay'></div>
        </div>
      </div>
    </div>
    <div className='examples'>
      <div className='example-container'>
        <div className='example'>
          <div className='example--image-container'>
            <div className='example--image1'></div>
          </div>
          <div className='example--text'>
            <h3>See and Compare Stock Data</h3>
            <p>Easy add/remove to see as many or as few stocks charted at any time</p>
          </div>
        </div>
        <div className='description'>
          <div className='description__logos'>
            <div className='description__logo'>
              <img src='/Images/amazon-logo.jpg' />
              <div>NASDAQ: AMZN</div>
            </div>
            <div className='description__logo'>
              <div className='logo-padding'>
                <img src='/Images/amazon-logo.jpg' />
              </div>
              <img src='/Images/IBM-logo.png' />
              <div>NYSE: IBM</div>
            </div>
            <div className='description__logo'>
              <div className='logo-padding'>
                <img src='/Images/amazon-logo.jpg' />
              </div>
              <img src='/Images/TD-logo.svg' />
              <div>TSX: TD</div>
            </div>
            <div className='description__logo'>
              <div className='logo-padding'>
                <img src='/Images/amazon-logo.jpg' />
              </div>
              <img src='/Images/AMEX.png' />
              <div>NYSE: AXP</div>
            </div>
          </div>
          <div className='description__logos'>
            <div className='description__logo'>
              <img src='/Images/Tesla.svg' />
              <div>NASDAQ: TSLA</div>
            </div>
            <div className='description__logo'>
              <div className='logo-padding'>
                <img src='/Images/amazon-logo.jpg' />
              </div>
              <img src='/Images/Netflix.png' />
              <div>NASDAQ: NFLX</div>
            </div>
            <div className='description__logo'>
              <div className='logo-padding'>
                <img src='/Images/amazon-logo.jpg' />
              </div>
              <img src='/Images/Facebook.png' />
              <div>NASDAQ: FB</div>
            </div>
          </div>
        </div>
      </div>
      <div className='example-container'>
        <div className='example'>
          <div className='example--text'>
            <h3>Learn Stock/Index Fund Basics</h3>
            <p>New to stocks? Learn the basics here to help get ready to set up for your first portfolio or index fund.</p>
          </div>
          <div className='example--image-container'>
            <div className='example--image2'></div>
          </div>
        </div>
      </div>
      <div className='example-container'>
        <div className='example'>
          <div className='example--image-container'>
            <div className='example--image3'></div>
          </div>
          <div className='example--text'>
            <h3>Comprehensive Data</h3>
            <p>Get extensive details about each stock being watched</p>
          </div>
        </div>
        <div className='socials'>
          Recommend tracking or learning about stocks to your friends and colleagues
          <div className='socials__logos'>
            <div className='socials__logo socials__logo--fb'>
              <img src='/Images/facebook-logo.png' /> FACEBOOK
            </div>
            <div className='socials__logo socials__logo--twitter'>
              <img src='/Images/twitter-logo.png' /> TWITTER
            </div>
            <div className='socials__logo socials__logo--email'>
              <img src='/Images/email.png' /> EMAIL
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>Footer</footer>
  </div>
);