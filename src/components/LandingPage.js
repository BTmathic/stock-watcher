import React from 'react';
import Header from './Header';
import { history } from '../routers/AppRouter';

export default () => (
  <div className='main-page'>
    <Header />
    <div className='landing-display'>
      <div className='landing-display__panel'>
        <div className='landing-display--image'>
          <div className='landing-display--image-inlay'></div>
        </div>
      </div>
      <div className='landing-display__panel'>
        <h2>Watch your portfolio with ease</h2>
        <p>Quick and easy to setup</p>
        <div className='landing-display--buttons'>
          <div className='landing-display--button' onClick={() => history.push('/login')}>Get Started</div>
          <div className='landing-display--button'>Preview</div>
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
          <div className='description--text'>
            Use our stock watcher for a simple way to keep track of your portfolio, watch other stocks you are interested in or just keep track of any stock you are curious about.
            </div>
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
              <div>TSE: TD</div>
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