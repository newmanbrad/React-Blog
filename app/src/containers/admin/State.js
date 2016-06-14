import React, { Component } from 'react';
import { Link } from 'react-router';

export default class State extends Component {
  render() {
    let {loading, error, data} = this.props;

    return (
      <div className="container-fluid">
        {loading ? 'Loading...' :
          error ? 'An Error Has Occurred...' :
            data.msg === 'Message' ? <p>Message <Link to={ADMINPATH + 'login'}>Login</Link></p> :
              data.status !== 'success' ? data.msg : ''}
      </div>
    )
  }
}
