import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Form } from 'react-final-form';
import { findIndex } from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { dataService } from '../services';
import { renderFields } from './form';

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
    const { columns, data, loading, modal, model, isNew } = this.state;
    let { title } = this.props;
    let formConfig = columns.filter(c => c.formConfig).map(c => ({
      name: c.accessor,
      label: c.Header,
      type: c.formConfig.type,
      validators: c.formConfig.validators,
    }));

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
                <ModalHeader toggle={this.toggle}>{isNew ? 'Create' : 'Edit'}</ModalHeader>
                <ModalBody>{renderFields(formConfig, model)}</ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggle}>
                    Cancele
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
    this.setState({ modal: !this.state.modal, model: row, isNew: !row.id });
  };

  onSubmit = values => {
    const { dataUrl } = this.props;
    const { isNew, data } = this.state;
    const { id, ...rest } = values;
    if (isNew) {
      dataService.post(`${dataUrl}`, rest).then(res => {
        this.setState({ modal: false, data: [...data, res.data] });
      });
    } else {
      dataService.put(`${dataUrl}/${id}`, rest).then(res => {
        const index = findIndex(data, { id });
        data.splice(index, 1, res.data);
        this.setState({ modal: false, data: [...data] });
      });
    }
  };

  deleteRow = row => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const { dataUrl } = this.props;
      dataService.delete(`${dataUrl}/${row.id}`).then(() => {
        this.setState({ data: this.state.data.filter(r => r.id !== row.id) });
      });
    }
  };
}
