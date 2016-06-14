import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { Link } from 'react-router';
import { pushState } from 'redux-router';
import { isLoaded, load } from '../redux/modules/layout';
import connectData from '../helpers/connectData';
import m from '../utils/moReactUtils';
import './layout.scss';

// Bootstrap components
import { Col, FormGroup, Button, InputGroup, Glyphicon } from 'react-bootstrap';

// components
import Header from '../components/layout/Header';

function fetchData(getState, dispatch) {
  if (!isLoaded(getState())) {
    return dispatch(load());
  }
}

let timer;

@connectData(fetchData)
@connect(
  state => ({layout: state.layout}),
  { pushState }
)
export default class Layout extends Component {
  state = {
    showNav: false,
    showHeaderDown: false
  };
  componentDidMount() {
    let
      colors = this.refs.colors.childNodes,
      tagColors = ['F99', 'C9C', 'F96', '6CC', '6C9', '37A7FF', 'B0D686', 'E6CC6E', 'EF8203', 'FF5E52'];

    for (let i in colors) {
      if (colors[i].tagName === 'A') {
        colors[i].style.background = '#' + tagColors[Math.floor(Math.random() * tagColors.length)];
      }
    }

    m(window).on('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    m(window).off('scroll', this.handleScroll);
  }
  render() {
    let layout = this.props.layout;

    if (layout.data && layout.data.data) {
      let {showNav, showHeaderDown} = this.state,
          {articleTypes, blogInfo, articleTags, links} = layout.data.data;

      return (
        <div>
          <Header data={layout}/>
          <div className="container-fluid">
            <div class="row">

              <Col md={8}>
                {this.props.children}
              </Col>

              <Col md={4}>
                <aside>
                  <section className="well">
                    <h4>Search</h4>
                    <FormGroup>
                      <InputGroup>
                        <input ref="search" type="text" placeholder="Search" className="form-control" />
                        <InputGroup.Button>
                          <Button onClick={this.handleSearch}><Glyphicon glyph="search" /></Button>
                        </InputGroup.Button>
                      </InputGroup>
                    </FormGroup>
                  </section>

                  <section ref="colors" className="well">
                    <h4>Tags</h4>
                    {articleTags.map((tag, i) => {
                      return <Link key={i} to='/' query={{tagPath: tag.path}} className="label">{tag.name}</Link>
                    })}
                  </section>

                  <section className="well">
                    <h4>Links</h4>
                    <ul>
                      {links.map((link, i) => {
                        return <li key={i}><a href={link.url} title={link.name} target="_blank">{link.name}</a></li>
                      })}
                    </ul>
                  </section>
                </aside>
              </Col>

             </div>
          </div>
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
  handleToggleNav = () => {
    this.setState({showNav: !this.state.showNav});
  };
  handleSearch = () => {
    const
      search = this.refs.search,
      val = search.value;

    if (val === '') {
      alert('Alert！');
      return;
    }

    this.props.pushState(null, '/', {keyword: search.value});
    search.value = '';
  };
  handleScroll = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (document.body.scrollTop > 0) {
        this.setState({showHeaderDown: true});
      } else {
        this.setState({showHeaderDown: false});
      }
    }, 200)
  }
};
