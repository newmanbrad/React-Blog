import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import connectData from '../../helpers/connectData';
import Alert from '../../components/Alert';
import formatForm from '../../utils/formatForm';
import { editOver } from '../../utils/actionOver';
import * as detailActions from '../../redux/modules/admin/link';
import State from './State';
import { pushState } from 'redux-router';

// Bootstrap components
import { PageHeader, Button, Form, FormGroup, Col, ControlLabel, ButtonToolbar } from 'react-bootstrap';

function fetchData(getState, dispatch, location) {
  return dispatch(detailActions.load({params: {x: 'link', id: location.query.id}}));
}

@connectData(fetchData)
@connect(
  state => ({
    detail: state.adminLink
  }),
  { ...detailActions, pushState }
)
export default class Links extends Component {
  state = {
    validateMsg: null,
    showAlert: false
  };
  
  render() {
    let detail = this.props.detail;

    if (detail.data && detail.data.data) {
      let {xData} = detail.data.data;
      return (
        <div className="container-fluid">

          <PageHeader>{xData._id ? 'Edit Link' : 'Create Link'}</PageHeader>

          <Form horizontal>

            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                Link
              </Col>
              <Col sm={10}>
                <input type="text" ref="name" className="form-control" placeholder="Link" defaultValue={xData.name} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalName">
              <Col componentClass={ControlLabel} sm={2}>
                URL
              </Col>
              <Col sm={10}>
                <input type="text" ref="url" className="form-control" placeholder="URL" defaultValue={xData.url} />
              </Col>
            </FormGroup>

            <Col md={2}></Col>
            <Col md={10}>
              <ButtonToolbar>
                <Button><Link to={ADMINPATH + 'linkList'}>Back</Link></Button>
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
          msgs: ['Link is required.']
        }, {
          name: 'url',
          rules: ['isRequired', 'isUrl'],
          msgs: ['URL is required.', 'Not a valid URL.']
        }
      ]),
      props = this.props;

    if (data) {
      if (id) {
        editOver(props.update({params: {x: 'link', id}, data}), this, ADMINPATH + 'linkList');
      } else {
        editOver(props.create({params: {x: 'link'}, data}), this, ADMINPATH + 'linkList');
      }
    }
  }
}
