import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Transaction from './Transaction';
import { SortableCardWrapper } from './Market.styles';
import { Row, Col } from 'antd';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import marketActions from '@iso/redux/market/actions';
import {useParams} from "react-router-dom";
import { Alert } from 'antd';
import basicStyle from '@iso/assets/styles/constants';
import StickerWidget from './Sticker/StickerWidget';
import IsoWidgetsWrapper from './WidgetsWrapper';






export default function () {
  const { rowStyle, colStyle } = basicStyle;
  


  const { market_id } = useParams()

  const dispatch = useDispatch();

  const { market, transactions, error, transaction_error } = useSelector(state => {
    return {
      market: state.market.market,
      transactions: state.market.transactions,
      error: state.market.error,
      transaction_error: state.market.transaction_error
    }
  });


  useEffect(() => {
    dispatch(marketActions.fetchMarket(market_id));
    dispatch(marketActions.getMarketTransactions(market_id));
  }, [dispatch, market_id]);

  function renderTransactions() {
    if(transactions.length){
      return transactions.map((transaction, i) => {
        return (
          <Transaction
            key={transaction.id}
            index={i}
            {...transaction}
          />
        );
      });
    } else {
      return (
        <p>There is no transactions for this Market</p>
      )
    }
    
  }

  return (
    <LayoutContentWrapper>
      { error.length ?
        <Row>
          <Col span={24}>
            <Alert message={error} type="error" style={{marginBottom: 10}}/>
          </Col>
        </Row>
      : "" }
      <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={12} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper style={{marginRight: "10px"}}>
              <StickerWidget
                number={market.balance}
                text="Balance"
                icon="ion-cash"
                fontColor="#FFF"
                bgColor="#42A5F6"
              />
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      <Row>

        <Col span={12}>
          <p style={{ fontWeight: "bold" }}>Name: 
            <span style={{ fontWeight: "normal", marginLeft: "5px" }}>{market.name}</span>
          </p>
        </Col>
      </Row>
      { error.length ?
        <Row>
          <Col span={24}>
            <Alert message={transaction_error} type="error" style={{marginBottom: 10}}/>
          </Col>
        </Row>
      : "" }
      <Row>
        <Col span={24}>
          <SortableCardWrapper
              id="shuffle"
              className={`isomorphicSortableCardsHolder list`}
            >
            <h2>Transactions</h2>
            <div className="isoSortableCardsContainer">
              {renderTransactions()}
            </div>
          </SortableCardWrapper>
        </Col>
      </Row>
    </LayoutContentWrapper>
  );
}
