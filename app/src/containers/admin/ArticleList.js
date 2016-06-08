import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load } from '../../redux/modules/admin/articleList';
import { del } from '../../redux/modules/admin/article';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import PageList from '../../components/PageList';
import State from './State';
import { deleteOver } from '../../utils/actionOver';

// Bootstrap components
import {PageHeader, Button} from 'react-bootstrap';

function fetchData(getState, dispatch, location) {
  return dispatch(load({params: {...location.query}}));
}

@connectData(fetchData)
@connect(
  state => ({
    articleList: state.adminArticleList,
    article: state.adminArticle
  }),
  { del, load }
)
export default class ArticleList extends Component {
  state = {
    showAlert: false
  };
  render() {
    let
      props = this.props,
      articleList = props.articleList,
      article = props.article;

    if (articleList.data && articleList.data.data) {
      let
        {articles, articleTypes, pageList} = articleList.data.data;

      return (
        <div className="main">
          <PageHeader>Post Administration</PageHeader>
          <Button><Link to={ADMINPATH + 'article'}>Add Post</Link></Button>
          <Alert data={article.deleteData} loading={article.deleteing} error={article.deleteError} showAlert={this.state.showAlert} />
          <div className="table2_wrap">
            <table className="table2">
              <tbody>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Visits</th>
                <th>Type</th>
                <th>Tags</th>
                <th>Comments</th>
                <th>Created</th>
                <th>Edited</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              {articles.map((article, i) => {
                return (
                  <tr key={i}>
                    <td>{(pageList.current - 1) * pageList.size + i + 1}</td>
                    <td>{article.title.slice(0, 25) + (article.title.length > 25 ? '...' : '')}</td>
                    <td>{article.author}</td>
                    <td>{article.visits}</td>
                    <td>{article.type.name}</td>
                    <td>
                      {article.tags.map((tag, i) => {
                        return (i !== 0 ? '、' : '') + tag.name
                      })}
                    </td>
                    <td><Link to={ADMINPATH + 'commentList'} query={{'article.id': article._id}}>{article.commentCount}</Link></td>
                    <td>{article.createTime.slice(0, 10)}</td>
                    <td>{article.lastEditTime.slice(0, 10)}</td>
                    <td>{article.enabled ? 'Enabled' : 'Disabled'}</td>
                    <td>
                      <Link to={ADMINPATH + 'article'} query={{id: article._id}}>Edit</Link>&nbsp;&nbsp;
                      <a href="javascript:void(0)" onClick={this.handleDelete.bind(this, article._id)}>Delete</a>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
          <PageList {...pageList} path={ADMINPATH + 'articleList'} />
        </div>
      )
    } else {
      return <State {...articleList} />
    }
  }
  handleDelete(id) {
    deleteOver(this.props.del({params: {id}}), this);
  }
};
