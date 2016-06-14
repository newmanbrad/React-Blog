import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DocumentMeta from 'react-document-meta';
import { load } from '../redux/modules/articleList';
import connectData from '../helpers/connectData';
import PageList from '../components/PageList';
import State from './State';

// Bootstrap components
import { Glyphicon } from 'react-bootstrap';


function fetchData(getState, dispatch, location) {
  return dispatch(load({params: location.query}));
}

@connectData(fetchData)
@connect(
  state => ({
    articleList: state.articleList,
    layout: state.layout
  })
)
export default class ArticleList extends Component {
  render() {
    let props = this.props,
        articleList = props.articleList;

    if (articleList.data && articleList.data.data) {
      let
        {blogInfo} = props.layout.data.data,
        {typeOrTagName, articles, pageList} = articleList.data.data;

      return (
        <section className="contents">
          <DocumentMeta title={(typeOrTagName ? typeOrTagName + '_' : '') + blogInfo.title}/>
          {articles.map((article, i) => {
            return (
              <article key={i}>
                <h1>
                  <Link to='/article' query={{id: article._id}} title={article.title}>{article.title}</Link>
                  <span className="icon-pencil"></span>
                </h1>
                <p className="lead">by <span>{article.author}</span></p>

                <hr/>

                <p><Glyphicon glyph="time"/> posted on {article.createTime.slice(0, 10)}</p>
                <p>{article.visits} Views</p>
                <p>{article.commentCount} Comments</p>

                <section className="info" dangerouslySetInnerHTML={{__html: article.introduction}}></section>
                <footer>
                <span>
                  <i className="icon-tags"></i>
                  {article.tags.map((tag, i) => {
                    return <Link key={i} to='/' query={{tagPath: tag.path}}>{(i ? ' ' : '') + tag.name}</Link>
                  })}
                </span>
                  <Link to='/article' query={{id: article._id}} title={article.title} className="more"><i className="icon-forward"></i> more</Link>
                </footer>
              </article>
            )
          })}
          <PageList {...pageList} path='/' />
        </section>
      )
    } else {
      return <State {...articleList} />
    }
  }
};
