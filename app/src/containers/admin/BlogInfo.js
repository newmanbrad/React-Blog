import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as blogInfoActions from '../../redux/modules/admin/blogInfo';
import { pushState } from 'redux-router';

// Bootstrap components
import { PageHeader, Button, Form, FormGroup, Col, ControlLabel, ButtonToolbar } from 'react-bootstrap';


function fetchData(getState, dispatch, location) {
  return dispatch(blogInfoActions.load());
}

@connectData(fetchData)
@connect(
  state => ({
    blogInfo: state.adminBlogInfo
  }),
  { ...blogInfoActions, pushState }
)
export default class BlogInfo extends Component {
  state = {
    validateMsg: null,
    showAlert: false
  };
  
  render() {
    let blogInfoProps = this.props.blogInfo,
        {blogInfo, loggedin} = blogInfoProps.data.data;

    if (loggedin) {
      return (
        <div className="container-fluid">
          <PageHeader>Blog Administration</PageHeader>

          <Form horizontal>
            <FormGroup controlId="formHorizontalTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Title
              </Col>
              <Col sm={10}>
                <input type="text" ref="title" className="form-control" placeholder="Title" defaultValue={blogInfo.title} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalKeywords">
              <Col componentClass={ControlLabel} sm={2}>
                Keywords
              </Col>
              <Col sm={10}>
                <textarea ref="keywords" className="form-control" defaultValue={blogInfo.keywords}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalDescription">
              <Col componentClass={ControlLabel} sm={2}>
                Description
              </Col>
              <Col sm={10}>
                <textarea ref="description" className="form-control wd6 hg1" defaultValue={blogInfo.description}/>
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalCopyright">
              <Col componentClass={ControlLabel} sm={2}>
                Copyright
              </Col>
              <Col sm={10}>
                <textarea ref="copyright" className="form-control wd6 hg1" defaultValue={blogInfo.copyright}/>
              </Col>
            </FormGroup>

            <Col md={2}></Col>
            <Col md={10}>
              <ButtonToolbar>
                <Button><Link to={ADMINPATH}>Back</Link></Button>
                <Button bsStyle="primary" onClick={this.handleSubmit.bind(this, blogInfo._id)}>Submit</Button>
                <Alert data={blogInfoProps.editData} loading={blogInfoProps.editing} error={blogInfoProps.editError} validateMsg={this.state.validateMsg} showAlert={this.state.showAlert}/>
              </ButtonToolbar>
            </Col>

          </Form>
        </div>
      )
    } else {
      return <div className="container-fluid"><p>Please  <Link to={ADMINPATH + 'login'}>Login</Link> to continue.</p></div>
    }
  }
  handleSubmit(id) {
    let
      data = formatForm(this, [
        {
          name: 'title',
          rules: ['isRequired'],
          msgs: ['Title is required.']
        }, {
          name: 'keywords',
          rules: ['isRequired'],
          msgs: ['Keywords are required']
        }, {
          name: 'description',
          rules: ['isRequired'],
          msgs: ['Description is required.']
        }, {
          name: 'copyright',
          rules: ['isRequired'],
          msgs: ['Copyright is required']
        }
      ]),
      props = this.props;

    if (data) {
      if (id) {
        editOver(props.update({params: {id}, data}), this);
      } else {
        editOver(props.create({data}), this);
      }
    }
  }
}
