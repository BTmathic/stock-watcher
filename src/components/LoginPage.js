import React from 'react';
import Header from './Header';
import Example from './Example';

export const LoginPage = () => (
  <div>
    <Header />
    <div className='landing-image'>
      <p>Watch your portfolio with ease</p>
    </div>
    <div className='description'>Use our stock watcher for a simple way to keep track of your portfolio, watch other stocks you are interested in or just keep track of any stock you are curious about.</div>
    <Example text={'Example of use 1'} image={'1.jpg'} />
    <Example text={'Example of use 2'} image={'2.jpg'} />
    <Example text={'Example of use 3'} image={'3.jpg'} />
    <footer>Footer</footer>
  </div>
);

export default LoginPage;