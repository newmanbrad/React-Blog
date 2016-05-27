import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import classNames from 'classnames';

// Bootstrap components
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Header extends Component {
  state = {
    showNav: false,
    showHeaderDown: false
  };
  render() {
    let layout = this.props.data;

    console.log(layout);

    if (layout.data && layout.data.data) {
      let {showNav, showHeaderDown} = this.state,
          {articleTypes, blogInfo, articleTags, links} = layout.data.data;

      return (

        <header>
          <Navbar inverse className={classNames('header', {header_down: showHeaderDown})}>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/" className="logo">{blogInfo.title}</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">About</NavItem>
                <NavItem eventKey={2} href="#">Contact</NavItem>
                <NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
                  {articleTypes.map((v, i) => {
                    return <MenuItem><Link key={i} to='/' query={{typePath: v.path}}>{v.name}</Link></MenuItem>
                  })}
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Separated link</MenuItem>
                </NavDropdown>
              </Nav>
              <Nav pullRight>
                <NavItem eventKey={1} href="#">Link Right</NavItem>
                <NavItem eventKey={2} href="#">Link Right</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>

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
}
