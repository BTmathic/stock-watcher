import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import { startLogin, startLogout } from '../actions/auth';

export const Header = ({ uid, startLogin, startLogout }) => (
  <header className='header'>
    <div className='content-container'>
      <div className='header__content'>
        <Link className='header__title' to="/dashboard">
          <h1>Stock Watcher</h1>
        </Link>
        {uid ? <button className='button button--header' onClick={startLogout}>Logout</button>
          : <button className='button' onClick={startLogin}>Login with Google</button>
        }
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  uid: !!state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);