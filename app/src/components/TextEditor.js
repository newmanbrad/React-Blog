import React, { Component, PropTypes } from 'react';
import ReactQuill from 'react-quill';

export default class TextEditor extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    readOnly: PropTypes.bool,
    value: PropTypes.string
  };

  mixins = [ReactQuill.Mixin];

  state = {
    theme: 'snow',
    value: this.props.value
  };

  onEditorChange(value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  getValue() {
    return this.state.value;
  }

  render() {
    return (
      <div>
        <ReactQuill
          {...this.props}
          ref="quill"
          onChange={this.onEditorChange.bind(this)}
          theme={this.state.theme}
          value={this.state.value}>
          {!this.props.readOnly && <ReactQuill.Toolbar
            key="toolbar"
            ref="toolbar"
            items={ReactQuill.Toolbar.defaultItems} />}
          <div key="editor"
               ref="editor"
               className="quill-contents"
               dangerouslySetInnerHTML={{__html: this.getValue()}} />
        </ReactQuill>
      </div>
    );
  }
}
