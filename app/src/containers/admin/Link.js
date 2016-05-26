import React, { Component } from 'react';
import { connect } from 'react-redux';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as detailActions from '../../redux/modules/admin/link';
import State from './State';
import { pushState } from 'redux-router';

function fetchData(getState, dispatch, location) {
  return dispatch(detailActions.load({params: {x: 'link', id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  state => ({
    detail: state.adminLink
  }),
  { ...detailActions, pushState }
)
export default class Link extends Component {
  state = {
    validateMsg: null,
    showAlert: false
  }
  render() {
    let
      detail = this.props.detail;

    if (detail.data && detail.data.data) {
      let {xData} = detail.data.data;
      return (
        <div className="main">
          <table className="table1">
            <tbody>
            <tr>
              <td className="td1">&nbsp;</td>
              <td><h2>{xData._id ? 'sure' : 'sure'}</h2></td>
            </tr>
            <tr>
              <td className="td1">Name：</td>
              <td><input type="text" ref="name" className="form-control" defaultValue={xData.name} /></td>
            </tr>
            <tr>
              <td className="td1">URL：</td>
              <td><input type="text" ref="url" className="form-control wd4" defaultValue={xData.url} /></td>
            </tr>
            <tr>
              <td className="td1">&nbsp;</td>
              <td>
                <a href="javascript:void(0)" className="btn" onClick={this.handleSubmit.bind(this, xData._id)}>Save</a>&nbsp;&nbsp;
                <Alert data={detail.editData} loading={detail.editing} error={detail.editError} validateMsg={this.state.validateMsg} showAlert={this.state.showAlert} />
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      )
    } else {
      return <State {...detail} />
    }
  }
  handleSubmit(id) {
    let
      data = formatForm(this, [
        {
          name: 'name',
          rules: ['isRequired'],
          msgs: ['Name is required.']
        }, {
          name: 'url',
          rules: ['isRequired', 'isUrl'],
          msgs: ['URL is required.', 'Not a valid URL.']
        }
      ]),
      props = this.props;
    
    if (data) {
      if (id) {
        editOver(props.update({params: {x: 'link', id}, data}), this, ADMINPATH + 'linkList');
      } else {
        editOver(props.create({params: {x: 'link'}, data}), this, ADMINPATH + 'linkList');
      }
    }
  }
}
