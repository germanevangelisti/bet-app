import React from "react";

import { getTeamClass } from "../../utils/formatters";

import "./styles.css";

const TeamDetails = ({ team }) => {
  return (
    <div className="layout">
      <div className="column">
        <div className="title">TEAM: {team.name}</div>
      </div>
    </div>
  );
};

export default TeamDetails;
