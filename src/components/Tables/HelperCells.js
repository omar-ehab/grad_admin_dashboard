import React from 'react';
import WithdrawMarketBalance from './WithdrawMarketBalance';
import ShowStudentButton from './ShowStudentButton';
import EditStudentButton from './EditStudentButton';
import DeleteStudentButton from './DeleteStudentButton';
import ShowMarketButton from './ShowMarketButton';
import EditMarketButton from './EditMarketButton';
import DeleteMarketButton from './DeleteMarketButton';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const TextCell = text => <p>{text}</p>;

export {
  DateCell,
  LinkCell,
  TextCell,
  WithdrawMarketBalance,
  ShowStudentButton,
  EditStudentButton,
  DeleteStudentButton,
  ShowMarketButton,
  EditMarketButton,
  DeleteMarketButton,
};
