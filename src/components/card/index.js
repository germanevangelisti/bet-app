import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import CancelSharpIcon from "@mui/icons-material/CancelSharp";

import "./styles.css";

const BasicCard = ({ header, title, score, body, game, onClick }) => {
  const { isPivot, status, isGameClosed, teamShouldWin, teamWinner } = game;
  const homeTeam = game.homeTeam.code;
  const awayTeam = game.awayTeam.code;

  const getBackgroundColor = () => {
    if (isPivot && status === "Scheduled") return "gold";
    if (!isPivot && status === "Scheduled") return "white";
    if (isPivot && (status === "Final" || status === "F/OT")) return "#8a967e";
    if (!isPivot && (status === "Final" || status === "F/OT")) return "white";
  };

  const getTeamCodeClassName = (team) => {
    if (isPivot) {
      if (team === teamShouldWin) return "span-green";
      if (team !== teamShouldWin) return "span-red";
    }
    return "span-default";
  };

  const renderIconResult = () =>
    teamWinner?.code === teamShouldWin ? (
      <CheckCircleSharpIcon color="success" />
    ) : (
      <CancelSharpIcon color="error" />
    );

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        marginTop: 1,
        marginRight: 1,
        borderColor: isPivot ? "#590a0a" : "black",
        cursor: isPivot ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <CardContent sx={{ backgroundColor: getBackgroundColor() }}>
        <Typography
          sx={{
            fontSize: 14,
            display: "flex",
            justifyContent: "space-between",
          }}
          color="text.primary"
          gutterBottom
        >
          {header}
          {isGameClosed && isPivot ? renderIconResult() : <></>}
        </Typography>
        <Typography variant="h5" component="div">
          <span
            className={getTeamCodeClassName(awayTeam)}
          >{`${awayTeam} `}</span>
          vs{" "}
          <span
            className={getTeamCodeClassName(homeTeam)}
          >{`${homeTeam}`}</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {isGameClosed ? score : null}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isPivot ? "#590a0a" : "black" }}
        >
          {body}
        </Typography>
        <Typography variant="body2" sx={{ color: "blue" }}>
          {status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BasicCard;
