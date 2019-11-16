import React from 'react';

import Table from '../../../components/Table';
import { validations } from '../../../components/form';

export default function Customers() {
  return (
    <Table
      title="Customers"
      dataUrl="api/customer"
      columns={[
        {
          Header: 'Name',
          accessor: 'name',
          formConfig: {
            type: 'text',
            validators: [validations.required, validations.maxLength(100)],
          },
        },
        {
          Header: 'Email',
          accessor: 'email',
          formConfig: {
            type: 'text',
            validators: [validations.required, validations.email, validations.maxLength(50)],
          },
        },
        {
          Header: 'Gender',
          accessor: 'gender',
          formConfig: {
            type: 'select',
            options: [
              { key: 0, value: 'None' },
              { key: 1, value: 'Female' },
              { key: 2, value: 'Male' },
            ],
          },
        },
        {
          Header: 'Date of birth',
          accessor: 'dateOfBirth',
          formConfig: {
            type: 'date',
            validators: [validations.required, validations.date],
          },
        },
        {
          Header: 'Phone number',
          accessor: 'phoneNumber',
          formConfig: {
            type: 'number',
            validators: [validations.required, validations.number, validations.maxLength(11)],
          },
        },
        {
          Header: 'Address',
          accessor: 'address',
          formConfig: {
            type: 'textarea',
            validators: [validations.required, validations.maxLength(250)],
          },
        },
        {
          Header: 'City',
          accessor: 'city',
          formConfig: {
            type: 'text',
            validators: [validations.required, validations.maxLength(50)],
          },
        },
      ]}
    />
  );
}
