import React from 'react';
import clone from 'clone';
import TableWrapper from '../AntTables.styles';
import IntlMessages from '@iso/components/utility/intlMessages';
import { ShowStudentButton, EditStudentButton, DeleteStudentButton } from '@iso/components/Tables/HelperCells';

export default function(props) {

  const columns = createcolumns(clone(props.tableInfo.columns));
  const dataList = props.dataList;

  function createcolumns(columns) {

    const show_student = {
      title: <IntlMessages id="show_student" />,
      dataIndex: 'show_student',
      render: (text, record, index) => (
        <ShowStudentButton student_id={record} />
      ),
    };

    const edit_student = {
      title: <IntlMessages id="edit_student" />,
      dataIndex: 'edit_student',
      render: (text, record, index) => (
        <EditStudentButton student_id={record.id} />
      ),
    };

    const delete_student = {
      title: <IntlMessages id="delete_student" />,
      dataIndex: 'delete_student',
      render: (text, record, index) => (
        <DeleteStudentButton student={record} />
      ),
    };


    columns.push(show_student);
    columns.push(edit_student);
    columns.push(delete_student);

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
