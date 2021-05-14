import React from 'react';
import IntlMessages from '@iso/components/utility/intlMessages';
import { TextCell } from '@iso/components/Tables/HelperCells';

const renderCell = (object, key) => {
  const value = object[key];
  return TextCell(value);
};

const columns = [
  {
    title: <IntlMessages id="lab_name" />,
    key: 'lab_name',
    render: object => renderCell(object, 'lab_name'),
  }
];

const tableInfo = {
    title: 'Labs',
    value: 'simple',
    columns
  };
export { columns, tableInfo };
