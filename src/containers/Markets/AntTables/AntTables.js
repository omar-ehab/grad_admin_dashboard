import React, { useEffect } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Modal from '@iso/components/Feedback/Modal';
import Input from '@iso/components/uielements/input';
import { Button } from 'antd';
import TableDemoStyle from './Demo.styles';
import { tableInfo } from './configs';
import * as TableViews from './TableViews/TableViews';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import marketsActions from '@iso/redux/markets/actions';
import { Alert } from 'antd';

import {
  Fieldset,
  Form,
  Label,
} from './Markets.styles';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};


export default function AntTable() {
  
  const dispatch = useDispatch();

  const openInsertModal = () => {
    dispatch(marketsActions.openInsertMarketModal());
  }

  const closeInsertModal = () => {
    dispatch(marketsActions.closeInsertMarketModal());
  }

  const submitInsertForm = () => {
    dispatch(marketsActions.storeNewMarket());
  }

  const submitEditForm = () => {
    dispatch(marketsActions.editMarket());
  }

  const closeEditModal = () => {
    dispatch(marketsActions.closeEditMarketModal());
  }

  const onRecordChange = (e, key) => {
    dispatch(marketsActions.updateSelectedMarketForm(key, e.target.value));
  }

  const { markets, selected_market, insert_market_modal, edit_market_modal, error, insert_errors } = useSelector(state => {
    return {
      markets: state.markets.markets,
      error: state.markets.error,
      selected_market: state.markets.selected_market,
      insert_market_modal: state.markets.insert_market_modal,
      edit_market_modal: state.markets.edit_market_modal,
      insert_errors: state.markets.insert_errors,
    }
  });

  useEffect(() => {
    dispatch(marketsActions.fetchMarkets());
  }, [dispatch]);

  function renderTable(tableInfo, data) {
    const Component = TableViews.SortView;
    return <Component tableInfo={tableInfo} dataList={data} />;
  }

  return (
    <LayoutContentWrapper>
      <Row>
        <Col span={24}>
          <h2>MARKETS</h2>
        </Col>
        <Col span={24}>
          <Button type="primary" style={margin} onClick={openInsertModal}>
            {<IntlMessages id="add_new_market" />}
          </Button>
        </Col>
      </Row>
      { error.length ?
        <Row>
          <Col span={24}>
            <Alert message={error} type="error" style={{marginBottom: 10}}/>
          </Col>
        </Row>
      : "" }
      <Modal
            visible={edit_market_modal}
            onClose={closeEditModal}
            title="Edit Market"
            onCancel={closeEditModal}
            width={780}
            okText={'Edit Market'}
            onOk={submitEditForm}
      >
        <Form>
              <Fieldset>
                <Label>Market Name</Label>
                <Input
                  label="Market Name"
                  placeholder="Enter name"
                  value={selected_market.market_name}
                  onChange={e => onRecordChange(e, 'market_name')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "name" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
            </Form>
      </Modal>
      <Modal
            visible={insert_market_modal}
            onClose={closeInsertModal}
            title="Add new Market"
            onCancel={closeInsertModal}
            width={780}
            okText={'Add New Market'}
            onOk={submitInsertForm}
      >
        <Form>
              <Fieldset>
                <Label>Market Name</Label>
                <Input
                  label="Market Name"
                  placeholder="Enter name"
                  value={selected_market.market_name}
                  onChange={e => onRecordChange(e, 'market_name')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "name" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>

            </Form>
      </Modal>
      <TableDemoStyle className="isoLayoutContent">
        {renderTable(tableInfo, markets)}
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export { TableViews, tableInfo };
