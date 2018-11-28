import React from 'react';
import Header from './Header';
import StockIcons from './StockIcons';
import GetStarted from './GetStarted';
import { history } from '../routers/AppRouter';


export default () => (
  <div className='main-page'>
    <Header />
    <div className='landing-display'>
      <div className='landing-display__panel'>
        <h2>Watch your portfolio with ease, follow stocks and get analytics</h2>
        <p>Quick and easy to setup, 100% free membership</p>
        <div className='get-started--button' onClick={() => history.push('/login')}>Get Started</div>
      </div>
      <div className='landing-display__panel'>
        <div className='landing-display--image'>
          <div className='landing-display--image-inlay'></div>
        </div>
      </div>
    </div>
    <div className='main-sections'>
      <div className='main-section-container'>
        <div className='main-section'>
          <div className='main-section--image-container'>
            <div className='main-section--image1'></div>
          </div>
          <div className='main-section--text'>
            <h3>See and Compare Stock Data</h3>
            <p>Watch growth of each stock, analyze the data while keeping an eye on data for any stocks you are interested in</p>
            <div className='get-started--button' onClick={() => history.push('/login')}>Get Started</div>
          </div>
        </div>
        <StockIcons />
      </div>
      <div className='main-section-container'>
        <div className='main-section main-section2'>
          <div className='main-section--text'>
            <h3>Stock/Index Fund Basics</h3>
            <p>Learn some of the basics and develop your knowledge to help make good investments, whether you prefer shorter or longer term trading.</p>
            <div className='get-started--button' onClick={() => history.push('/login')}>Start Watching</div>
          </div>
          <div className='main-section--image-container main-section2--image-container'>
            <div className='main-section--image2'></div>
          </div>
        </div>
      </div>
      <div className='main-section-container'>
        <div className='main-section main-section3'></div>
        <GetStarted />
      </div>
    </div>
    <footer>
      <div>Created by: <a href='https://btmathic.github.io/'>Alexander Molnar</a></div>
      <div>&copy; 2018</div>
      <div>Stock Data: <a href='https://www.alphavantage.co/'>Alphavantage</a></div>
    </footer>
  </div>
);