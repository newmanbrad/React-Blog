import React, { Component } from 'react';
import { connect } from 'react-redux';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as detailActions from '../../redux/modules/admin/articleType';
import State from './State';
import { pushState } from 'redux-router';

function fetchData(getState, dispatch, location) {
  return dispatch(detailActions.load({params: {x: 'articleType', id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  state => ({
    detail: state.adminArticleType
  }),
  { ...detailActions, pushState }
)
export default class ArticleType extends Component {
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
              <td><h2>{xData._id ? 'Article Type' : 'Article Type 2'}</h2></td>
            </tr>
            <tr>
              <td className="td1">Name：</td>
              <td><input type="text" ref="name" className="form-control" defaultValue={xData.name} /></td>
            </tr>
            <tr>
              <td className="td1">Path：</td>
              <td><input type="text" ref="path" className="form-control" defaultValue={xData.path} /></td>
            </tr>
            <tr>
              <td className="td1">Enabled：</td>
              <td>
                <select ref="enabled" defaultValue={xData.enabled} className="form-control">
                  <option value={true}>Enabled</option>
                  <option value={false}>Disabled</option>
                </select>
              </td>
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
          name: 'path',
          rules: ['isRequired'],
          msgs: ['Path is required.']
        },{
            name: 'enabled'
        }
      ]),
      props = this.props;

    if (data) {
      if (id) {
        editOver(props.update({params: {x: 'articleType', id}, data}), this, ADMINPATH + 'articleTypeList');
      } else {
        editOver(props.create({params: {x: 'articleType'}, data}), this, ADMINPATH + 'articleTypeList');
      }
    }
  }
}
