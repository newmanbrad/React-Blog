import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import { isLoaded, load } from '../../redux/modules/admin/blogInfo';
import connectData from '../../helpers/connectData';
import classNames from 'classnames';
import '../layout.scss';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(load());
  }
}

@connectData(fetchData)
@connect(
  state => ({blogInfo: state.adminBlogInfo})
)
export default class Layout extends Component {
  render() {
    let blogInfoProps = this.props.blogInfo;

    if (blogInfoProps.data && blogInfoProps.data.data) {
      let
        {blogInfo} = blogInfoProps.data.data;
      return (
        <div className="admin">
          <DocumentMeta title='Blog Administration'/>
          <header className="header">
            <div className="inner">
              <h1><Link to={String(ADMINPATH)} className="logo">{blogInfo.title} Admin</Link></h1>
              <div className="icon-menu"></div>
              <nav id="nav">
                <Link to={ADMINPATH + 'blogInfo'}>Site Info</Link>
                <Link to={ADMINPATH + 'articleList'}>Posts</Link>
                <Link to={ADMINPATH + 'articleTypeList'}>Types</Link>
                <Link to={ADMINPATH + 'articleTagList'}>Tags</Link>
                <Link to={ADMINPATH + 'commentList'}>Comments</Link>
                <Link to={ADMINPATH + 'singlePageList'}>Pages</Link>
                <Link to={ADMINPATH + 'userList'}>Users</Link>
                <Link to={ADMINPATH + 'adminList'}>Admins</Link>
                <Link to={ADMINPATH + 'linkList'}>Links</Link>
              </nav>
            </div>
          </header>
          {this.props.children}
          <footer className="footer" dangerouslySetInnerHTML={{__html: blogInfo.copyright}}></footer>
        </div>
      )
    } else {
      return (
        <div className="welcome">
          <DocumentMeta title='500 Error'/>
          <h1>An Error Has Occurred...</h1>
        </div>
      )
    }
  }
};
