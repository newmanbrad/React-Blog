import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import { isLoaded, load } from '../../redux/modules/admin/blogInfo';
import connectData from '../../helpers/connectData';
import '../layout.scss';

// Bootstrap components
import { Navbar, Nav} from 'react-bootstrap';

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
      let {blogInfo} = blogInfoProps.data.data;
      return (
        <div className="container-fluid">
          <DocumentMeta title='Blog Administration'/>
          <header>
            <Navbar inverse>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/" className="logo">{blogInfo.title} Admin</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <li><Link to={ADMINPATH + 'blogInfo'}>Blog Administration</Link></li>
                  <li><Link to={ADMINPATH + 'articleList'}>Posts</Link></li>
                  <li><Link to={ADMINPATH + 'articleTypeList'}>Types</Link></li>
                  <li><Link to={ADMINPATH + 'articleTagList'}>Tags</Link></li>
                  <li><Link to={ADMINPATH + 'commentList'}>Comments</Link></li>
                  <li><Link to={ADMINPATH + 'singlePageList'}>Pages</Link></li>
                  <li><Link to={ADMINPATH + 'userList'}>Users</Link></li>
                  <li><Link to={ADMINPATH + 'adminList'}>Admins</Link></li>
                  <li><Link to={ADMINPATH + 'linkList'}>Links</Link></li>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
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
