import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../routers/AppRouter';
import { startLogout } from '../actions/auth';

export const Header = ({ uid, startLogin, startLogout }) => (
  <header className='header'>
    <div className='content-container'>
      <div className='header__content'>
        <Link className='header__title' to="/dashboard">
          <h1>Stock Watcher</h1>
        </Link>
        {uid ? <button className='button button--header' onClick={startLogout}>Logout</button>
          : <button className='button' onClick={() => history.push('/login')}>Login</button>
        }
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  uid: !!state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);