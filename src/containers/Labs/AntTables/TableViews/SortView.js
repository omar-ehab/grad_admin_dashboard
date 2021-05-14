import React from 'react';
import clone from 'clone';
import TableWrapper from '../AntTables.styles';
import IntlMessages from '@iso/components/utility/intlMessages';
import { DownloadLabAccessExcel } from '@iso/components/Tables/HelperCells';

export default function(props) {

  const columns = createcolumns(clone(props.tableInfo.columns));
  const dataList = props.dataList;

  function createcolumns(columns) {
    const actions = {
      title: <IntlMessages id="actions" />,
      dataIndex: 'download_entrance_sheet',
      render: (text, record, index) => (
        <>
          <DownloadLabAccessExcel lab={record} />
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
