import React from 'react';
import bcryptjs from 'bcryptjs';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';
import { startSetStockData } from '../actions/stockData';
import { startSetStocks } from '../actions/stocks';
import { history } from '../routers/AppRouter';
import { login, logout, startAddUser } from '../actions/auth';

export class LoginPage extends React.Component {
  state = {
    loginError: '',
    registerError: ''
  }

  handleLogin = (e) => {
    e.preventDefault();
    // hash password so even if compromised the password will not be exposed
    fetch('/login', {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        'email': e.target[0].value,
        'password': e.target[1].value
      })
    }).then((res) => res.json()).then((json) => {
      if (!!json.error) {
        this.setState(() => ({ loginError: json.error }))
      } else {

      }
    }).catch((err) => console.log(err));
  };

  handleRegister = (e) => {
    e.preventDefault();
    console.log(e.target[1].value, e.target[2].value,
      e.target[1].value !== e.target[2].value);
    if (e.target[1].value.length < 8) {
      this.setState(() => ({ registerError: 'Password must be at least 8 characters'}));
    } else if (e.target[1].value !== e.target[2].value) {
      this.setState(() => ({ registerError: 'Passwords do not match'}));
    } else {
      this.setState(() => ({ registerError: '' }));
      /*****
      / hash password here so even if compromised the password will not be exposed
      ******/
      fetch('/register', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          'email': e.target[0].value,
          'password': e.target[1].value
        })
      }).then((res) => {
        return res.json()
      }).then((json) => {
        if (!!json.error) {
          this.setState(() => ({ registerError: json.error }))
        } else {
          this.props.startAddUser(json.email, json.hash, json.salt);
        }
      }).catch((err) => console.log(err));
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        Promise.all([
          this.props.startSetStockData(),
          this.props.startSetStocks(uid),
        ]).then(() => {
          this.props.login(uid)
          if (history.location.pathname === '/login') {
            history.push('/dashboard');
          }
        });
      } else {
        this.props.logout();
        if (history.location.pathname !== '/login') {
          history.push('/');
        }
      }
    });
  }
  
  render() {
    return (
      <div>
        <div className='login'>
          <h3>Login</h3>
          <form onSubmit={this.handleLogin}>
            <div className='login--input'>
              <label>Email</label>
              <input type='email' />
            </div>
            <div className='login--input'>
              <label>Password</label>
              <input type='password' />
            </div>
            <div className='login--input'>
              <label>Confirm Password</label>
              <input type='password' />
            </div>
            <div className='login--buttons'>
              <input type='submit' value='Login' className='login--button' />
              <input type='button' value='Cancel' className='login--button' onClick={() => history.push('/')} />
            </div>
          </form>
        </div>
        <div className='register'>
          <h3>New User? Sign up</h3>
          <form onSubmit={this.handleRegister}>
            <div className='login--input'>
              <label>Email</label>
              <input type='email' />
            </div>
            <div className='login--input'>
              <label>Password</label>
              <input type='password' />
            </div>
            <div className='login--input'>
              <label>Confirm Password</label>
              <input type='password' />
            </div>
            <div className='login--buttons'>
              <input type='submit' value='Register' className='login--button' />
              <input type='button' value='Cancel' className='login--button' onClick={() => history.push('/')} />
            </div>
          </form>
          {
            <div className='error'>
              {this.state.registerError}
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (uid) => dispatch(login(uid)),
  logout: () => dispatch(logout()),
  startAddUser: (email, hash, salt) => dispatch(startAddUser(email, hash, salt)),
  startSetStockData: () => dispatch(startSetStockData()),
  startSetStocks: (uid) => dispatch(startSetStocks(uid))
});

export default connect(undefined, mapDispatchToProps)(LoginPage);