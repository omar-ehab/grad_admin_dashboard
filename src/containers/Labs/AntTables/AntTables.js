import React, { useEffect } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import TableDemoStyle from './Demo.styles';
import { tableInfo } from './configs';
import * as TableViews from './TableViews/TableViews';
import labsActions from '@iso/redux/labs/actions';
import { Alert } from 'antd';



export default function AntTable() {
  
  const dispatch = useDispatch();

  const { labs, error } = useSelector(state => {
    return {
      labs: state.labs.labs,
      error: state.markets.error
    }
  });

  useEffect(() => {
    dispatch(labsActions.fetchLabs());
  }, [dispatch]);

  function renderTable(tableInfo, data) {
    const Component = TableViews.SortView;
    return <Component tableInfo={tableInfo} dataList={data} />;
  }

  return (
    <LayoutContentWrapper>
      <Row>
        <Col span={24}>
          <h2>LABS</h2>
        </Col>
      </Row>
      { error.length ?
        <Row>
          <Col span={24}>
            <Alert message={error.message} type="error" style={{marginBottom: 10}}/>
          </Col>
        </Row>
      : "" }
      <TableDemoStyle className="isoLayoutContent">
        {renderTable(tableInfo, labs)}
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export { TableViews, tableInfo };
