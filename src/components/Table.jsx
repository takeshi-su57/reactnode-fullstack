import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Form, Field } from 'react-final-form';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import { dataService } from '../services';
import { validations } from './form';

export default class Table extends Component {
  state = {
    columns: [],
    data: [],
    loading: false,
    modal: false,
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { columns, data, loading, modal, model } = this.state;
    let { title } = this.props;

    return (
      <>
        <h1>{title}</h1>
        <ReactTable columns={columns} data={data} loading={loading} />
        <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
          <Form
            onSubmit={this.onSubmit}
            initialValues={model}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader toggle={this.toggle}>Create/Edit</ModalHeader>
                <ModalBody>
                  {columns.map(column => {
                    return this.getFormField(column);
                  })}
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>{' '}
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            )}
          />
        </Modal>
      </>
    );
  }

  componentDidMount() {
    const { dataUrl, columns, readonly } = this.props;
    if (!readonly) {
      columns.push({
        id: 'edit',
        accessor: 'id',
        sortable: false,
        filterable: false,
        minWidth: 70,
        Header: (
          <button onClick={() => this.opendEdit({})} className="btn btn-success">
            <i className="fa fa-plus" />
          </button>
        ),
        Cell: ({ original }) => (
          <>
            <button onClick={() => this.opendEdit(original)} className="btn btn-primary">
              <i className="fa fa-pencil" />
            </button>
            <button onClick={() => this.deleteRow(original)} className="btn btn-danger">
              <i className="fa fa-trash" />
            </button>
          </>
        ),
      });
    }

    this.setState({ loading: true });
    dataService.get(dataUrl).then(res => {
      this.setState({ columns: columns, data: res.data, loading: false });
    });
  }

  opendEdit = row => {
    this.setState({ modal: !this.state.modal, model: row });
  };

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  onSubmit = async values => {
    console.log(values);
    await this.sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  deleteRow = row => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const { dataUrl } = this.props;
      dataService.delete(`${dataUrl}/${row.id}`).then(() => {
        this.setState({ data: this.state.data.filter(r => r.id !== row.id) });
      });
    }
  };

  getFormField = column => {
    let formField = null;
    if (column.formConfig) {
      const { type, validators } = column.formConfig;
      if (type === 'text' || type === 'password' || type === 'email' || type === 'number' || type === 'textarea') {
        formField = (
          <Field
            key={column.accessor}
            name={column.accessor}
            validate={validations.composeValidators(...validators)}
            render={({ input, meta }) => (
              <FormGroup>
                <Label for={column.accessor}>{column.Header}</Label>
                <Input
                  type={column.type}
                  name={column.accessor}
                  id={column.accessor}
                  invalid={meta.touched && !!meta.error}
                  valid={meta.touched && !meta.error}
                  {...input}
                />
                {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
              </FormGroup>
            )}
          />
        );
      } else if (type === 'date') {
        formField = (
          <Field
            key={column.accessor}
            name={column.accessor}
            validate={validations.composeValidators(...validators)}
            render={({ input, meta }) => (
              <FormGroup>
                <Label for={column.accessor}>{column.Header}</Label>
                <InputGroup>
                  <DayPickerInput
                    component={props => (
                      <input
                        className="form-control"
                        name={column.accessor}
                        id={column.accessor}
                        {...props}
                        valid={meta.touched && !meta.error}
                        invalid={meta.touched && !!meta.error}
                      />
                    )}
                    {...input}
                    ref={c => (this.calendar = c)}
                  />
                  <InputGroupAddon addonType="append">
                    <i className="fa fa-calendar" onClick={() => this._calendar.setOpen(true)} />
                  </InputGroupAddon>
                </InputGroup>

                {meta.touched && meta.error && <FormFeedback>{meta.error}</FormFeedback>}
              </FormGroup>
            )}
          />
        );
      }
    }
    return formField;
  };
}
