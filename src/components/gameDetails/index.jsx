import React from "react";

import { getTeamClass } from "../../utils/formatters";

import "./styles.css";

const GameDetails = ({ game }) => {
  const homeTeam = game.homeTeam;
  const awayTeam = game.awayTeam;
  const homeTeamClass = getTeamClass(homeTeam.teamClass);
  const awayTeamClass = getTeamClass(awayTeam.teamClass);

  return (
    <div className="layout">
      <div className="column">
        <div className="title">Home team: {homeTeam.code}</div>
        <div className={`subtitle${homeTeam.teamClass === 'C' ? '-contender' : ''}`}>{homeTeamClass}</div>
      </div>
      <div className="column">
        <div className="title">Away team: {awayTeam.code}</div>
        <div className="subtitle">{awayTeamClass}</div>
      </div>
    </div>
  );
};

export default GameDetails;
