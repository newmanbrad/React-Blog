import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load } from '../../redux/modules/admin/auth';
import connectData from '../../helpers/connectData';
import State from './State';

function fetchData(getState, dispatch) {
  return dispatch(load());
}

@connectData(fetchData)
@connect(
  state => ({
    auth: state.adminAuth
  })
)
export default class Welcome extends Component {
  render() {
    let auth = this.props.auth;

    if (auth.data && auth.data.data) {
      let name = auth.data.data.admin.name;
      return (
        <div className="container-fluid">
          <div className="welcome">
            <h1>Welcome{name ? ' ' + name + '!' : <span>! <Link to={ADMINPATH + 'login'}>Login</Link></span>}</h1>
          </div>
        </div>
      )
    } else {
      return <State {...auth} />
    }
  }
}
