import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import { store } from '@iso/redux/store';
import marketsActions from '@iso/redux/markets/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const openEditModal = (market_id) => {
  store.dispatch(marketsActions.openEditMarketModal(market_id));
}

export default function({market}) {
  return (
    <Button type="primary" style={margin} onClick={() => {openEditModal(market.id)}}>
      {<IntlMessages id="edit_market" />}
    </Button>
  );
}
