import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import {editOver} from '../../utils/actionOver';
import * as articleActions from '../../redux/modules/admin/article';
import State from './State';
import {pushState} from 'redux-router';
import TextEditor from '../../components/TextEditor';

// Bootstrap components
import { PageHeader, Button, Form, FormGroup, Col, ControlLabel, ButtonToolbar } from 'react-bootstrap';

let contentEditor, introEditor;

function fetchData(getState, dispatch, location) {
  return dispatch(articleActions.load({params: {id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  // map state to props
  state => ({
    article: state.adminArticle
  }),
  {...articleActions, pushState}
)
export default class Article extends Component {

  state = {
    validateMsg: null,
    showAlert: false
  };

  constructor(props) {
    super(props);
    //this.state = { article: props.article };
    this.onIntroductionChange = this.onIntroductionChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  onIntroductionChange(introduction) {
    this.setState({
      introduction: introduction
    });
  }

  onContentChange(content) {

    let newState = {
      content: content
    };

    this.setState(newState);
  }

  render() {
    let articleProps = this.props.article;

    if (articleProps.data && articleProps.data.data) {
      let {article, articleTypes, articleTags} = articleProps.data.data;
      return (
        <div className="container-fluid">
          <PageHeader>{article._id ? 'Edit Post' : 'Add Post'}</PageHeader>

          <Form horizontal>
            <FormGroup controlId="formHorizontalTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={10}>
                <input type="text" ref="title" className="form-control" placeholder="Post Title" defaultValue={article.title} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalAuthor">
              <Col componentClass={ControlLabel} sm={2}>
                Author
              </Col>
              <Col sm={10}>
                <input type="text" ref="author" className="form-control" placeholder="Author" defaultValue={article.author} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalType">
              <Col componentClass={ControlLabel} sm={2}>
                Type
              </Col>
              <Col sm={10}>
                <select ref="type" defaultValue={String(article.type)} className="form-control">
                  {articleTypes.map((v, i) => {
                    return <option key={i} value={v._id}>{v.name}</option>
                  })}
                </select>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalTags">
              <Col componentClass={ControlLabel} sm={2}>
                Tags
              </Col>
              <Col sm={10}>
                {articleTags.map((v, i) => {
                  return <span key={i}><input ref={'tags' + i} type="checkbox" value={v._id}
                                              defaultChecked={article.tags && ~article.tags.indexOf(v._id) ? true : false}/> {v.name} </span>
                })}
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalStatus">
              <Col componentClass={ControlLabel} sm={2}>
                Status
              </Col>
              <Col sm={10}>
                <select ref="enabled" defaultValue={article.enabled} className="form-control">
                  <option value={true}>Enabled</option>
                  <option value={false}>Disbaled</option>
                </select>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalIntro">
              <Col componentClass={ControlLabel} sm={2}>
                Introduction
              </Col>
              <Col sm={10}>
                <TextEditor theme="snow" value={article.introduction} ref="introduction" onChange={this.onIntroductionChange}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalIntro">
              <Col componentClass={ControlLabel} sm={2}>
                Content
              </Col>
              <Col sm={10}>
                <TextEditor theme="snow" value={article.content} ref="content" onChange={this.onContentChange}/>
              </Col>
            </FormGroup>

            <Col md={2}></Col>
            <Col md={10}>
              <ButtonToolbar>
                <Button active><Link to={ADMINPATH + 'articleList'}>Back</Link></Button>
                <Button bsStyle="primary" active  onClick={this.handleSubmit.bind(this, article._id)}>Submit</Button>
                <Alert data={articleProps.editData} loading={articleProps.editing} error={articleProps.editError} validateMsg={this.state.validateMsg} showAlert={this.state.showAlert}/>
              </ButtonToolbar>
            </Col>

          </Form>
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
        }, {
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

      // add text field values
      data.content = this.state.content;
      data.introduction = this.state.introduction;

      if (id) {
        editOver(props.update({params: {id}, data}), this, ADMINPATH + 'articleList');
      } else {
        editOver(props.create({data}), this, ADMINPATH + 'articleList');
      }
    }
  }
}
