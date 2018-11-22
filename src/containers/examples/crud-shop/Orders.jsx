import React from 'react';

import Table from '../../../components/Table';
import { validations } from '../../../components/form';

export default function Orders() {
  return (
    <Table
      title="Orders"
      dataUrl="api/order"
      columns={[
        {
          Header: 'Id',
          accessor: 'id',
        },
        {
          Header: 'Product id',
          accessor: 'productId',
        },
        {
          Header: 'Customer id',
          accessor: 'customerId',
        },
        {
          Header: 'Discount',
          accessor: 'discount',
          formConfig: {
            type: 'number',
            validators: [validations.required],
          },
        },
        {
          Header: 'Comments',
          accessor: 'comments',
          formConfig: {
            type: 'textarea',
            validators: [validations.required, validations.maxLength(500)],
          },
        },
      ]}
    />
  );
}
