import React, { Component } from 'react';
import { connect } from 'react-redux';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as articleActions from '../../redux/modules/admin/article';
import State from './State';
import m from '../../utils/moReactUtils';
import { pushState } from 'redux-router';
import RichTextEditor from '../../components/RichTextEditor';

// Bootstrap components
import { PageHeader, Button } from 'react-bootstrap';

let contentEditor, introEditor;

function fetchData(getState, dispatch, location) {
  return dispatch(articleActions.load({params: {id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  state => ({
    article: state.adminArticle
  }),
  { ...articleActions, pushState }
)
export default class Article extends Component {
  state = {
    validateMsg: null,
    showAlert: false
  }
  componentDidMount() {
    let
      article = this.props.article;

    if (article.data && article.data.data) {
      m.createStyle('/static/scripts/umeditor/themes/default/css/umeditor.css');
      m.createScript('/static/scripts/umeditor/third-party/jquery.min.js', function() {
        m.createScript('/static/scripts/umeditor/umeditor.config.js', function() {
          m.createScript('/static/scripts/umeditor/umeditor.min.js', function() {
            m.createScript('/static/scripts/umeditor/lang/zh-cn/zh-cn.js', function() {
              introEditor = UM.getEditor('introduction');
              contentEditor = UM.getEditor('content');
            })
          })
        })
      })
    }
  }
  render() {
    let
      articleProps = this.props.article;

    if (articleProps.data && articleProps.data.data) {
      let {article, articleTypes, articleTags} = articleProps.data.data;
      return (
        <div className="main">


          <PageHeader>{article._id ? 'Edit Post' : 'Add Post'}</PageHeader>

          <form>
            <div className="form-group">
              <label className="control-label">Title</label>
              <input type="text" ref="title" className="form-control" defaultValue={article.title} />
            </div>

            <div className="form-group">
              <label className="control-label">Author</label>
              <input type="text" ref="author" className="form-control" defaultValue={article.author} />
            </div>

            <div className="form-group">
              <label className="control-label">Type</label>
              <select ref="type" defaultValue={String(article.type)} className="form-control">
                {articleTypes.map((v, i) => {
                  return <option key={i} value={v._id}>{v.name}</option>
                })}
              </select>
            </div>

            <div className="form-group">
              <label className="control-label">Tags</label>
              {articleTags.map((v, i) => {
                return <span key={i}><input ref={'tags' + i} type="checkbox" value={v._id} defaultChecked={article.tags && ~article.tags.indexOf(v._id) ? true : false} /> {v.name} </span>
              })}
            </div>

            <div className="form-group">
              <label className="control-label">Status</label>
              <select ref="enabled" defaultValue={article.enabled} className="form-control">
                <option value={true}>Enabled</option>
                <option value={false}>Disbaled</option>
              </select>
            </div>

            <div className="form-group">
              <label className="control-label">Intro</label>
              <RichTextEditor data={article.introduction} />
            </div>
            <div className="form-group">
              <label className="control-label">Content</label>
              <RichTextEditor data={article.content} />
            </div>

            <Button onClick={this.handleSubmit.bind(this, article._id)}>
              Submit
            </Button>

            <Alert data={articleProps.editData} loading={articleProps.editing} error={articleProps.editError} validateMsg={this.state.validateMsg} showAlert={this.state.showAlert} />
          </form>

        </div>
      )
    } else {
      return <State {...articleProps} />
    }
  }
  handleSubmit(id) {
    let data = formatForm(this, [
        {
          name: 'title',
          rules: ['isRequired'],
          msgs: ['Title is required.']
        }, {
          name: 'author',
          rules: ['isRequired'],
          msgs: ['Author is required.']
        },{
          name: 'type',
          rules: ['isRequired'],
          msgs: ['Type is required.']
        }, {
          names: 'tags'
        }, {
          name: 'enabled'
        }
      ]),
      props = this.props;

    if (data) {
      data.introduction = introEditor.getContent();
      data.content = contentEditor.getContent();
      if (id) {
        editOver(props.update({params: {id}, data}), this, ADMINPATH + 'articleList');
      } else {
        editOver(props.create({data}), this, ADMINPATH + 'articleList');
      }
    }
  }
}
