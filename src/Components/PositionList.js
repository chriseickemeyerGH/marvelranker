import React from "react";
import "../css/Components/positionList.css";

const PositionList = ({ targetArray }) => {
  let list = [];
  for (var i = 1; i < targetArray.length + 1; i++) {
    list.push(<p key={i}>{`${i}.`}</p>);
  }
  return <div className="numberList">{list}</div>;
};

export default PositionList;
