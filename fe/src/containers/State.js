import React, { Component } from 'react';

export default class State extends Component {
  render() {
    let {loading, error, data} = this.props;

    return (
      <section className="contents">
        {loading ? 'Loading...' :
          error ? 'An Error has Occurred...' :
            data.status !== 'success' ? data.msg : ''}
      </section>
    )
  }
}