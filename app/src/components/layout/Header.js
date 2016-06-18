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
        <div className="widewrapper masthead">
          <div className="container">

            <Link to="/" className="logo" itemID="logo">{blogInfo.title}</Link>

            <div id="mobile-nav-toggle" className="pull-right">
              <a href="#" data-toggle="collapse" data-target=".tales-nav .navbar-collapse">
                <i className="fa fa-bars"></i>
              </a>
            </div>

            <nav className="pull-right tales-nav">
              <div className="collapse navbar-collapse">
                <ul className="nav nav-pills navbar-nav">

                  <NavDropdown eventKey={3} title="Categories" id="basic-nav-dropdown">
                    {articleTypes.map((v, i) => {
                      return <MenuItem><Link key={i} to='/' query={{typePath: v.path}}>{v.name}</Link></MenuItem>
                    })}
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>

                  <li className="dropdown active">
                    <a className="dropdown-toggle"
                       data-toggle="dropdown"
                       href="#">
                      Blog
                      <b className="caret"></b>
                    </a>
                    <ul className="dropdown-menu">
                      <li><a href="index.html">Blog</a></li>
                      <li><a href="blog-detail.html">Blog Detail</a></li>
                    </ul>
                  </li>
                  <NavItem eventKey={1} href="#">About</NavItem>
                  <NavItem eventKey={2} href="#">Contact</NavItem>
                </ul>
              </div>
            </nav>

          </div>
        </div>

        <div className="widewrapper subheader">
          <div className="container">
            <div className="tales-breadcrumb">
              <a href="#">Blog</a>
            </div>

            <div className="tales-searchbox">
              <form action="#" method="get" accept-charset="utf-8">
                <button className="searchbutton" type="submit">
                  <i className="fa fa-search"></i>
                </button>
                <input className="searchfield" id="searchbox" type="text" placeholder="Search"/>
              </form>
            </div>
          </div>
        </div>
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
