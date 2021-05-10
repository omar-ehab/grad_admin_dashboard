import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import axios from 'axios';
import Popconfirm from '../Feedback/Popconfirm';
import notifications from '../Feedback/Notification';
import { store } from '@iso/redux/store';
import marketsActions from '@iso/redux/markets/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const handleDelete = (market) => {
    const url = `http://127.0.0.1:8000/markets/${market.id}/destroy`;
    axios({
      url,
      method: 'DELETE',
    }).then((response) => {
      store.dispatch(marketsActions.fetchMarkets());
      notifications['success']({
        message: 'Market Deleted Successfully',
      });
    }).catch(err => {
      notifications['error']({
        message: 'Error',
        description:
          `Something went wrong!`,
      });
    });

}

export default function({market}) {
  return (
    <Popconfirm
      title={`Are you sure you want delete ${market.name} from system?`}
      okText="Delete"
      cancelText="No"
      onConfirm={() => handleDelete(market)}
    >
      <Button danger style={margin}>
        {<IntlMessages id="delete_market" />}
      </Button>
    </Popconfirm>
  );
}
