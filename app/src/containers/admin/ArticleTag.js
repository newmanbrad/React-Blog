import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as detailActions from '../../redux/modules/admin/articleTag';
import State from './State';
import { pushState } from 'redux-router';

// Bootstrap components
import { PageHeader, Button, Form, FormGroup, Col, ControlLabel, ButtonToolbar } from 'react-bootstrap';

function fetchData(getState, dispatch, location) {
  return dispatch(detailActions.load({params: {x: 'articleTag', id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  state => ({
    detail: state.adminArticleTag
  }),
  { ...detailActions, pushState }
)
export default class ArticleTag extends Component {
  state = {
    validateMsg: null,
    showAlert: false
  };
  render() {
    let
      detail = this.props.detail;

    if (detail.data && detail.data.data) {
      let {xData} = detail.data.data;
      return (
        <div className="container-fluid">
          <PageHeader>{xData._id ? 'Add Tag' : 'Edit Tag'}</PageHeader>

          <Form horizontal>

            <FormGroup controlId="formHorizontalTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Tag
              </Col>
              <Col sm={10}>
                <input type="text" ref="name" className="form-control" placeholder="Tag Name" defaultValue={xData.name} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalTitle">
              <Col componentClass={ControlLabel} sm={2}>
                Path
              </Col>
              <Col sm={10}>
                <input type="text" ref="path" className="form-control" placeholder="Path" defaultValue={xData.path} />
              </Col>
            </FormGroup>

            <Col md={2}></Col>
            <Col md={10}>
              <ButtonToolbar>
                <Button><Link to={ADMINPATH + 'articleTagList'}>Back</Link></Button>
                <Button bsStyle="primary" onClick={this.handleSubmit.bind(this, xData._id)}>Submit</Button>
                <Alert data={detail.editData} loading={detail.editing} error={detail.editError} validateMsg={this.state.validateMsg} showAlert={this.state.showAlert} />
              </ButtonToolbar>
            </Col>

          </Form>
        </div>
      )
    } else {
      return <State {...detail}/>
    }
  }
  handleSubmit(id) {
    let
      data = formatForm(this, [
        {
          name: 'name',
          rules: ['isRequired'],
          msgs: ['Name is required.']
        }, {
          name: 'path',
          rules: ['isRequired'],
          msgs: ['Path is required.']
        }
      ]),
      props = this.props;

    if (data) {
      if (id) {
        editOver(props.update({params: {x: 'articleTag', id}, data}), this, ADMINPATH + 'articleTagList');
      } else {
        editOver(props.create({params: {x: 'articleTag'}, data}), this, ADMINPATH + 'articleTagList');
      }
    }
  }
}
