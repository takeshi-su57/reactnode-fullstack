import React from 'react';

import Table from '../../../components/Table';
import { validations } from '../../../components/form';

export default function ProductCategories() {
  return (
    <Table
      title="Product categories"
      dataUrl="api/productcategory"
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
      ]}
    />
  );
}
