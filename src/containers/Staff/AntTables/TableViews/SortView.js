import React from 'react';
import clone from 'clone';
import TableWrapper from '../AntTables.styles';
import IntlMessages from '@iso/components/utility/intlMessages';
import { DeleteStaffButton, EditStaffButton } from '@iso/components/Tables/HelperCells';

export default function(props) {

  const columns = createcolumns(clone(props.tableInfo.columns));
  const dataList = props.dataList;

  function createcolumns(columns) {

    const actions = {
      title: <IntlMessages id="actions" />,
      dataIndex: 'staff_actions',
      render: (text, record, index) => (
        <>
          <EditStaffButton staff={record} />
          <DeleteStaffButton staff={record} />
        </>
      ),
    };
    columns.push(actions);

    return columns;
  }
  
  return (
    <TableWrapper
      columns={columns}
      dataSource={dataList}
      pagination={{ pageSize: 10 }}
      className="isoSimpleTable"
    />
  );
}
