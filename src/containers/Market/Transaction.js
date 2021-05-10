import React from 'react';
import { SingleCardWrapper } from './Market.styles';
import {
  PlusCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';

const listClass = `isoSingleCard card list`;

export default function (props) {
  const description = props.type === "WITHDRAW" ? "A purchase of " : "A deduct of "
  return (
    <SingleCardWrapper id={props.id} className={listClass}>
      <div className="isoCardImage">
        { props.type === "WITHDRAW" ? <PlusCircleOutlined style={{ color: "rgb(0, 177, 106)" }}/> : <MinusCircleOutlined style={{ color: "rgb(246, 71, 68)" }}/>}
      </div>
      <div className="isoCardContent">
        <h3 className="isoCardTitle">{`${description}${props.amount}`}</h3>
        <span className="isoCardDate">
          {props.accepted_at}
        </span>
      </div>
    </SingleCardWrapper>
  );
}
