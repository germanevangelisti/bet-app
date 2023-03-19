import React, { useState } from "react";

import { getNBATeamName } from "../../utils/formatters";

import "./styles.css";

const MatchingBetGame = ({ game, dateTime, handleOddSelection }) => {
  const { gameID, homeTeam, awayTeam } = game;
  const { code: homeTeamName, odds: homeTeamOdd } = homeTeam;
  const { code: awayTeamName, odds: awayTeamOdd } = awayTeam;
  const [homeTeamOddSelected, setHomeTeamOddSelected] = useState(false);
  const [awayTeamOddSelected, setAwayTeamOddSelected] = useState(false);

  const handleOnClick = (state, setTeamOddSelected, odd, isHomeTeam) => {
    const newState = !state;
    const teamSelected = isHomeTeam ? homeTeam : awayTeam;
    setTeamOddSelected(newState);
    handleOddSelection(newState, Number(odd), game, teamSelected);
  };
  const getOddButtonClassName = (isSelected) =>
    isSelected ? "oddButton-selected" : "oddButton";

  return (
    <div className="matchingBetLayout" key={gameID}>
      <div className="info">
        <span>
          {getNBATeamName(awayTeamName)} @ {getNBATeamName(homeTeamName)}
        </span>
        <span className="dateTime">{dateTime}</span>
      </div>
      <div className="oddButtonWrapper">
        <button
          className={getOddButtonClassName(awayTeamOddSelected)}
          onClick={() =>
            handleOnClick(
              awayTeamOddSelected,
              setAwayTeamOddSelected,
              awayTeamOdd,
              false
            )
          }
        >
          {awayTeamOdd}
        </button>
        <button
          className={getOddButtonClassName(homeTeamOddSelected)}
          onClick={() =>
            handleOnClick(
              homeTeamOddSelected,
              setHomeTeamOddSelected,
              homeTeamOdd,
              true
            )
          }
        >
          {homeTeamOdd}
        </button>
      </div>
    </div>
  );
};

export default MatchingBetGame;
