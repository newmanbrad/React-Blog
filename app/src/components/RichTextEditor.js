import React, { Component, PropTypes } from 'react';
const ReactQuill = require('react-quill');

export default class RichTextEditor extends Component {
  render() {
    let data = this.props.data;
    return (
      <ReactQuill theme="snow" value={data} />
    );
  }
};
