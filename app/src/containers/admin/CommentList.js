import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load } from '../../redux/modules/admin/commentList';
import { del } from '../../redux/modules/admin/comment';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import PageList from '../../components/PageList';
import State from './State';
import { deleteOver } from '../../utils/actionOver';

// Bootstrap components
import {PageHeader, Table} from 'react-bootstrap';

function fetchData(getState, dispatch, location) {
  return dispatch(load({params: {...location.query, x: 'comment'}}));
}

@connectData(fetchData)
@connect(
  state => ({
    list: state.adminCommentList,
    detail: state.adminComment
  }),
  { del, load }
)
export default class CommentList extends Component {
  state = {
    showAlert: false
  }
  render() {
    let props = this.props,
        list = props.list,
        detail = props.detail;

    if (list.data && list.data.data) {
      let
        {xData, pageList} = list.data.data;

      return (
        <div className="container-fluid">
          <PageHeader>Comment Administration</PageHeader>

          <div className="row">
            <div className="col-md-12">
              <Alert data={detail.deleteData} loading={detail.deleteing} error={detail.deleteError} showAlert={this.state.showAlert} />
             </div>
          </div>

          <div className="row">
            <div className="col-md-12 m-t-10">
              <Table responsive>
                <tbody>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Created</th>
                  <th>Comment</th>
                  <th>Actions</th>
                </tr>
                {xData.map((x, i) => {
                  return (
                    <tr key={i}>
                      <td>{(pageList.current - 1) * pageList.size + i + 1}</td>
                      <td>{x.user && x.user.email || x.admin && x.admin.email}</td>
                      <td>{x.time}</td>
                      <td>{x.content.slice(0, 40) + (x.content.length > 40 ? '...' : '')}</td>
                      <td>
                        <Link to='/article' query={{id: x.article.id}}>Edit</Link>&nbsp;&nbsp;
                        <a href="javascript:void(0)" onClick={this.handleDelete.bind(this, x._id)}>Delete</a>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </Table>
            </div>
          </div>
          <PageList {...pageList} path={ADMINPATH + 'commentList'} />
        </div>
      )
    } else {
      return <State {...list} />
    }
  }
  handleDelete(id) {
    deleteOver(this.props.del({params: {x: 'comment', id}}), this, 'comment');
  }
};
