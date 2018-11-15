import React from 'react';
import { history } from '../routers/AppRouter';

export default class LoginPage extends React.Component {
  // try to build authentication with history and all methods here?
  // need to be careful about only storing hashed values for passwords instead of plain text
  // do not store in state, store hashed value in state as user types password in
  
  render() {
    return (
      <div className='login'>
        <h3>Login or Sign Up</h3>
        <form>
          <div className='login--input'>
            <label>Username</label>
            <input type='text' />
          </div>
          <div className='login--input'>
            <label>Password</label>
            <input type='password' />
          </div>
          <div className='login--buttons'>
            <input type='button' value='Login' className='login--button' />
            <input type='button' value='Cancel' className='login--button' onClick={() => history.push('/dashboard')} />
          </div>
        </form>
      </div>
    );
  }
}