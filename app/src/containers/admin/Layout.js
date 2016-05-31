import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import { isLoaded, load } from '../../redux/modules/admin/blogInfo';
import connectData from '../../helpers/connectData';
import '../layout.scss';

// Bootstrap components
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
                  <NavItem><Link to={ADMINPATH + 'blogInfo'}>Site Info</Link></NavItem>
                  <NavItem><Link to={ADMINPATH + 'articleList'}>Posts</Link></NavItem>
                  <NavItem><Link to={ADMINPATH + 'articleTypeList'}>Types</Link></NavItem>
                  <NavItem><Link to={ADMINPATH + 'articleTagList'}>Tags</Link></NavItem>
                  <NavItem><Link to={ADMINPATH + 'commentList'}>Comments</Link></NavItem>
                  <NavItem><Link to={ADMINPATH + 'singlePageList'}>Pages</Link></NavItem>
                  <NavItem><Link to={ADMINPATH + 'userList'}>Users</Link></NavItem>
                  <NavItem><Link to={ADMINPATH + 'adminList'}>Admins</Link></NavItem>
                  <NavItem><Link to={ADMINPATH + 'linkList'}>Links</Link></NavItem>
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
