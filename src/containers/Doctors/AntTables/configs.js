import React from 'react';
import IntlMessages from '@iso/components/utility/intlMessages';
import { TextCell } from '@iso/components/Tables/HelperCells';

const renderCell = (object, key) => {
  const value = object[key];
  return TextCell(value);
};

const columns = [
  {
    title: <IntlMessages id="name" />,
    key: 'name',
    render: object => renderCell(object, 'name'),
  },
  {
    title: <IntlMessages id="email" />,
    key: 'email',
    render: object => renderCell(object, 'email'),
  },
  {
    title: <IntlMessages id="phone_number" />,
    key: 'phone_number',
    render: object => renderCell(object, 'phone_number'),
  },
  {
    title: <IntlMessages id="job_title" />,
    key: 'job_title',
    render: object => renderCell(object, 'job_title'),
  }
];

const tableInfo = {
    title: 'Staff Memebers',
    value: 'simple',
    columns
  };
export { columns, tableInfo };
