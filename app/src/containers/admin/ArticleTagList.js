import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load } from '../../redux/modules/admin/articleTagList';
import { del } from '../../redux/modules/admin/articleTag';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import PageList from '../../components/PageList';
import State from './State';
import { deleteOver } from '../../utils/actionOver';

// Bootstrap components
import {PageHeader, Button, Table} from 'react-bootstrap';

function fetchData(getState, dispatch, location) {
  return dispatch(load({params: {...location.query, x: 'articleTag'}}));
}

@connectData(fetchData)
@connect(
  state => ({
    list: state.adminArticleTagList,
    detail: state.adminArticleTag
  }),
  { del, load }
)
export default class ArticleTagList extends Component {
  state = {
    showAlert: false
  }
  render() {
    let
      props = this.props,
      list = props.list,
      detail = props.detail;

    if (list.data && list.data.data) {
      let
        {xData, pageList} = list.data.data;

      return (
        <div className="container-fluid">
          <PageHeader>Tag Administration</PageHeader>

          <div className="row">
            <div className="col-md-12">
              <Button className="btn-primary"><Link to={ADMINPATH + 'articleTag'}>Create Tag</Link></Button>
              <Alert data={detail.deleteData} loading={detail.deleteing} error={detail.deleteError} showAlert={this.state.showAlert} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 m-t-10">
              <Table responsive>
                <tbody>
                <tr>
                  <th>ID</th>
                  <th>Tag</th>
                  <th>Path</th>
                  <th>Actions</th>
                </tr>
                {xData.map((x, i) => {
                  return (
                    <tr key={i}>
                      <td>{(pageList.current - 1) * pageList.size + i + 1}</td>
                      <td>{x.name}</td>
                      <td>{x.path}</td>
                      <td>
                        <Link to={ADMINPATH + 'articleTag'} query={{id: x._id}}>Edit</Link>&nbsp;&nbsp;
                        <a href="javascript:void(0)" onClick={this.handleDelete.bind(this, x._id)}>Delete</a>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            </div>
          </div>
          <PageList {...pageList} path={ADMINPATH + 'articleTagList'} />
        </div>
      )
    } else {
      return <State {...list} />
    }
  }
  handleDelete(id) {
    deleteOver(this.props.del({params: {x: 'articleTag', id}}), this, 'articleTag');
  }
};
