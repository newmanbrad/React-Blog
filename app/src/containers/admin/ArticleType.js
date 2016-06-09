import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as detailActions from '../../redux/modules/admin/articleType';
import State from './State';
import { pushState } from 'redux-router';

// Bootstrap components
import { PageHeader, Button, Form, FormGroup, Col, ControlLabel, ButtonToolbar } from 'react-bootstrap';

function fetchData(getState, dispatch, location) {
  return dispatch(detailActions.load({params: {x: 'articleType', id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  state => ({
    detail: state.adminArticleType
  }),
  { ...detailActions, pushState }
)
export default class ArticleType extends Component {
  state = {
    validateMsg: null,
    showAlert: false
  }
  render() {
    let detail = this.props.detail;

    if (detail.data && detail.data.data) {
      let {xData} = detail.data.data;
      return (
        <div className="container-fluid">
          <PageHeader>{xData._id ? 'Edit Type' : 'Create Type'}</PageHeader>

          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Type
              </Col>
              <Col sm={10}>
                <input type="text" ref="name" className="form-control" placeholder="Type Name" defaultValue={xData.name} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPath">
              <Col componentClass={ControlLabel} sm={2}>
                Path
              </Col>
              <Col sm={10}>
                <input type="text" ref="path" className="form-control" placeholder="Path" defaultValue={xData.path} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPath">
              <Col componentClass={ControlLabel} sm={2}>
                Enable
              </Col>
              <Col sm={10}>
                <select ref="enabled" defaultValue={xData.enabled} className="form-control">
                  <option value={true}>Enabled</option>
                  <option value={false}>Disabled</option>
                </select>
              </Col>
            </FormGroup>

            <Col md={2}></Col>
            <Col md={10}>
              <ButtonToolbar>
                <Button><Link to={ADMINPATH + 'articleTypeList'}>Back</Link></Button>
                <Button bsStyle="primary" onClick={this.handleSubmit.bind(this, xData._id)}>Submit</Button>
                <Alert data={detail.editData} loading={detail.editing} error={detail.editError} validateMsg={this.state.validateMsg} showAlert={this.state.showAlert} />
              </ButtonToolbar>
            </Col>
          </Form>
        </div>
      )
    } else {
      return <State {...detail} />
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
        },{
            name: 'enabled'
        }
      ]),
      props = this.props;

    if (data) {
      if (id) {
        editOver(props.update({params: {x: 'articleType', id}, data}), this, ADMINPATH + 'articleTypeList');
      } else {
        editOver(props.create({params: {x: 'articleType'}, data}), this, ADMINPATH + 'articleTypeList');
      }
    }
  }
}
