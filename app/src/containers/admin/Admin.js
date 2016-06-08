import React, { Component } from 'react';
import { connect } from 'react-redux';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as detailActions from '../../redux/modules/admin/admin';
import State from './State';
import { pushState } from 'redux-router';

// Bootstrap components
import { PageHeader, Button, Form, FormGroup, Col, ControlLabel } from 'react-bootstrap';

function fetchData(getState, dispatch, location) {
  return dispatch(detailActions.load({params: {x: 'admin', id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  state => ({
    detail: state.adminAdmin
  }),
  { ...detailActions, pushState }
)
export default class Admin extends Component {
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
          <PageHeader>{xData._id ? '  Edit Administrator' : 'Create Administrator'}</PageHeader>

          <Form horizontal>
            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Name
              </Col>
              <Col sm={10}>
                <input type="text" ref="name" className="form-control" placeholder="Full Name" defaultValue={xData.name} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={10}>
                <input type="email" ref="email" className="form-control" placeholder="Email Address" defaultValue={xData.email} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <input type="password" ref="password" className="form-control" placeholder=""/>
              </Col>
            </FormGroup>

            <Col md={2}></Col>
            <Col md={10}>
              <Button className="btn-primary m-t-10" onClick={this.handleSubmit.bind(this, xData._id)}>
                Submit
              </Button>
              <Alert data={detail.editData} loading={detail.editing} error={detail.editError} validateMsg={this.state.validateMsg} showAlert={this.state.showAlert} />
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
          msgs: ['Name is required！']
        }, {
          name: 'email',
          rules: ['isRequired', 'isEmail'],
          msgs: ['Email is required！', 'Must be a valid email！']
        }, {
          name: 'password',
          rules: ['isRequired'],
          msgs: ['Password is required！']
        }
      ]),
      props = this.props;

    if (data) {
      if (id) {
        editOver(props.update({params: {x: 'admin', id}, data}), this, ADMINPATH + 'adminList');
      } else {
        editOver(props.create({params: {x: 'admin'}, data}), this, ADMINPATH + 'adminList');
      }
    }
  }
}
