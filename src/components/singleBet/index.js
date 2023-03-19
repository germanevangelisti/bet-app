import React, { useState, useEffect } from "react";

import { getNBATeamName } from "../../utils/formatters";

import "./styles.css";

const SingleBet = ({ bet }) => {
  const [potentialReturns, setPotentialReturns] = useState(0);

  const handleInputOnChange = (e) => {
    setPotentialReturns(
      bet.teamSelected.odds * Number(e.target.value).toFixed(2)
    );
  };

  return (
    <div className="singleBetLayout">
      <div className="title">
        <p>{getNBATeamName(bet.teamSelected.code)}</p>
        <p>{bet.teamSelected.odds}</p>
      </div>
      <span className="bettingInfo">
        Match Betting -{" "}
        <b>
          {getNBATeamName(bet.awayTeam.code)} @{" "}
          {getNBATeamName(bet.homeTeam.code)}
        </b>
      </span>
      <div className="inputWrapper">
        <input onChange={handleInputOnChange}></input>
      </div>
      <span className="potentialReturns">
        Potential Returns: <span className="amount">${potentialReturns.toFixed(2)}</span>
      </span>
    </div>
  );
};

export default SingleBet;
