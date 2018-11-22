import React from 'react';

import Table from '../../../components/Table';
import { validations } from '../../../components/form';

export default function Products() {
  return (
    <Table
      title="Products"
      dataUrl="api/product"
      columns={[
        {
          Header: 'Id',
          accessor: 'id',
        },
        {
          Header: 'Name',
          accessor: 'name',
          formConfig: {
            type: 'text',
            validators: [validations.required],
          },
        },
        {
          Header: 'Description',
          accessor: 'description',
          formConfig: {
            type: 'textarea',
            validators: [validations.required, validations.maxLength(500)],
          },
        },
        {
          Header: 'Icon',
          accessor: 'icon',
          formConfig: {
            type: 'text',
            validators: [validations.required],
          },
        },
        {
          Header: 'Buying price',
          accessor: 'buyingPrice',
          formConfig: {
            type: 'number',
            validators: [validations.required],
          },
        },
        {
          Header: 'Selling price',
          accessor: 'sellingPrice',
          formConfig: {
            type: 'number',
            validators: [validations.required],
          },
        },
        {
          Header: 'Units in stock',
          accessor: 'unitsInStock',
          formConfig: {
            type: 'number',
            validators: [validations.required],
          },
        },
        {
          Header: 'Is active',
          accessor: 'isActive',
          formConfig: {
            type: 'checkbox',
          },
        },
        {
          Header: 'Is discontinued',
          accessor: 'isDiscontinued',
          formConfig: {
            type: 'checkbox',
          },
        },
        {
          Header: 'Category id',
          accessor: 'categoryId',
          formConfig: {
            type: 'text',
          },
        },
      ]}
    />
  );
}
