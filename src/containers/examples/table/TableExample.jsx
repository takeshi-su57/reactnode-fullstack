import React from 'react';
import { makeData, Logo, Tips } from './Utils';
import _ from 'lodash';

// Import React Table
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export default class TableExample extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData(100000),
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <br />
        <strong>React table example:</strong> &nbsp;
        <a target="_black" rel="noopener noreferrer" href="https://react-table.js.org/#/story/readme">
          More details
        </a>
        <br />
        <strong>Note: Having the console open will slow performance</strong>
        <br />
        <br />
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Name',
              columns: [
                {
                  Header: 'First Name',
                  accessor: 'firstName',
                },
                {
                  Header: 'Last Name',
                  id: 'lastName',
                  accessor: d => d.lastName,
                },
              ],
            },
            {
              Header: 'Info',
              columns: [
                {
                  Header: 'Age',
                  accessor: 'age',
                  aggregate: vals => _.round(_.mean(vals)),
                  Aggregated: row => {
                    return <span>{row.value} (avg)</span>;
                  },
                },
                {
                  Header: 'Visits',
                  accessor: 'visits',
                  aggregate: vals => _.sum(vals),
                },
              ],
            },
          ]}
          pivotBy={['firstName', 'lastName']}
          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={row => {
            return (
              <div style={{ padding: '20px' }}>
                <em>Sub Component!</em>
              </div>
            );
          }}
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}
