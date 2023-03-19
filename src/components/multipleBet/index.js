import React, { useState } from "react";

import "./styles.css";

const MultipleBet = ({ multipleOdd, isMultipleBetAllowed }) => {
  const [potentialReturns, setPotentialReturns] = useState(0);

  const handleInputOnChange = (e) => {
    setPotentialReturns(
      multipleOdd * Number(e.target.value).toFixed(2)
    );
  };

  return (
    <div className="singleBetLayout">
      <div className="title">
        <p>Double</p>
        {isMultipleBetAllowed ? <p>{multipleOdd.toFixed(2)}</p> : <p>No multiple bet allowed</p>}
      </div>
      <div className="inputWrapper">
        <input onChange={handleInputOnChange}></input>
      </div>
      <span className="potentialReturns">
        Potential Returns: <span className="amount">${potentialReturns.toFixed(2)}</span>
      </span>
    </div>
  );
};

export default MultipleBet;
