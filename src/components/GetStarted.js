import React from 'react';

export default () => (
  <div className='get-started'>
    <h3>
      Completely free, quick and easy to sign up and start watching stocks instantly
    </h3>
    <div className='get-started--button' onClick={() => history.push('/login')}>
      Get Stock Data
    </div>
    <div className='get-started__map'>
      <div className='get-started__map-point'></div>
      <div className='get-started__map-point'></div>
      <div className='get-started__map-point'></div>
    </div>
    <div className='get-started__steps'>
      <div className='get-started__step'>
        Create an account
      </div>
      <div className='get-started__step'>
        Manage your portfolio
      </div>
      <div className='get-started__step'>
        Watch data roll in
      </div>
    </div>
  </div>
);