import React, { Component } from 'react';
import { connect } from 'react-redux';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as detailActions from '../../redux/modules/admin/admin';
import State from './State';
import { pushState } from 'redux-router';

function fetchData(getState, dispatch, location) {
  return dispatch(detailActions.load({params: {x: 'admin', id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  state => ({
    detail: state.adminAdmin
  }),
  { ...detailActions, pushState }
)
export default class Admin extends Component {
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
        <div className="main admin">
          <table className="table1">
            <tbody>
            <tr>
              <td className="td1">&nbsp;</td>
              <td><h2>{xData._id ? 'User' : 'User'}</h2></td>
            </tr>
            <tr>
              <td className="td1">Name：</td>
              <td><input type="text" ref="name" className="form-control" defaultValue={xData.name} /></td>
            </tr>
            <tr>
              <td className="td1">Email：</td>
              <td><input type="text" ref="email" className="form-control" defaultValue={xData.email} /></td>
            </tr>
            <tr>
              <td className="td1">Password：</td>
              <td><input type="password" ref="password" className="form-control" /></td>
            </tr>
            <tr>
              <td className="td1">&nbsp;</td>
              <td>
                <a href="javascript:void(0)" className="btn" onClick={this.handleSubmit.bind(this, xData._id)}>Submit</a>&nbsp;&nbsp;
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
          msgs: ['Name is required！']
        }, {
          name: 'email',
          rules: ['isRequired', 'isEmail'],
          msgs: ['Email is required！', 'Must be a valid email！']
        }, {
          name: 'password',
          rules: ['isRequired'],
          msgs: ['Password is required！']
        }
      ]),
      props = this.props;

    if (data) {
      if (id) {
        editOver(props.update({params: {x: 'admin', id}, data}), this, ADMINPATH + 'adminList');
      } else {
        editOver(props.create({params: {x: 'admin'}, data}), this, ADMINPATH + 'adminList');
      }
    }
  }
}
